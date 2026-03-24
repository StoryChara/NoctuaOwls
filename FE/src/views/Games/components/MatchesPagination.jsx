import { useState, useMemo } from 'react';
import { FaCalendarAlt, FaTrophy, FaHandshake, FaTwitch, FaYoutube, FaFacebook, FaInstagram, FaTiktok, FaGamepad, FaChevronLeft, FaFilter } from 'react-icons/fa';
import { formatDate } from '../../../utils/formatDate';
import { getGroupColor } from '../../../utils/getGroupColor';

export function MatchesPagination({ matches }) {
    const [page, setPage] = useState(1);
    const [teamFilter, setTeamFilter] = useState('All');
    const [typeFilter, setTypeFilter] = useState('All');

    const ITEMS_PER_PAGE = 3;

    const teams = ['Noctua Gold', 'Noctua Black', 'Noctua White', 'Noctua Rose', 'Noctua Academy'];

    // 1. Lógica de filtrado memozada
    const filteredMatches = useMemo(() => {
        return matches.filter(m => {
            const matchesTeam = teamFilter === 'All' || m.equipo === teamFilter;
            const matchesType = typeFilter === 'All' ||
                (typeFilter === 'Torneo' ? m.torneo : !m.torneo);
            return matchesTeam && matchesType;
        });
    }, [matches, teamFilter, typeFilter]);

    // 2. Cálculos de paginación sobre la lista filtrada
    const totalPages = Math.ceil(filteredMatches.length / ITEMS_PER_PAGE) || 1;
    const displayedMatches = filteredMatches.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

    // Handlers para resetear página al filtrar
    const handleTeamChange = (e) => {
        setTeamFilter(e.target.value);
        setPage(1);
    };

    const handleTypeChange = (e) => {
        setTypeFilter(e.target.value);
        setPage(1);
    };

    return (
        <>
            {/* Sección de Filtros */}
            <div className="matches-filters d-flex flex-wrap justify-content-center">
                <div className="filter-group">
                    <label className="small fw-bold text-muted"><FaFilter size={12} /> Grupo:</label>
                    <select
                        className="form-select form-select-sm"
                        value={teamFilter}
                        onChange={handleTeamChange}
                        style={{ width: 'auto' }}
                    >
                        <option value="All">Todos los equipos</option>
                        {teams.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                </div>

                <div className="filter-group">
                    <label className="small fw-bold text-muted">Tipo:</label>
                    <select
                        className="form-select form-select-sm"
                        value={typeFilter}
                        onChange={handleTypeChange}
                        style={{ width: 'auto' }}
                    >
                        <option value="All">Cualquiera</option>
                        <option value="Torneo">Torneo</option>
                        <option value="Amistoso">Amistoso</option>
                    </select>
                </div>
            </div>

            {filteredMatches.length === 0 ? (
                <div className="empty-state text-center py-5">
                    <FaCalendarAlt className="empty-icon mb-2" size={40} style={{ opacity: 0.3 }} />
                    <p>No hay partidos que coincidan con los filtros</p>
                </div>
            ) : (
                <>
                    <div className="matches-list">
                        {displayedMatches.map(m => (
                            <div key={m.id_partido} className="match-card">
                                <div className="match-header d-flex flex-column flex-md-row justify-content-between align-items-center">
                                    {m.torneo ? (
                                        <span className="match-badge tournament mb-1 mb-md-0"><FaTrophy /> Torneo</span>
                                    ) : (
                                        <span className="match-badge friendly mb-1 mb-md-0"><FaHandshake /> Amistoso</span>
                                    )}
                                    <span className="match-date">{formatDate(m.fecha)}</span>
                                </div>
                                <div className="match-versus d-flex flex-column flex-md-row align-items-center justify-content-center mb-2">
                                    <div
                                        className={`match-team home ${m.equipo} mb-1 mb-md-0`}
                                        style={{ color: getGroupColor(m.equipo) }}
                                    >
                                        {m.equipo}
                                    </div>
                                    <div className="match-score mx-md-3 mb-1 mb-md-0">{m.puntaje || 'VS'}</div>
                                    <div className="match-team enemy">{m.enemigo}</div>
                                </div>
                                <div className="match-title text-center">{m.titulo}</div>

                                {m.stream && Object.keys(m.stream).length > 0 && (
                                    <div className="match-actions d-flex justify-content-center gap-2">
                                        {m.stream.twitch && <a href={m.stream.twitch} target="_blank" rel="noreferrer" className="btn-stream twitch"><FaTwitch /></a>}
                                        {m.stream.youtube && <a href={m.stream.youtube} target="_blank" rel="noreferrer" className="btn-stream youtube"><FaYoutube /></a>}
                                        {m.stream.facebook && <a href={m.stream.facebook} target="_blank" rel="noreferrer" className="btn-stream facebook"><FaFacebook /></a>}
                                        {m.stream.instagram && <a href={m.stream.instagram} target="_blank" rel="noreferrer" className="btn-stream instagram"><FaInstagram /></a>}
                                        {m.stream.tiktok && <a href={m.stream.tiktok} target="_blank" rel="noreferrer" className="btn-stream tiktok"><FaTiktok /></a>}
                                        {m.stream.kick && <a href={m.stream.kick} target="_blank" rel="noreferrer" className="btn-stream kick"><FaGamepad /></a>}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Controles de Paginación */}
                    <div className="pagination-controls d-flex justify-content-center align-items-center gap-3 mt-4">
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={page === 1}
                        >
                            <FaChevronLeft />
                        </button>
                        <span className="small fw-bold">Página {page} de {totalPages}</span>
                        <button
                            className="btn btn-outline-secondary btn-sm"
                            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                            disabled={page === totalPages}
                        >
                            <FaChevronLeft style={{ transform: 'rotate(180deg)' }} />
                        </button>
                    </div>
                </>
            )}
        </>
    );
}