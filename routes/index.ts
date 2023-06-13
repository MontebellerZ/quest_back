import { Router } from "express";
import userRouter from "./user.routes";
import questionTypeRouter from "./questionType.routes";
import colorRouter from "./color.routes";

const routes = Router();

routes.use("/user", userRouter);
routes.use("/questionType", questionTypeRouter);
routes.use("/color", colorRouter);

routes.get("/", (req, res) => {
    res.send("Rodando 🚀🚀");
});

export default routes;
