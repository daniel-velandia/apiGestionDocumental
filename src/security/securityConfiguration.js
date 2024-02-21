import passport from "passport";
import userAuthentication from "./userAuthentication.js";
import tokenAuthorization from "./tokenAuthorization.js";
import cors from "cors";
import { documentRoutes } from "../routes/document/documentRoutes.js";
import { studentRoutes } from "../routes/interlocutor/internal/studentRoutes.js";
import { functionaryRoutes } from "../routes/interlocutor/internal/functionaryRoutes.js";
import { externalpersonRoutes } from "../routes/interlocutor/external/externalPersonRoutes.js";
import { companyRoutes } from "../routes/interlocutor/external/companyRoutes.js";
import { userRoutes } from "../routes/user/userRoutes.js";
import { dataRoutes } from "../routes/data/dataRoutes.js";

const whiteList = ["http://localhost:3001", "https://gestdoc.netlify.app"];

const corsOptions = {
    "origin": (origin, callback) => {
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error("No permitido por CORS"));
        }
    },
    "allowedHeaders": "*",
    "methods": "*"
}

const securityConfiguration = (app) => {
    app.use(cors(corsOptions));
    app.use("/student", studentRoutes);
    app.use("/functionary", functionaryRoutes);
    app.use("/externalperson", externalpersonRoutes);
    app.use("/company", companyRoutes);
    app.use("/document", documentRoutes);
    app.use("/data", dataRoutes);
    app.use("/", userRoutes);
    passport.use(userAuthentication.localStrategy);
    passport.use(tokenAuthorization.jwtStrategy);
}

export { securityConfiguration };