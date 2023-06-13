import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";
import { BadRequestError } from "../helpers/apiErrors";
import QuestionTypeData from "../data/questionType.data";

class QuestionTypeController {
    static create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { type, description, colorId } = req.body;

        if (!type || !description || !colorId)
            return next(new BadRequestError("Tipo, Descrição e ColorId necessários"));

        const questionType = await QuestionTypeData.create(type, description, colorId).catch(
            (err) => {
                const { code, meta } = err;

                if (code === "P2002") {
                    switch (meta?.target) {
                        case "QuestionType_type_key":
                            return next(new BadRequestError("Tipo já está registrado!"));

                        default:
                            console.error(err);
                            return next(err);
                    }
                }

                if (code === "P2014") {
                    switch (meta?.relation_name) {
                        case "ColorToQuestionType":
                            return next(new BadRequestError("Cor já está em uso!"));

                        default:
                            console.error(err);
                            return next(err);
                    }
                }

                if (code === "P2025") {
                    return next(new BadRequestError("Cor não existe!"));
                }

                console.error(err);
                return next(err);
            }
        );
        if (!questionType) return;

        res.json({ questionType });
    };

    static getAll = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const questionTypes = await QuestionTypeData.getAll().catch(next);
        if (!questionTypes) return;

        res.json({ questionTypes });
    };

    static getDefaults = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const questionTypes = await QuestionTypeData.getDefaults().catch(next);
        if (!questionTypes) return;

        res.json({ questionTypes });
    };

    static edit = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { type, description, colorId } = req.body;

        if (!type || !description || !colorId)
            return next(new BadRequestError("Tipo, Descrição e ColorId necessários"));

        const questionType = await QuestionTypeData.create(type, description, colorId).catch(
            (err) => {
                const { code, meta } = err;

                if (code === "P2002") {
                    switch (meta?.target) {
                        case "QuestionType_type_key":
                            return next(new BadRequestError("Tipo já está registrado!"));

                        default:
                            console.error(err);
                            return next(err);
                    }
                }

                if (code === "P2014") {
                    switch (meta?.relation_name) {
                        case "ColorToQuestionType":
                            return next(new BadRequestError("Cor já está em uso!"));

                        default:
                            console.error(err);
                            return next(err);
                    }
                }

                if (code === "P2025") {
                    return next(new BadRequestError("Cor não existe!"));
                }

                console.error(err);
                return next(err);
            }
        );
        if (!questionType) return;

        res.json({ questionType });
    };
}

export default QuestionTypeController;
