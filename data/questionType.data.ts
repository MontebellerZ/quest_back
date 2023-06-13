import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class QuestionTypeData {
    static create = async (type: string, description: string, colorId: number) => {
        const user = await prisma.questionType.create({
            data: {
                type,
                description,
                color: { connect: { id: colorId } },
            },
            include: { color: true },
        });
        return user;
    };

    static getAll = async () => {
        const questionTypes = await prisma.questionType.findMany({
            include: { color: true, symbol: true },
            orderBy: { type: "asc" },
        });
        return questionTypes;
    };

    static getDefaults = async () => {
        const questionTypes = await prisma.questionType.findMany({
            where: { isDefault: true },
            include: { color: true, symbol: true },
            orderBy: { type: "asc" },
        });
        return questionTypes;
    };
}

export default QuestionTypeData;
