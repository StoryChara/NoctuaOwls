// BE\src\modules\bd\bd.service.js
import { supabase } from "../../config/supabaseClient.js";

export const bdService = {

  async getUsuariosDetalle({ juegos = [], cargos = [] } = {}) {
    const { data, error } = await supabase.rpc("get_usuarios_detalle", {
      p_claves: juegos,
      p_cargos: cargos,
    });
    if (error) throw error;
    return data;
  },

  async getJuegos({ estado = null } = {}) {
    let query = supabase
      .from("juego")
      .select("id_juego, clave, nombre, descripcion, color, estado, generos(nombre)")
      .neq("id_juego", 1)
      .order("id_juego");
    if (estado !== null) query = query.eq("estado", estado);
    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

};