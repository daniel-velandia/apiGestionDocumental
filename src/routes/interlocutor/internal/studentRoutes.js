import studentController from "../../../controllers/interlocutor/internal/studentController.js";
import { Router } from "express";
import { jwtMiddleware, sessionMiddleware } from "../../../utils/middleware.js";

const studentRoutes = Router();

studentRoutes.use(jwtMiddleware, sessionMiddleware);

studentRoutes.post("/", studentController.create);
studentRoutes.get("/", studentController.read);
studentRoutes.get("/:id", studentController.searchById);
studentRoutes.put("/:id", studentController.edit);
studentRoutes.delete("/:id", studentController.remove);

export { studentRoutes };