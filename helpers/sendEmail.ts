import nodemailer from "nodemailer";

const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL;
if (!NODEMAILER_EMAIL) throw new Error("NODEMAILER_EMAIL not found in .env file");

const NODEMAILER_SENHA = process.env.NODEMAILER_SENHA;
if (!NODEMAILER_SENHA) throw new Error("NODEMAILER_SENHA not found in .env file");

const NODEMAILER_SERVICE = process.env.NODEMAILER_SERVICE;
if (!NODEMAILER_SERVICE) throw new Error("NODEMAILER_SERVICE not found in .env file");

export const sendEmail = async (receivers: string | string[], subject: string, body: string) => {
    return new Promise((resolve, reject) => {
        const mailOptions = {
            from: NODEMAILER_EMAIL,
            to: receivers,
            subject: subject,
            html: body,
        };

        const transporter = nodemailer.createTransport({
            service: NODEMAILER_SERVICE,
            auth: {
                user: NODEMAILER_EMAIL,
                pass: NODEMAILER_SENHA,
            },
        });

        transporter.sendMail(mailOptions, (err) => {
            if (err) reject(err);
            resolve(null);
        });
    });
};
