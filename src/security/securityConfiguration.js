import passport from "passport";
import userAuthentication from "./userAuthentication.js";
import routes from "../routes/routes.js"
import tokenAuthorization from "./tokenAuthorization.js";
import cors from "cors";

const whiteList = ["http://localhost:3000", "https://gestdoc.netlify.app"];

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
    app.use("/", routes);
    passport.use(userAuthentication.localStrategy);
    passport.use(tokenAuthorization.jwtStrategy);
}

export { securityConfiguration };