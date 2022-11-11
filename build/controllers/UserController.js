var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const CreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        let user = yield prisma.user.findUnique({ where: { email } });
        if (user)
            return res.json({ error: "Email ja cadastrado!" });
        user = yield prisma.user.create({
            data: {
                name,
                email,
                password,
            },
        });
        return res.json(user);
    }
    catch (error) {
        return res.json({ error });
    }
});
const GetAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.user.findMany();
        return res.json(user);
    }
    catch (error) {
        return res.json({ error });
    }
});
const GetByIdUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user)
            return res.json({ error: "Usuario não encontrado" });
        return res.json(user);
    }
    catch (error) {
        return res.json({ error });
    }
});
const UpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email } = req.body;
        let user = yield prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user)
            return res.json({ error: "Usuario não encontrado" });
        user = yield prisma.user.update({
            where: { id: Number(id) },
            data: { name, email },
        });
        return res.json(user);
    }
    catch (error) {
        res.json({ error });
    }
});
const DeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield prisma.user.findUnique({ where: { id: Number(id) } });
        if (!user)
            return res.json({ error: "Usuario não encontrado" });
        yield prisma.user.delete({ where: { id: Number(id) } });
        return res.json({ message: "Usuario deletado" });
    }
    catch (error) {
        return res.json({ error });
    }
});
export default {
    CreateUser,
    GetAllUsers,
    GetByIdUser,
    UpdateUser,
    DeleteUser,
};
