import { Request, Response } from "express";
import {
  setWeather,
  getWeathers,
} from "../../src/controllers/weatherController";
import prisma from "../../src/database";

jest.mock("../../src/database", () => ({
  weather: {
    create: jest.fn(),
    findMany: jest.fn(),
  },
}));

describe("Weather Controller", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  describe("setWeather", () => {
    it("Deve adicionar uma nova condição climática", async () => {
      req.body = {
        city: "São Paulo",
        state: "SP",
        temperature: 25,
        feelsLike: 26,
        humidity: 60,
        windSpeed: 10,
        weather: "Ensolarado",
        favorite: false,
      };
      (prisma.weather.create as jest.Mock).mockResolvedValue({
        id: 1,
        ...req.body,
      });

      await setWeather(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ id: 1, ...req.body });
    });

    it("Deve retornar erro 500 em caso de falha", async () => {
      req.body = {
        city: "São Paulo",
        state: "SP",
        temperature: 25,
        feelsLike: 26,
        humidity: 60,
        windSpeed: 10,
        weather: "Ensolarado",
        favorite: false,
      };
      (prisma.weather.create as jest.Mock).mockRejectedValue(
        new Error("Erro no banco de dados")
      );

      await setWeather(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao adicionar condição climática!",
      });
    });
  });

  describe("getWeathers", () => {
    it("Deve retornar a lista de condições climáticas", async () => {
      (prisma.weather.findMany as jest.Mock).mockResolvedValue([
        { id: 1, city: "São Paulo", temperature: 25 },
      ]);

      await getWeathers(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith([
        { id: 1, city: "São Paulo", temperature: 25 },
      ]);
    });

    it("Deve retornar erro 500 em caso de falha", async () => {
      (prisma.weather.findMany as jest.Mock).mockRejectedValue(
        new Error("Erro no banco de dados")
      );

      await getWeathers(req as Request, res as Response);
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Erro ao buscar condições climáticas!",
      });
    });
  });
});
