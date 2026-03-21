// FE/src/utils/api.js
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000/api";

async function get(path) {
    const res = await fetch(`${BASE_URL}${path}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
}

export const api = {
    getUsersBy: ({ juegos = [], cargos = [] } = {}) => {
        const params = new URLSearchParams();
        if (juegos.length) params.set("juegos", juegos.join(","));
        if (cargos.length) params.set("cargos", cargos.join(","));
        const query = params.toString();
        return get(`/bd/usuarios${query ? `?${query}` : ""}`);
    },

    getJuegos: ({ estado } = {}) => {
        const params = new URLSearchParams();
        if (estado !== undefined) params.set("estado", estado);
        const query = params.toString();
        return get(`/bd/juegos${query ? `?${query}` : ""}`);
    }
};