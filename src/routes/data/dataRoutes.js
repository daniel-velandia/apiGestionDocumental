import careeerController from "../../controllers/data/careeerController.js";
import dependenceController from "../../controllers/data/dependenceController.js";
import documentTypeController from "../../controllers/data/documentTypeController.js";
import interlocutorTypeController from "../../controllers/data/interlocutorTypeController.js";
import { Router } from "express";
import { jwtMiddleware, sessionMiddleware } from "../../utils/middleware.js";

const dataRoutes = Router();

dataRoutes.use(jwtMiddleware, sessionMiddleware);

dataRoutes.get("/career", careeerController.read);
dataRoutes.get("/dependence", dependenceController.read);
dataRoutes.get("/document-type", documentTypeController.read);
dataRoutes.get("/interlocutor-type", interlocutorTypeController.read);

export { dataRoutes };