import companyController from "../controllers/companyController.js";
import studentController from "../controllers/studentController.js";
import functionaryController from "../controllers/functionaryController.js";
import externalPersonController from "../controllers/externalPersonController.js";
import documentController from "../controllers/documentController.js";
import userController from "../controllers/userController.js";
import { Router } from "express";
import passport from "passport";

const routes = Router();

// user

routes.post("/user",
    userController.create
);

routes.get("/user",
    passport.authenticate("jwt", {session: false}),
    userController.read
);

routes.post("/user/signin",
    passport.authenticate("local", {session: false}),
    userController.signin
);

// student

routes.post("/student",
    passport.authenticate("jwt", {session: false}),
    studentController.create
);

routes.get("/student",
    passport.authenticate("jwt", {session: false}),
    studentController.read
);

routes.get("/student/:id",
    passport.authenticate("jwt", {session: false}),
    studentController.detail
);

routes.put("/student/:id",
    passport.authenticate("jwt", {session: false}),
    studentController.edit
);

routes.delete("/student/:id",
    passport.authenticate("jwt", {session: false}),
    studentController.remove
);

// company

routes.post("/company",
    passport.authenticate("jwt", {session: false}),
    companyController.create
);

routes.get("/company",
    passport.authenticate("jwt", {session: false}),
    companyController.read
);

routes.get("/company/:id",
    passport.authenticate("jwt", {session: false}),
    companyController.detail
);

routes.put("/company/:id",
    passport.authenticate("jwt", {session: false}),
    companyController.edit
);

routes.delete("/company/:id",
    passport.authenticate("jwt", {session: false}),
    companyController.remove
);

// functionary

routes.post("/functionary",
    passport.authenticate("jwt", {session: false}),
    functionaryController.create
);

routes.get("/functionary",
    passport.authenticate("jwt", {session: false}),
    functionaryController.read
);

routes.get("/functionary/:id",
    passport.authenticate("jwt", {session: false}),
    functionaryController.detail
);

routes.put("/functionary/:id",
    passport.authenticate("jwt", {session: false}),
    functionaryController.edit
);

routes.delete("/functionary/:id",
    passport.authenticate("jwt", {session: false}),
    functionaryController.remove
);

// externalPerson

routes.post("/externalperson",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.create
);

routes.get("/externalperson",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.read
);

routes.get("/externalperson/:id",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.detail
);

routes.put("/externalperson/:id",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.edit
);

routes.delete("/externalperson/:id",
    passport.authenticate("jwt", {session: false}),
    externalPersonController.remove
);

// document

routes.post("/document",
    passport.authenticate("jwt", {session: false}),
    documentController.create
);

routes.get("/document",
    passport.authenticate("jwt", {session: false}),
    documentController.read
);

routes.get("/document/:id",
    passport.authenticate("jwt", {session: false}),
    documentController.detail
);

routes.put("/document/:id",
    passport.authenticate("jwt", {session: false}),
    documentController.edit
);

routes.delete("/document/:id",
    passport.authenticate("jwt", {session: false}),
    documentController.remove
);

export default routes;