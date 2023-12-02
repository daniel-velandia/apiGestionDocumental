import functionaryController from "../controllers/functionaryController.js";
import { Router } from "express";
import passport from "passport";

const functionaryRoutes = Router();

functionaryRoutes.post("/",
    passport.authenticate("jwt", {session: false}),
    functionaryController.create
);

functionaryRoutes.get("/",
    passport.authenticate("jwt", {session: false}),
    functionaryController.read
);

functionaryRoutes.get("/:id",
    passport.authenticate("jwt", {session: false}),
    functionaryController.searchById
);

functionaryRoutes.put("/:id",
    passport.authenticate("jwt", {session: false}),
    functionaryController.edit
);

functionaryRoutes.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    functionaryController.remove
);

export { functionaryRoutes };