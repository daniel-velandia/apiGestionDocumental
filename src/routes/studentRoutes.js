import studentController from "../controllers/studentController.js";
import { Router } from "express";
import passport from "passport";

const studentRoutes = Router();

studentRoutes.post("/",
    passport.authenticate("jwt", {session: false}),
    studentController.create
);

studentRoutes.get("/",
    passport.authenticate("jwt", {session: false}),
    studentController.read
);

studentRoutes.get("/:id",
    passport.authenticate("jwt", {session: false}),
    studentController.searchById
);

studentRoutes.put("/:id",
    passport.authenticate("jwt", {session: false}),
    studentController.edit
);

studentRoutes.delete("/:id",
    passport.authenticate("jwt", {session: false}),
    studentController.remove
);

export { studentRoutes };