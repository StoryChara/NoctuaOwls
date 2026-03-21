import { useEffect, useState } from 'react';
import { FaGamepad, FaUsers, FaTrophy, FaEnvelope } from 'react-icons/fa';
import logoBlack from '../assets/Logo Noctua Owls BLACK.png';
import logoGold from '../assets/Logo Noctua Owls GOLD.png';
import './Home.css';
import { api } from '../utils/api';
import { registerUrl } from '../utils/SocialNetwork';

const ROLES_JUEGO = ['Capitán', 'Sub-Capitán', 'Coach'];

export function Home({ isDark }) {
    const [juegos, setJuegos] = useState([]);
    const [pgp, setPgp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [juegosRes, staffRes] = await Promise.all([
                    api.getJuegos({ estado: true }),
                    api.getUsersBy({}),
                ]);

                const todosJuegos = juegosRes.data ?? [];
                const todoStaff = staffRes.data ?? [];

                // Staff general (NOCTUA) — todos los cargos
                setPgp(
                    todoStaff
                        .filter(u => u.juegos.some(j => j.id === 'NOCTUA'))
                        .map(u => ({
                            name: `${u.nombre} ${u.apellido}`,
                            email: u.correo,
                            role: u.juegos.find(j => j.id === 'NOCTUA')?.cargo,
                        }))
                );

                // Disciplinas: excluir NOCTUA, filtrar staff solo por roles de juego
                const disciplinas = todosJuegos
                    .filter(j => j.id_juego !== 'NOCTUA')
                    .map(j => ({
                        tag: j.id_juego,
                        name: j.nombre,
                        genre: j.generos?.nombre ?? '',
                        color: j.color,
                        description: j.descripcion,
                        staff: todoStaff
                            .filter(u => u.juegos.some(s =>
                                s.id === j.id_juego && ROLES_JUEGO.includes(s.cargo)
                            ))
                            .map(u => ({
                                name: `${u.nombre} ${u.apellido}`,
                                email: u.correo,
                                role: u.juegos.find(s => s.id === j.id_juego)?.cargo,
                            }))
                            .sort((a, b) => ROLES_JUEGO.indexOf(a.role) - ROLES_JUEGO.indexOf(b.role)),
                    }));

                setJuegos(disciplinas);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <>
            {/* ── HERO ── */}
            <section className="hero">
                <div className="hero-glow" aria-hidden="true" />
                <div className="hero-inner">
                    <img src={isDark ? logoGold : logoBlack} alt="Noctua Owls" className="hero-logo" />
                    <h1 className="hero-title">Noctua <span className="hero-accent">Owls</span></h1>
                    <p className="hero-subtitle">E-Sports · Universidad Nacional de Colombia · Sede Bogotá</p>
                    <p className="hero-desc">Entrenamos, competimos y representamos a nuestra universidad en torneos universitarios y nacionales de deportes electrónicos.</p>
                    <div className="hero-cta">
                        <a href={registerUrl} target="_blank" rel="noreferrer" className="btn btn-accent btn-lg">Únete al equipo</a>
                        <a href="#disciplinas" className="btn btn-outline btn-lg">Ver disciplinas</a>
                    </div>
                </div>
            </section>

            {/* ── STATS / SOBRE NOSOTROS ── */}
            <section className="about" id="nosotros">
                <div className="container">
                    <div className="stats-row">
                        <div className="stat-card"><FaTrophy className="stat-icon" /><strong className="stat-num">{loading ? '—' : juegos.length}</strong><span className="stat-label">Disciplinas</span></div>
                        <div className="stat-card"><FaUsers className="stat-icon" /><strong className="stat-num">UNAL</strong><span className="stat-label">Bogotá</span></div>
                        <div className="stat-card"><FaGamepad className="stat-icon" /><strong className="stat-num">2025</strong><span className="stat-label">Fundación</span></div>
                    </div>
                    <div className="about-content">
                        <h2 className="section-title">Sobre Nosotros</h2>
                        <p className="about-text">Noctua Owls es el grupo estudiantil de E-Sports de la <strong>Universidad Nacional de Colombia, Sede Bogotá</strong>. Nuestro proyecto está dirigido al entrenamiento y desarrollo de deportistas electrónicos seleccionados para representar a la universidad en competiciones de videojuegos.</p>
                        <p className="about-text">Contamos con equipos de alto rendimiento y divisiones de formación en <strong>{loading ? '…' : juegos.length} disciplinas deportivas</strong>, reconocidas oficialmente en Colombia (Ley 026 de 2024) por su alta exigencia estratégica, técnica y mental.</p>
                        <div className="about-pgp">
                            <h3 className="about-pgp-title">Coordinación General</h3>
                            {/* ── Loading / Error solo en este bloque ── */}
                            {loading ? (
                                <div className="spinner" aria-label="Cargando..." />
                            ) : error ? (
                                <div className="error">Error: {error}</div>
                            ) : (
                                <div className="about-pgp-grid">
                                    {pgp.map((m) => (
                                        <div key={m.name} className="staff-pgp-card">
                                            <span className="staff-role-badge">{m.role}</span>
                                            <p className="staff-member-name">{m.name}</p>
                                            {m.email && <a href={`mailto:${m.email}`} className="staff-member-email"><FaEnvelope /> {m.email}</a>}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── DISCIPLINAS ── */}
            <section className="disciplines" id="disciplinas">
                <div className="container">
                    <h2 className="section-title text-center">Nuestras Disciplinas</h2>
                    <p className="section-sub text-center">Encuentra tu juego y forma parte de nuestros equipos de competencia</p>
                    {/* ── Loading / Error solo en este bloque ── */}
                    {loading ? (
                        <div className="spinner" aria-label="Cargando..." />
                    ) : error ? (
                        <div className="error">Error: {error}</div>
                    ) : (
                        <div className="disciplines-grid">
                            {juegos.map((disc) => (
                                <div key={disc.tag} className="disc-card">
                                    <div className="disc-tag" style={{ color: disc.color, background: disc.color + '1A', borderColor: disc.color + '55' }}>{disc.tag}</div>
                                    <h3 className="disc-name">{disc.name}</h3>
                                    <span className="disc-genre">{disc.genre}</span>
                                    <p className="disc-desc">{disc.description}</p>
                                    <div className="disc-staff">
                                        {disc.staff.map((m) => (
                                            <div key={m.name} className="disc-staff-member">
                                                <span className="staff-role-badge staff-role-badge--sm">{m.role}</span>
                                                <span className="staff-member-name">{m.name}</span>
                                                {m.email && <a href={`mailto:${m.email}`} className="staff-member-email"><FaEnvelope /> {m.email}</a>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* ── JOIN CTA ── */}
            <section className="cta-section">
                <div className="container">
                    <div className="cta-box">
                        <h2 className="cta-title">¿Listo para competir?</h2>
                        <p className="cta-desc">Regístrate y da el primer paso para representar a la Universidad Nacional de Colombia en torneos universitarios y nacionales de E-Sports.</p>
                        <a href={registerUrl} target="_blank" rel="noreferrer" className="btn btn-accent btn-lg">Formulario de Registro</a>
                    </div>
                </div>
            </section>
        </>
    );
}
