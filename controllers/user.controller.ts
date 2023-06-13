import { NextFunction, Response } from "express";
import { AuthRequest } from "../types";
import UserData from "../data/user.data";
import { ApiError, NotFoundError, UnauthorizedError } from "../helpers/apiErrors";
import { encryptString } from "../helpers/encryptString";
import { BadRequestError } from "../helpers/apiErrors";
import { compareHashString } from "../helpers/compareHashString";
import { tokenCreation } from "../helpers/tokenCreation";
import { randomHexHash } from "../helpers/randomHexHash";
import { readHTML } from "../helpers/readHTML";
import { sendEmail } from "../helpers/sendEmail";
import { Admin, Color, Picture, User } from "@prisma/client";

const UserNotFound = () => {
    return new NotFoundError("Usuário não encontrado!");
};

function userWithoutSensitive(
    user: User & {
        Admin: Admin | null;
        Color: Color | null;
        Picture: Picture | null;
    }
) {
    const { password, email, enabled, ...safeUser } = user;
    return safeUser;
}

function userWithoutPassword(
    user: User & {
        Admin: Admin | null;
        Color: Color | null;
        Picture: Picture | null;
    }
) {
    const { password, ...safeUser } = user;
    return safeUser;
}

class UserController {
    static login = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { nickname, password } = req.body;

        if (!nickname || !password)
            return next(new BadRequestError("Nickname e Senha necessários"));

        const user = await UserData.login(nickname).catch(() => next(UserNotFound()));
        if (!user) return;

        const passwordMatches = compareHashString(password, user.password);
        if (!passwordMatches) return next(new UnauthorizedError("Senha incorreta!"));

        const { token, expirationTime } = tokenCreation(user.id, user.email, !!user.Admin?.id);

        const safeUser = userWithoutPassword(user);

        res.json({ user: safeUser, token, expirationTime });
    };

    static getUserByNick = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { nickname } = req.params;

        const user = await UserData.getUserByNick(nickname).catch(() => next(UserNotFound()));
        if (!user) return;

        const safeUser = userWithoutSensitive(user);

        return res.json(safeUser);
    };

    static create = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { email, nickname, password } = req.body;

        if (!email || !nickname || !password)
            return next(new BadRequestError("Email, Nickname e Senha necessários"));

        const hashPassword = encryptString(password);

        const user = await UserData.create(email, nickname, hashPassword).catch((err: any) => {
            const target = err.meta?.target;
            switch (target) {
                case "User_email_key":
                    return next(new BadRequestError("Email já está em uso!"));

                case "User_nickname_key":
                    return next(new BadRequestError("Nickname já está em uso!"));

                default:
                    console.error(err);
                    return next(err);
            }
        });
        if (!user) return;

        res.json({ message: "Usuário criado com sucesso" });

        const template = readHTML("userCreated.html");
        const htmlToSend = template({ nickname: user.nickname });
        const emailSubject = `Bem vindx, ${user.nickname} - Quest - MontebellerZ Games`;

        sendEmail(user.email, emailSubject, htmlToSend).catch((err) => console.error(err));
    };

    static changeEmail = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const { email } = req.body;

        if (!email) return next(new BadRequestError("Email necessário"));

        const user = await UserData.changeEmail(id, email).catch(() => next(UserNotFound()));
        if (!user) return;

        const { token, expirationTime } = tokenCreation(user.id, user.email, !!user.Admin?.id);

        const safeUser = userWithoutPassword(user);

        res.json({ user: safeUser, token, expirationTime });
    };

    static changeNickname = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const { nickname } = req.body;

        if (!nickname) return next(new BadRequestError("Nickname necessário"));

        const user = await UserData.changeNickname(id, nickname).catch(() => next(UserNotFound()));
        if (!user) return;

        const safeUser = userWithoutPassword(user);

        res.json({ user: safeUser });
    };

    static resetPassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { email } = req.body;
        if (!email) return next(new BadRequestError("Email necessário"));

        const { hex, hash } = randomHexHash();

        const user = await UserData.resetPassword(email, hash).catch(() => next(UserNotFound()));
        if (!user) return;

        const template = readHTML("resetPassword.html");
        const htmlToSend = template({ nickname: user.nickname, password: hex });

        try {
            await sendEmail(email, "Redefinição de senha - Quest - MontebellerZ Games", htmlToSend);
        } catch {
            return next(new ApiError("Erro durante o envio de email", 500));
        }

        res.json({ message: "Senha alterada com sucesso!" });
    };

    static newPassword = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id, email } = req.user;
        const { password } = req.body;

        if (!password) return next(new BadRequestError("Senha necessária"));

        const hashPassword = encryptString(password);

        const user = await UserData.newPassword(id, hashPassword).catch(() => next(UserNotFound()));
        if (!user) return;

        res.json({ message: "Senha alterada com sucesso" });

        const template = readHTML("newPassword.html");
        const htmlToSend = template({ nickname: user.nickname });

        sendEmail(email, "Alteração de senha - Quest - MontebellerZ Games", htmlToSend).catch(
            (err) => console.error(err)
        );
    };

    static changeEnabled = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const { enabled } = req.body;

        if (!enabled) return next(new BadRequestError("Habilitado necessário"));

        const user = await UserData.changeEnabled(id, enabled).catch(() => next(UserNotFound()));
        if (!user) return;

        const status = enabled ? "habilitado" : "desabilitado";
        res.json({ message: `Usuário ${status} com sucesso` });
    };

    static changeColor = async (req: AuthRequest, res: Response, next: NextFunction) => {
        const { id } = req.user;
        const { colorId } = req.body;

        if (!colorId) return next(new BadRequestError("ColorId necessário"));

        const user = await UserData.changeColor(id, colorId).catch(() => next(UserNotFound()));
        if (!user) return;

        const safeUser = userWithoutPassword(user);

        res.json({ user: safeUser });
    };
}

export default UserController;
