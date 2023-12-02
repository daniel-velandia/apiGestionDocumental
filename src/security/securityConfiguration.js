import passport from "passport";
import userAuthentication from "./userAuthentication.js";
import tokenAuthorization from "./tokenAuthorization.js";
import cors from "cors";
import { documentRoutes } from "../routes/documentRoutes.js";
import { studentRoutes } from "../routes/studentRoutes.js";
import { functionaryRoutes } from "../routes/functionaryRoutes.js";
import { externalpersonRoutes } from "../routes/externalPersonRoutes.js";
import { companyRoutes } from "../routes/companyRoutes.js";
import { userRoutes } from "../routes/userRoutes.js";
import { otherRoutes } from "../routes/otherRoutes.js";

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
    app.use("/other", otherRoutes);
    app.use("/user", userRoutes);
    app.use("/", documentRoutes);
    passport.use(userAuthentication.localStrategy);
    passport.use(tokenAuthorization.jwtStrategy);
}

export { securityConfiguration };