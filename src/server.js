import express from "express";
import { securityConfiguration } from "./security/securityConfiguration.js";
import { variables } from "./utils/variables.js";
import { connection } from "./db/connection.js";
import careerService from "./services/others/careerService.js";
import entityTypeService from "./services/others/entityTypeService.js";
import dependenceService from "./services/others/dependenceService.js";
import documentTypeService from "./services/others/documentTypeService.js";

const app = express();

const PORT = variables.EXPRESS_PORT;
const HOST = variables.EXPRESS_HOST;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connection.clientDB()
.then(connection => {
    
    app.listen(PORT, HOST, () => {
        console.log(`Escuchando por http://${HOST}:${PORT}`);
    });

    careerService.create();
    entityTypeService.create();
    dependenceService.create();
    documentTypeService.create();
})
.catch( error => {
    console.log("Error al conectar DB: " + error);
    process.exit();
})

securityConfiguration(app);