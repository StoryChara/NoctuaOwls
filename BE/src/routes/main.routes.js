// BE\src\routes\main.routes.js
import { Router } from "express";
import bdRouter from "../modules/bd/bd.routes.js";

const mainRouter = Router();

mainRouter.get("/", (_req, res) => {
  res.status(200).json({
    service: "Noctua Owls Backend",
    basePath: "/api",
    availableCalls: {
      health: {
        method: "GET",
        path: "/api/health",
      },
      bd: [
        { method: "GET", path: "/api/bd/usuarios" },
      ],
    },
  });
});

mainRouter.get("/health", (_req, res) => {
  res.status(200).json({
    ok: true,
    timestamp: new Date().toISOString(),
  });
});

mainRouter.use("/bd", bdRouter);

export default mainRouter;
