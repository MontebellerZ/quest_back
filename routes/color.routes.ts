import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import ColorController from "../controllers/color.controller";

const colorRouter = Router();

colorRouter.get("/get", ColorController.get);
colorRouter.get("/getAll", ColorController.getAll);

colorRouter.post("/create", authMiddleware, ColorController.create);
colorRouter.put("/edit", authMiddleware, ColorController.create);

export default colorRouter;
