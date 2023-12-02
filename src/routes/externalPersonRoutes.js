import externalPersonController from "../controllers/externalPersonController.js";
import { Router } from "express";
import passport from "passport";

const externalpersonRoutes = Router();

externalpersonRoutes.post("/",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.create
);

externalpersonRoutes.get("/",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.read
);

externalpersonRoutes.get("/:id",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.searchById
);

externalpersonRoutes.put("/:id",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.edit
);

externalpersonRoutes.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.remove
);

export { externalpersonRoutes };