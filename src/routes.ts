import { Router } from "express";
import UserController from "./controllers/UserController";

const router = Router();

router.post("/user", UserController.CreateUser);
router.get("/user", UserController.GetAllUsers);
router.get("/user/:id", UserController.GetByIdUser);
router.put("/user/:id", UserController.UpdateUser);
router.delete("/user/:id", UserController.DeleteUser);

export default router;
