import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const CreateUser = async (req: any, res: any) => {
  try {
    const { name, email, password } = req.body;

    let user = await prisma.user.findUnique({ where: { email } });
    if (user) return res.json({ error: "Email ja cadastrado!" });

    user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return res.json(user);
  } catch (error) {
    return res.json({ error });
  }
};

const GetAllUsers = async (req: any, res: any) => {
  try {
    const user = await prisma.user.findMany();
    return res.json(user);
  } catch (error) {
    return res.json({ error });
  }
};

const GetByIdUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.json({ error: "Usuario não encontrado" });

    return res.json(user);
  } catch (error) {
    return res.json({ error });
  }
};

const UpdateUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    let user = await prisma.user.findUnique({ where: { id: Number(id) } });
    if (!user) return res.json({ error: "Usuario não encontrado" });

    user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });

    return res.json(user);
  } catch (error) {
    res.json({ error });
  }
};

const DeleteUser = async (req: any, res: any) => {
  try {
    const { id } = req.params;

    const user = await prisma.user.findUnique({ where: { id: Number(id) } });

    if (!user) return res.json({ error: "Usuario não encontrado" });

    await prisma.user.delete({ where: { id: Number(id) } });

    return res.json({ message: "Usuario deletado" });
  } catch (error) {
    return res.json({ error });
  }
};

export default {
  CreateUser,
  GetAllUsers,
  GetByIdUser,
  UpdateUser,
  DeleteUser,
};
