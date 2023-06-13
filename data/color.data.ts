import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ColorData {
    static create = async (hexCode: string) => {
        const user = await prisma.color.create({
            data: {
                hexCode,
            },
        });
        return user;
    };

    static getAll = async () => {
        const colors = await prisma.color.findMany();
        return colors;
    };

    static get = async (id: number) => {
        const colors = await prisma.color.findFirstOrThrow({
            where: { id },
        });
        return colors;
    };

    static changeHexCode = async (id: number, hexCode: string) => {
        const colors = await prisma.color.update({
            data: {
                hexCode,
            },
            where: { id },
        });
        return colors;
    };
}

export default ColorData;
