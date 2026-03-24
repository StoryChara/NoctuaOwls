import { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { FaChevronLeft } from 'react-icons/fa';
import './Game.css';

import { api } from '../../utils/api';

import { RosterGroup } from './components/RosterGroupPagination';
import { MatchesPagination } from './components/MatchesPagination';

import { ROLE_PRIORITY } from '../../utils/RolePriority';

export function Game() {
    const { clave_juego } = useParams();
    const navigate = useNavigate();
    const [info, setInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [infoRes] = await Promise.all([
                    api.getJuegoInfo(clave_juego),
                ]);

                setInfo(infoRes.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [clave_juego]);

    const { rosterGroups, matches } = useMemo(() => {
        if (!info) return { rosterGroups: [], matches: [] };

        const groups = {
            'Staff & Coordinación': [],
            'Noctua Gold': [],
            'Noctua Black': [],
            'Noctua White': [],
            'Noctua Rose': [],
            'Noctua Academy': []
        };

        const groupKeys = Object.keys(groups);

        const Role_Priority = Object.fromEntries(
            Object.entries(ROLE_PRIORITY).slice(1, 6)
        );

        const sortedUsers = [...(info.usuarios || [])].sort((a, b) => {
            const roleA = a.cargos.find(c => Role_Priority[c]) || '';
            const roleB = b.cargos.find(c => Role_Priority[c]) || '';
            const prioA = Role_Priority[roleA] || 99;
            const prioB = Role_Priority[roleB] || 99;
            return prioA - prioB;
        });

        sortedUsers.forEach(u => {
            let assignedToTeam = false;
            let isStaff = false;

            // Check for specific team tags in cargos
            u.cargos.forEach(cargo => {
                if (cargo.includes('Gold')) {
                    groups['Noctua Gold'].push(u);
                    assignedToTeam = true;
                } else if (cargo.includes('Black')) {
                    groups['Noctua Black'].push(u);
                    assignedToTeam = true;
                } else if (cargo.includes('White')) {
                    groups['Noctua White'].push(u);
                    assignedToTeam = true;
                } else if (cargo.includes('Rose')) {
                    groups['Noctua Rose'].push(u);
                    assignedToTeam = true;
                } else if (cargo.includes('Academy')) {
                    groups['Noctua Academy'].push(u);
                    assignedToTeam = true;
                }

                if (Role_Priority[cargo]) {
                    isStaff = true;
                }
            });

            if (!assignedToTeam || isStaff) {
                groups['Staff & Coordinación'].push(u);
            }
        });

        const _rosterGroups = groupKeys
            .filter(key => groups[key].length > 0)
            .map(key => ({
                name: key,
                members: groups[key]
            }));

        const _matches = info.partidos || [];
        return { rosterGroups: _rosterGroups, matches: _matches };
    }, [info]);

    if (loading) return <div className="game-page"><div className="spinner" aria-label="Cargando..." /></div>;
    if (error) return <div className="game-page"><div className="error">Error: {error}</div></div>;
    if (!info) {
        return <Navigate to="/404" replace />;
    };

    return (
        <div className="game-page" style={{ '--game-accent': info.color }}>
            {/* ── HEADER / HERO ── */}
            <header className="game-header">
                <div className="game-header-bg" aria-hidden="true" />
                <div className="container game-header-inner">
                    <button
                        onClick={() => navigate(-1)}
                        className="back-link"
                        style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }}
                    >
                        <FaChevronLeft /> Volver
                    </button>
                    {loading ? (
                        <div className="spinner" aria-label="Cargando..." />
                    ) : error ? (
                        <div className="error">Error: {error}</div>
                    ) : (
                        <>
                            <div className="game-title-wrapper">
                                <span className="game-tag">{info.clave}</span>
                                <h1 className="game-title">{info.nombre}</h1>
                            </div>
                            <div className="game-meta">
                                <span className="game-genre">{info.genero}</span>
                                {/* Status Button: Gold (Active) or Black (Inactive) */}
                                <span className={`game-status ${info.estado ? 'status-active' : 'status-inactive'}`}>
                                    {info.estado ? 'Activo' : 'Inactivo'}
                                </span>
                            </div>
                            <p className="game-desc">{info.descripcion}</p>
                        </>
                    )}
                </div>
            </header>

            {loading ? (
                <div className="spinner" aria-label="Cargando..." />
            ) : error ? (
                <div className="error">Error: {error}</div>
            ) : (
                <div className="container game-content">
                    <div className="row g-4">

                        {/* ── LEFT COL: ROSTER ── */}
                        <div className="col-12 col-xl-7">
                            <h2 className="section-title">Nuestros Equipos</h2>

                            {rosterGroups.length === 0 && (
                                <p className="text-muted">No hay jugadores registrados aún.</p>
                            )}

                            {rosterGroups.map((group) => (
                                <RosterGroup key={group.name} group={group} />
                            ))}
                        </div>

                        {/* ── RIGHT COL: MATCHES ── */}
                        <div className="col-12 col-xl-5">
                            <div className="matches-sidebar">
                                <h2 className="section-title">Partidos</h2>
                                <MatchesPagination matches={matches} />
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};