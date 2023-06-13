import { NextFunction, Request, Response } from "express";
import { ApiError } from "../helpers/apiErrors";

const errorMiddleware = (
    error: Error & Partial<ApiError>,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.message;

    return res.status(statusCode).send({ message });
};

export default errorMiddleware;
