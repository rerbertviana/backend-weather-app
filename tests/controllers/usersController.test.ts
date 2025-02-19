import { Request, Response } from "express";
import { setUser, getUsers } from "../../src/controllers/usersController";
import prisma from "../../src/database";

jest.mock("../../src/database", () => ({
  user: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
  },
}));

describe("Users Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("setUser", () => {
    it("Deve criar um novo usuário", async () => {
      req.body = { name: "Paulo Soares", email: "paulosoares@gmail.com" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (prisma.user.create as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Paulo Soares",
        email: "paulosoares@gmail.com",
      });

      await setUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userId: 1 });
    });

    it("Deve retornar o usuário existente", async () => {
      req.body = { name: "Paulo Soares", email: "paulosoares@gmail.com" };
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({
        id: 1,
        name: "Paulo Soares",
        email: "paulosoares@gmail.com",
      });

      await setUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ userId: 1 });
    });

    it("Deve retornar erro 500 em caso de falha", async () => {
      req.body = { name: "Paulo Soares", email: "paulosoares@gmail.com" };
      (prisma.user.findUnique as jest.Mock).mockRejectedValue(
        new Error("Erro no banco de dados")
      );

      await setUser(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao cadastrar usuário!",
      });
    });
  });

  describe("getUsers", () => {
    it("Deve retornar a lista de usuários", async () => {
      (prisma.user.findMany as jest.Mock).mockResolvedValue([
        { id: 1, name: "Paulo Soares", email: "paulosoares@gmail.com" },
      ]);

      await getUsers(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, name: "Paulo Soares", email: "paulosoares@gmail.com" },
      ]);
    });

    it("Deve retornar erro 500 em caso de falha", async () => {
      (prisma.user.findMany as jest.Mock).mockRejectedValue(
        new Error("Erro no banco de dados")
      );

      await getUsers(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao exibir usuarios!",
      });
    });
  });
});
