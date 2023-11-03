import express from "express";
import { securityConfiguration } from "./security/securityConfiguration.js";
import { variables } from "./utils/variables.js";

const app = express();

const PORT = variables.EXPRESS_PORT;
const HOST = variables.EXPRESS_HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

securityConfiguration(app);

app.listen(PORT, HOST, () => {
    console.log(`Escuchando por http://${HOST}:${PORT}`);
});