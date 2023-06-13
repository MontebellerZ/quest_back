import { Admin, Color, Picture, PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

class UserData {
    static login = async (nickname: string) => {
        const user = await prisma.user.findFirstOrThrow({
            where: { nickname },
            include: { Admin: true, Color: true, Picture: true },
        });
        return user;
    };

    static getUserPassowrd = async (id: string) => {
        const { password } = await prisma.user.findFirstOrThrow({
            where: { id },
            select: { password: true },
        });

        return password;
    };

    static getUser = async (id: string) => {
        const user = await prisma.user.findFirstOrThrow({
            where: { id },
            include: { Admin: true, Color: true, Picture: true },
        });
        return user;
    };

    static getUserByNick = async (nickname: string) => {
        const user = await prisma.user.findFirstOrThrow({
            where: { nickname },
            include: { Admin: true, Color: true, Picture: true },
        });
        return user;
    };

    static create = async (email: string, nickname: string, password: string) => {
        const user = await prisma.user.create({ data: { email, nickname, password } });
        return user;
    };

    static changeEmail = async (id: string, email: string) => {
        const user = await prisma.user.update({
            data: { email },
            where: { id },
            include: { Admin: true, Color: true, Picture: true },
        });
        return user;
    };

    static changeNickname = async (id: string, nickname: string) => {
        const user = await prisma.user.update({
            data: { nickname },
            where: { id },
            include: { Admin: true, Color: true, Picture: true },
        });
        return user;
    };

    static resetPassword = async (email: string, password: string) => {
        const user = await prisma.user.update({ data: { password }, where: { email } });
        return user;
    };

    static newPassword = async (id: string, password: string) => {
        const user = await prisma.user.update({ data: { password }, where: { id } });
        return user;
    };

    static changePicture = async (id: string) => {};

    static changeEnabled = async (id: string, enabled: boolean) => {
        const user = await prisma.user.update({ data: { enabled }, where: { id } });
        return user;
    };

    static changeColor = async (userId: string, colorId: number) => {
        const user = await prisma.user.update({
            data: { Color: { connect: { id: colorId } } },
            where: { id: userId },
            include: { Admin: true, Color: true, Picture: true },
        });
        return user;
    };

    static winGame = async (id: string) => {
        const user = await prisma.user.update({
            data: { wins: { increment: 1 }, games: { increment: 1 } },
            where: { id },
        });
        return user;
    };

    static loseGame = async (id: string) => {
        const user = await prisma.user.update({ data: { games: { increment: 1 } }, where: { id } });
        return user;
    };
}

export default UserData;
