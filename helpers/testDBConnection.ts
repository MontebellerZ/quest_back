import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const testDBConnection = async () => {
    return await prisma.color.findMany();
};
