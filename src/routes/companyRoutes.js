import companyController from "../controllers/companyController.js";
import { Router } from "express";
import passport from "passport";

const companyRoutes = Router();

companyRoutes.post("/",
    passport.authenticate("jwt", {session: false}),
    companyController.create
);

companyRoutes.get("/",
    passport.authenticate("jwt", {session: false}),
    companyController.read
);

companyRoutes.get("/:id",
    passport.authenticate("jwt", {session: false}),
    companyController.searchById
);

companyRoutes.put("/:id",
    passport.authenticate("jwt", {session: false}),
    companyController.edit
);

companyRoutes.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    companyController.remove
);

export { companyRoutes };