import crypto from "crypto";

export const randomHexCode = (size: number = 8) => {
    return crypto.randomBytes(Math.ceil(size / 2)).toString("hex");
};
