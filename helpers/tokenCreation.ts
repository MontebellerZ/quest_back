import jwt from "jsonwebtoken";

const JWT_EXPIRATION = process.env.JWT_EXPIRATION;
if (!JWT_EXPIRATION) throw new Error("JWT_EXPIRATION not found in .env file");

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error("JWT_SECRET not found in .env file");

export const tokenCreation = (id: string, email: string, admin: boolean) => {
    const token = jwt.sign({ id, email, admin }, JWT_SECRET, {
        expiresIn: JWT_EXPIRATION,
    });

    return { token, expirationTime: JWT_EXPIRATION };
};
