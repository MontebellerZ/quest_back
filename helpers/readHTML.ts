import fs from "fs";
import handlebars from "handlebars";
import path from "path";

const HTML_TEMPLATES_PATH = process.env.HTML_TEMPLATES_PATH;
if (!HTML_TEMPLATES_PATH) throw new Error("HTML_TEMPLATES_PATH not found in .env file");

export const readHTML = (filename: string) => {
    const source = fs.readFileSync(path.resolve(HTML_TEMPLATES_PATH, filename), "utf8");
    const template = handlebars.compile(source);
    return template;
};
