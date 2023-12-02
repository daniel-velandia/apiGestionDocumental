import documentController from "../controllers/documentController.js";
import { Router } from "express";
import passport from "passport";

const documentRoutes = Router();

documentRoutes.post("/",
    passport.authenticate("jwt", {session: false}),
    documentController.create
);

documentRoutes.get("/",
    passport.authenticate("jwt", {session: false}),
    documentController.read
);

documentRoutes.get("/file/:id",
    passport.authenticate("jwt", {session: false}),
    documentController.searchFile
);

documentRoutes.get("/search",
    passport.authenticate("jwt", {session: false}),
    documentController.search
);

documentRoutes.get("/:id",
    passport.authenticate("jwt", {session: false}),
    documentController.searchById
);

documentRoutes.put("/:id",
    passport.authenticate("jwt", {session: false}),
    documentController.edit
);

documentRoutes.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    documentController.remove
);

export { documentRoutes };