import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGamepad, FaUsers, FaTrophy, FaEnvelope, FaChevronDown } from 'react-icons/fa';

import logoBlack from '../assets/Logo Noctua Owls BLACK.png';
import logoGold from '../assets/Logo Noctua Owls GOLD.png';

import './Home.css';

import { api } from '../utils/api';
import { registerUrl } from '../utils/SocialNetwork';

import { ROLE_PRIORITY } from '../utils/RolePriority';

const ROLES_JUEGO = ['Coordinador', 'Sub-Coordinador', 'Coach'];

export function Home({ isDark }) {
    const [juegos, setJuegos] = useState([]);
    const [pgp, setPgp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [juegosRes, staffRes, pgpRes] = await Promise.all([
                    api.getJuegos({ estado: true }),
                    api.getUsersBy({ cargos: Object.keys(ROLE_PRIORITY).slice(1, 4) }),
                    api.getUsersBy({ juegos: ['NOCTUA'] }),
                ]);

                const todosJuegos = juegosRes.data ?? [];
                const todoStaff = staffRes.data ?? [];

                // PGP: ya viene filtrado por NOCTUA
                setPgp(pgpRes.data ?? []);

                // Disciplinas: asociar staff a cada juego
                const disciplinas = todosJuegos.map(j => ({
                    ...j,
                    staff: todoStaff
                        .filter(u => u.juegos.some(s => s.clave === j.clave))
                        .sort((a, b) =>
                            ROLES_JUEGO.indexOf(a.juegos.find(s => s.clave === j.clave)?.cargo) -
                            ROLES_JUEGO.indexOf(b.juegos.find(s => s.clave === j.clave)?.cargo)
                        ),
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
                <div className="hero-pattern" aria-hidden="true" />
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
                <a href="#nosotros" className="hero-scroll-btn" aria-label="Ir abajo">
                    <FaChevronDown />
                </a>
            </section>

            {/* ── STATS / SOBRE NOSOTROS ── */}
            <section className="about" id="nosotros">
                <div className="container">
                    <div className="stats-row row justify-content-center g-4">
                        <div className="col-12 col-md-4">
                            <div className="stat-card h-100" style={{ animationDelay: '0.1s' }}><FaTrophy className="stat-icon" /><strong className="stat-num">{loading ? '—' : juegos.length}</strong><span className="stat-label">Disciplinas</span></div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="stat-card h-100" style={{ animationDelay: '0.2s' }}><FaUsers className="stat-icon" /><strong className="stat-num">UNAL</strong><span className="stat-label">Bogotá</span></div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="stat-card h-100" style={{ animationDelay: '0.3s' }}><FaGamepad className="stat-icon" /><strong className="stat-num">2025</strong><span className="stat-label">Fundación</span></div>
                        </div>
                    </div>
                    <div className="about-content">
                        <h2 className="section-title">Sobre Nosotros</h2>
                        <p className="about-text">Noctua Owls es el grupo estudiantil de E-Sports de la <strong>Universidad Nacional de Colombia, Sede Bogotá</strong>. Nuestro proyecto está dirigido al entrenamiento y desarrollo de deportistas electrónicos seleccionados para representar a la universidad en competiciones de videojuegos.</p>
                        <p className="about-text">Contamos con equipos de alto rendimiento y divisiones de formación en <strong>{loading ? '…' : juegos.length} disciplinas deportivas</strong>, reconocidas oficialmente en Colombia (Ley 026 de 2024) por su alta exigencia estratégica, técnica y mental.</p>
                    </div>
                    <div className="about-pgp">
                        <h3 className="about-pgp-title">Coordinación General</h3>
                        {/* ── Loading / Error solo en este bloque ── */}
                        {loading ? (
                            <div className="spinner" aria-label="Cargando..." />
                        ) : error ? (
                            <div className="error">Error: {error}</div>
                        ) : (
                            <div className="row g-3 justify-content-center">
                                {pgp.map((m) => (
                                    <div key={m.id_usuario} className="col-12 col-md-6">
                                        <div className="staff-pgp-card h-100">
                                            <span className="staff-role-badge">{m.juegos[0]?.cargo}</span>
                                            <p className="staff-member-name">{m.nombre} {m.apellido}</p>
                                            {m.correo && <a href={`mailto:${m.correo}`} className="staff-member-email"><FaEnvelope /> {m.correo}</a>}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
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
                        <div className="row g-4 mt-5 justify-content-center">
                            {juegos.map((disc, index) => (
                                <div key={disc.id_juego} className="col-12 col-md-6 col-lg-4">
                                    <div className="disc-card h-100 d-flex flex-column" style={{ '--card-accent': disc.color, animationDelay: `${index * 100}ms` }}>
                                        <Link to={`/game/${disc.clave}`} style={{ textDecoration: 'none' }}>
                                            <div className="disc-tag">{disc.clave}</div>
                                            <h3 className="disc-name">{disc.nombre}</h3>
                                            <span className="disc-genre">{disc.generos?.nombre}</span>
                                            <p className="disc-desc">{disc.descripcion}</p>
                                        </Link>
                                        <div className="disc-staff mt-auto">
                                            {disc.staff.map((m) => (
                                                <div key={m.id_usuario} className="disc-staff-member">
                                                    <span className="staff-role-badge staff-role-badge--sm">{m.juegos[0]?.cargo}</span>
                                                    <span className="staff-member-name">{m.nombre} {m.apellido}</span>
                                                    {m.correo && <a href={`mailto:${m.correo}`} className="staff-member-email"><FaEnvelope /> {m.correo}</a>}
                                                </div>
                                            ))}
                                        </div>
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
