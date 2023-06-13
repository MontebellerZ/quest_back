import bcrypt from "bcryptjs";

export const compareHashString = (string: string, hash: string) => {
    return bcrypt.compareSync(string, hash);
};
