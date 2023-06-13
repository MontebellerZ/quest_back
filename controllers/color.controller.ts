import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";
import { BadRequestError } from "../helpers/apiErrors";
import ColorData from "../data/color.data";
import { regexHexColor } from "../helpers/regexHexColor";

class ColorController {
    static create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { hexCode } = req.body;

        if (!hexCode || typeof hexCode !== "string")
            return next(new BadRequestError("HexCode necessário"));
        if (!regexHexColor.test(hexCode))
            return next(new BadRequestError("HexCode precisa ser uma cor Hex válida"));

        const color = await ColorData.create(hexCode).catch((err) => {
            const target = err.meta?.target;
            switch (target) {
                case "Color_hexCode_key":
                    return next(new BadRequestError("HexCode já registrado!"));

                default:
                    console.error(err);
                    return next(err);
            }
        });
        if (!color) return;

        res.json({ color });
    };

    static getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const colors = await ColorData.getAll().catch(next);
        if (!colors) return;

        res.json({ colors });
    };

    static get = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.body;

        if (!id) return next(new BadRequestError("Id necessário"));

        const color = await ColorData.get(id).catch(next);
        if (!color) return;

        res.json({ color });
    };

    static changeHexCode = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id, hexCode } = req.body;

        if (!hexCode) return next(new BadRequestError("Id e HexCode necessários"));

        const color = await ColorData.changeHexCode(id, hexCode).catch((err) => {
            const target = err.meta?.target;
            switch (target) {
                case "Color_hexCode_key":
                    return next(new BadRequestError("HexCode já registrado!"));

                default:
                    console.error(err);
                    return next(err);
            }
        });
        if (!color) return;

        res.json({ color });
    };
}

export default ColorController;
