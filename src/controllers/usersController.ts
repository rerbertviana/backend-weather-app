import { Request, Response } from "express";
import prisma from "../database";

const setUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  try {
    let user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      user = await prisma.user.create({
        data: { name, email },
      });
    }
    res.status(200).json({ userId: user.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao cadastrar usuário!" });
  }
};

const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro ao exibir usuarios!" });
  }
};

export { getUsers, setUser };
