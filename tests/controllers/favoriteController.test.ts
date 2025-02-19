import { Request, Response } from "express";
import {
  setFavorites,
  getFavorites,
  removeFavorite,
} from "../../src/controllers/favoriteController";
import prisma from "../../src/database";

jest.mock("../../src/database", () => ({
  favorite: {
    findFirst: jest.fn(),
    create: jest.fn(),
    delete: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe("Favorite Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("setFavorites", () => {
    it("Deve adicionar um favorito com sucesso", async () => {
      req.body = { userId: 1, weatherId: 1 };

      (prisma.favorite.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.favorite.create as jest.Mock).mockResolvedValue({
        id: 1,
        userId: 1,
        weatherId: 1,
      });

      await setFavorites(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, userId: 1, weatherId: 1 });
    });

    it("Deve retornar erro se o favorito já existir", async () => {
      req.body = { userId: 1, weatherId: 1 };

      (prisma.favorite.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        userId: 1,
        weatherId: 1,
      });

      await setFavorites(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        message: "Esse clima já foi adicionado aos favoritos!",
      });
    });

    it("Deve retornar erro 500 em caso de falha", async () => {
      req.body = { userId: 1, weatherId: 1 };

      (prisma.favorite.findFirst as jest.Mock).mockRejectedValue(
        new Error("Erro no banco de dados")
      );

      await setFavorites(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao adicionar favorito!",
      });
    });
  });

  describe("removeFavorite", () => {
    it("Deve remover um favorito com sucesso", async () => {
      req.body = { userId: 1, weatherId: 1 };

      (prisma.favorite.findFirst as jest.Mock).mockResolvedValue({
        id: 1,
        userId: 1,
        weatherId: 1,
      });
      (prisma.favorite.delete as jest.Mock).mockResolvedValue({});

      await removeFavorite(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Favorito removido com sucesso!",
      });
    });

    it("Deve retornar erro se o favorito não for encontrado", async () => {
      req.body = { userId: 1, weatherId: 1 };

      (prisma.favorite.findFirst as jest.Mock).mockResolvedValue(null);

      await removeFavorite(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({
        message: "Favorito não encontrado!",
      });
    });

    it("Deve retornar erro 500 em caso de falha", async () => {
      req.body = { userId: 1, weatherId: 1 };

      (prisma.favorite.findFirst as jest.Mock).mockRejectedValue(
        new Error("Erro no banco de dados")
      );

      await removeFavorite(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao remover favorito!",
      });
    });
  });

  describe("getFavorites", () => {
    it("Deve retornar a lista de favoritos", async () => {
      req.params = { userId: "1" };

      (prisma.favorite.findMany as jest.Mock).mockResolvedValue([
        { id: 1, userId: 1, weatherId: 1 },
      ]);

      await getFavorites(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, userId: 1, weatherId: 1 },
      ]);
    });

    it("Deve retornar erro 500 em caso de falha", async () => {
      req.params = { userId: "1" };

      (prisma.favorite.findMany as jest.Mock).mockRejectedValue(
        new Error("Erro no banco de dados")
      );

      await getFavorites(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao buscar favoritos!",
      });
    });
  });
});
