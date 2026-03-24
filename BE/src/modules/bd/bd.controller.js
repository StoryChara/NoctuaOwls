// BE\src\modules\bd\bd.controller.js
import { bdService } from "./bd.service.js";
import { handleAsync } from "../../utils/handleAsync.js";

export const bdController = {
  getUsuariosDetalle: handleAsync(async (req, res) => {
    const juegos = req.query.juegos ? req.query.juegos.split(",") : [];
    const cargos = req.query.cargos ? req.query.cargos.split(",") : [];
    const data = await bdService.getUsuariosDetalle({ juegos, cargos });
    res.status(200).json({ ok: true, data });
  }),

  getJuegos: handleAsync(async (req, res) => {
    // ?estado=true → activos | ?estado=false → inactivos | sin param → todos
    const estado = req.query.estado !== undefined
      ? req.query.estado === "true"
      : null;
    const data = await bdService.getJuegos({ estado });
    res.status(200).json({ ok: true, data });
  }),

  getJuegoInfo: handleAsync(async (req, res) => {
    const { clave } = req.query;
    const data = await bdService.getJuegoDetalle(clave);
    res.status(200).json({ ok: true, data });
  }),
};
