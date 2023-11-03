import dotenv from "dotenv";

dotenv.config(
    {path: new URL(`../${process.env.NODE_ENV}`, import.meta.url)
});

const variables = {
    EXPRESS_HOST: process.env.EXPRESS_HOST,
    EXPRESS_PORT: process.env.EXPRESS_PORT,
    SECRET_TOKEN: process.env.SECRET_TOKEN
}

export { variables };