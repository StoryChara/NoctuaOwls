import { useEffect, useState } from 'react';
import { FaBullseye, FaChartLine, FaCheckCircle, FaLightbulb, FaMapMarkerAlt, FaUsers, FaDumbbell, FaGamepad, FaList, FaEnvelope } from 'react-icons/fa';
import './About.css';

import { api } from '../utils/api';

export function About() {
    const [juegos, setJuegos] = useState([]);
    const [pgp, setPgp] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const [juegosRes, pgpRes] = await Promise.all([
                    api.getJuegos({ estado: true }),
                    api.getUsersBy({ juegos: ['NOCTUA'] }),
                ]);

                setPgp(pgpRes.data ?? []);
                setJuegos(juegosRes.data ?? []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="about-page">
            {/* ── HERO SECTION ── */}
            <section className="about-hero">
                <div className="hero-pattern" aria-hidden="true" />
                <div className="container">
                    <h1 className="about-title">Quiénes <span className="hero-accent">Somos</span></h1>
                    <p className="about-subtitle">Proyecto de E-Sports · Universidad Nacional de Colombia</p>
                </div>
            </section>

            {/* ── MISIÓN & JUSTIFICACIÓN ── */}
            <section className="about-section description-section">
                <div className="container">
                    <div className="row g-5 align-items-center">
                        <div className="col-lg-6">
                            <h2 className="section-title">Descripción</h2>
                            <div className="about-text-block">
                                <p>
                                    Este proyecto está dirigido al entrenamiento y desarrollo de deportistas electrónicos seleccionados para representar a la <strong>Universidad Nacional de Colombia - Sede Bogotá</strong> en competiciones de videojuegos. Además, contamos con equipos de formación y academia para mantener un buen nivel general.
                                </p>
                                <p>
                                    Los E-Sports son reconocidos a nivel nacional e internacional por su alta exigencia estratégica, técnica y mental. Con el crecimiento de su ecosistema, buscamos consolidar equipos de alto rendimiento que compitan al más alto nivel y enaltezcan el nombre de la institución. Actualmente contamos con <strong>{loading ? '—' : juegos.length} disciplinas deportivas</strong> en constante crecimiento.
                                </p>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="justification-card fade-in-up">
                                <h3><FaLightbulb className="icon-mb" /> Justificación</h3>
                                <p>
                                    Ante el auge de los deportes electrónicos y su reconocimiento oficial en Colombia (Ley 026 de 2024), buscamos ser pioneros en la formación de un club deportivo universitario.
                                </p>
                                <p>
                                    Queremos representar a la universidad en torneos como la <strong>Liga Universitaria de INDERCOL</strong>, fomentando la participación activa de nuestros deportistas en el Sistema Nacional de Deporte.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OBJETIVO GENERAL ── */}
            <section className="about-section objective-section">
                <div className="container">
                    <div className="general-objective-card fade-in-up">
                        <div className="objective-icon-wrapper">
                            <FaBullseye />
                        </div>
                        <div className="objective-content">
                            <h3>Objetivo General</h3>
                            <p>
                                "Consolidar un ecosistema de formación y alto rendimiento en deportes electrónicos dentro de la Universidad Nacional de Colombia Sede Bogotá, fomentando torneos abiertos a la comunidad universitaria y generando entornos de integración y socialización entre estudiantes de diferentes facultades y sedes, participando en torneos nacionales e internacionales dejando en alto el nombre de la Universidad."
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── OBJETIVOS ESPECÍFICOS ── */}
            <section className="about-section specifics-section">
                <div className="container">
                    <h2 className="section-title text-center mb-5">Objetivos Específicos</h2>
                    <div className="row g-4">
                        {[
                            { icon: FaDumbbell, text: "Mejorar las habilidades técnicas mediante sesiones de entrenamiento estructuradas." },
                            { icon: FaUsers, text: "Optimizar el rendimiento mediante actividad física y fortalecimiento mental." },
                            { icon: FaGamepad, text: "Garantizar la participación del equipo en torneos universitarios y oficiales." },
                            { icon: FaChartLine, text: "Implementar análisis táctico y sesiones de revisión de partidas." },
                            { icon: FaBullseye, text: "Realizar entrenamientos guiados para mejorar el tiempo de reacción." },
                            { icon: FaCheckCircle, text: "Analizar detenidamente partidos jugados para corrección de errores." },
                            { icon: FaUsers, text: "Mantener un alto nivel competitivo sin descuidar lo académico y físico." }
                        ].map((item, index) => (
                            <div key={index} className="col-md-6 col-lg-4">
                                <div className="specific-card h-100" style={{ animationDelay: `${index * 0.1}s` }}>
                                    <item.icon className="specific-icon" />
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── ESTRATEGIA (METAS, ACTIVIDADES, INDICADORES) ── */}
            <section className="about-section strategy-section">
                <div className="container">
                    <div className="row g-4">
                        <div className="col-lg-4">
                            <div className="strategy-col">
                                <h3 className="strategy-title">Metas</h3>
                                <ul className="strategy-list">
                                    <li>Participar y ganar las ligas universitarias anuales.</li>
                                    <li>Ganar ligas internas para mantener el nivel competitivo.</li>
                                    <li>Demostrar el nivel de la universidad en competencias nacionales.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="strategy-col highlight">
                                <h3 className="strategy-title">Actividades</h3>
                                <ul className="strategy-list">
                                    <li>Sesiones de entrenamiento con entrenadores.</li>
                                    <li>Selección de deportistas y división de equipos.</li>
                                    <li>Integración con coaches psicológicos.</li>
                                    <li>Participación en torneos (Liga Universitaria, BetPlay, SOFA).</li>
                                    <li>Torneos abiertos a la comunidad UNAL.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="strategy-col">
                                <h3 className="strategy-title">Indicadores</h3>
                                <ul className="strategy-list">
                                    <li>Revisión de resultados en torneos.</li>
                                    <li>Realización de torneos abiertos.</li>
                                    <li>Evaluaciones de rendimiento bimensuales.</li>
                                    <li>Avance en ligas internas.</li>
                                    <li>Mejora en tiempo de reacción y nivel competitivo.</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="about-section staff">
                <div className="container">
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
            </section>

            {/* ── INFO ADICIONAL ── */}
            <section className="about-section details-section">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-md-6">
                            <div className="detail-item">
                                <h4><FaUsers className="detail-icon" /> Población Beneficiada</h4>
                                <p>Cualquier persona perteneciente a la comunidad universitaria activa de la Universidad Nacional de Colombia - Sede Bogotá.</p>
                            </div>
                            <div className="detail-item">
                                <h4><FaMapMarkerAlt className="detail-icon" /> Lugares y Escenarios</h4>
                                <p>Actividades virtuales y entrenamientos presenciales de tiempo de reacción en la universidad. Integraciones presenciales y participación en torneos en Bogotá.</p>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="detail-item">
                                <h4><FaLightbulb className="detail-icon" /> Innovación</h4>
                                <p>Implementación y acercamiento a los E-sports por primera vez en la Universidad como deporte oficial catalogado en Colombia.</p>
                            </div>
                            <div className="detail-item">
                                <h4><FaList className="detail-icon" /> Líneas de Acción y Trabajo</h4>
                                <ul className="simple-list">
                                    <li>Cultura y Deporte</li>
                                    <li>Actividades Lúdicas y Deportivas</li>
                                    <li>Promoción de la salud</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
