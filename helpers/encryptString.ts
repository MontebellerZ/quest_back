import bcrypt from "bcryptjs";

export const encryptString = (stringToHash: string) => {
    try {
        return bcrypt.hashSync(stringToHash, 10);
    } catch (error) {
        throw error;
    }
};
