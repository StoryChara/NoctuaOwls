// BE\src\modules\bd\bd.routes.js
import { Router } from "express";
import { bdController } from "./bd.controller.js";

const bdRouter = Router();

bdRouter.get("/usuarios", bdController.getUsuariosDetalle);
bdRouter.get("/juegos",   bdController.getJuegos);

export default bdRouter;