import { Request, Response } from "express";
import prisma from "../database";

const setWeather = async (req: Request, res: Response): Promise<void> => {
  const {
    city,
    state,
    temperature,
    feelsLike,
    humidity,
    windSpeed,
    weather,
    favorite,
  } = req.body;

  try {
    const newWeather = await prisma.weather.create({
      data: {
        city,
        state,
        temperature,
        feelsLike,
        humidity,
        windSpeed,
        weather,
        favorite,
      },
    });

    res.status(201).json(newWeather);
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar condição climática!" });
  }
};

const getWeathers = async (req: Request, res: Response): Promise<void> => {
  try {
    const weathers = await prisma.weather.findMany();
    res.status(200).json(weathers);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar condições climáticas!" });
  }
};

export { setWeather, getWeathers };
