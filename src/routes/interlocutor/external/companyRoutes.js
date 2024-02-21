import companyController from "../../../controllers/interlocutor/external/companyController.js";
import { Router } from "express";
import { jwtMiddleware, sessionMiddleware } from "../../../utils/middleware.js";

const companyRoutes = Router();

companyRoutes.use(jwtMiddleware, sessionMiddleware);

companyRoutes.post("/", companyController.create);
companyRoutes.get("/", companyController.read);
companyRoutes.get("/:id", companyController.searchById);
companyRoutes.put("/:id", companyController.edit);
companyRoutes.delete("/:id", companyController.remove);

export { companyRoutes };