import documentController from "../../controllers/document/documentController.js";
import { Router } from "express";
import { jwtMiddleware, sessionMiddleware } from "../../utils/middleware.js";

const documentRoutes = Router();

documentRoutes.use(jwtMiddleware, sessionMiddleware);

documentRoutes.post("/", documentController.create);
documentRoutes.get("/", documentController.read);
// documentRoutes.get("/search", documentController.search);
documentRoutes.get("/:id", documentController.searchById);
documentRoutes.put("/:id", documentController.edit);
documentRoutes.delete("/:id", documentController.remove);

export { documentRoutes };