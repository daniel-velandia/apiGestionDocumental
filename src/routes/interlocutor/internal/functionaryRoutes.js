import functionaryController from "../../../controllers/interlocutor/internal/functionaryController.js";
import { Router } from "express";
import { jwtMiddleware, sessionMiddleware } from "../../../utils/middleware.js";

const functionaryRoutes = Router();

functionaryRoutes.use(jwtMiddleware, sessionMiddleware);

functionaryRoutes.post("/", functionaryController.create);
functionaryRoutes.get("/", functionaryController.read);
functionaryRoutes.get("/:id", functionaryController.searchById);
functionaryRoutes.put("/:id", functionaryController.edit);
functionaryRoutes.delete("/:id", functionaryController.remove);

export { functionaryRoutes };