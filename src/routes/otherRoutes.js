import { Router } from "express";
import passport from "passport";
import careeerController from "../controllers/others/careeerController.js";
import dependenceController from "../controllers/others/dependenceController.js";
import documentTypeController from "../controllers/others/documentTypeController.js";
import entityTypeController from "../controllers/others/entityTypeController.js";

const otherRoutes = Router();

otherRoutes.get("/career/",
    passport.authenticate("jwt", {session: false}),
    careeerController.read
);

otherRoutes.get("/dependence/",
    passport.authenticate("jwt", {session: false}),
    dependenceController.read
);

otherRoutes.get("/documenttype/",
    passport.authenticate("jwt", {session: false}),
    documentTypeController.read
);

otherRoutes.get("/entitytype/",
    passport.authenticate("jwt", {session: false}),
    entityTypeController.read
);

export { otherRoutes };