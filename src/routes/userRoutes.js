import userController from "../controllers/userController.js";
import { Router } from "express";
import passport from "passport";

const userRoutes = Router();

userRoutes.post("/",
    userController.create
);

userRoutes.get("/",
    passport.authenticate("jwt", {session: false}),
    userController.searchByUsername
);

userRoutes.post("/signin",
    passport.authenticate("local", {session: false}),
    userController.signin
);

export { userRoutes };