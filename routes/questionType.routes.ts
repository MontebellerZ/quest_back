import { Router } from "express";
import authMiddleware from "../middlewares/auth";
import QuestionTypeController from "../controllers/questionType.controller";

const questionTypeRouter = Router();

questionTypeRouter.get("/getDefaults", QuestionTypeController.getDefaults);

questionTypeRouter.get("/getAll", authMiddleware, QuestionTypeController.getAll);
questionTypeRouter.post("/create", authMiddleware, QuestionTypeController.create);
questionTypeRouter.post("/edit", authMiddleware, QuestionTypeController.edit);

export default questionTypeRouter;
