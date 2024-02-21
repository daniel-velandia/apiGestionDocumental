import userController from "../../controllers/user/userController.js";
import { Router } from "express";
import { jwtMiddleware, localMiddleware, sessionMiddleware } from "../../utils/middleware.js";

const userRoutes = Router();

userRoutes.post("/",
    userController.create
);

userRoutes.get("/",
    jwtMiddleware, sessionMiddleware,
    userController.searchByUsername
);

userRoutes.post("/login",
    localMiddleware, sessionMiddleware,
    userController.login
);

export { userRoutes };