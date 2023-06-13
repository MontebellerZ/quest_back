import { Router } from "express";
import UserController from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/login", UserController.login);
userRouter.put("/resetPassword", UserController.resetPassword);
userRouter.post("/create", UserController.create);

userRouter.get("/get/:nickname", authMiddleware, UserController.getUserByNick);
userRouter.put("/changeNickname", authMiddleware, UserController.changeNickname);
userRouter.put("/changeEmail", authMiddleware, UserController.changeEmail);
userRouter.put("/newPassword", authMiddleware, UserController.newPassword);
userRouter.put("/changeEnabled", authMiddleware, UserController.changeEnabled);
userRouter.put("/changeColor", authMiddleware, UserController.changeColor);

export default userRouter;
