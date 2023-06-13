import { encryptString } from "./encryptString";
import { randomHexCode } from "./randomHexCode";

export const randomHexHash = (size: number = 8) => {
    const hex = randomHexCode(size);
    const hash = encryptString(hex);

    return { hex, hash };
};
