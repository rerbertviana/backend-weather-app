import { Request, Response } from "express";
import prisma from "../database";

const setFavorites = async (req: Request, res: Response): Promise<void> => {
  const { userId, weatherId } = req.body;

  try {
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        weatherId,
      },
    });
    if (existingFavorite) {
      res
        .status(400)
        .json({ message: "Esse clima já foi adicionado aos favoritos!" });
    } else {
      const favorite = await prisma.favorite.create({
        data: {
          userId,
          weatherId,
        },
      });
      res.status(201).json(favorite);
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao adicionar favorito!" });
  }
};

const removeFavorite = async (req: Request, res: Response): Promise<void> => {
  const { userId, weatherId } = req.body;

  try {
    const favorite = await prisma.favorite.findFirst({
      where: {
        userId,
        weatherId,
      },
    });

    if (favorite) {
      await prisma.favorite.delete({
        where: {
          id: favorite.id,
        },
      });
      res.status(200).json({ message: "Favorito removido com sucesso!" });
    } else {
      res.status(404).json({ message: "Favorito não encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Erro ao remover favorito!" });
  }
};

const getFavorites = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId: Number(userId) },
    });

    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar favoritos!" });
  }
};

export { setFavorites, getFavorites, removeFavorite };
