import externalPersonController from "../../../controllers/interlocutor/external/externalPersonController.js";
import { Router } from "express";
import { jwtMiddleware, sessionMiddleware } from "../../../utils/middleware.js";

const externalpersonRoutes = Router();

externalpersonRoutes.use(jwtMiddleware, sessionMiddleware);

externalpersonRoutes.post("/", externalPersonController.create);
externalpersonRoutes.get("/", externalPersonController.read);
externalpersonRoutes.get("/:id", externalPersonController.searchById);
externalpersonRoutes.put("/:id", externalPersonController.edit);
externalpersonRoutes.delete("/:id", externalPersonController.remove);

export { externalpersonRoutes };