import { Request } from "express";

export interface AuthRequest extends Request {
    user?: any;
}

export interface MulterRequest extends Request {
    file?: any;
}
