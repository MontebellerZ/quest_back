import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../helpers/apiErrors";
import { AuthRequest } from "../types";

type JwtPayload = { id: string; email: string; admin: boolean };

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not found in .env file");

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
    if (!authorization) return next(new UnauthorizedError());

    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer" || !token) return next(new UnauthorizedError());

    try {
        const identity = jwt.verify(token, JWT_SECRET) as JwtPayload;
        req.user = identity;
        next();
    } catch {
        next(new UnauthorizedError());
    }
};

export default authMiddleware;
