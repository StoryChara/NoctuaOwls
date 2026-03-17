import { useState, useEffect } from 'react';
import {
  FaSun, FaMoon, FaInstagram, FaTwitch,
  FaGamepad, FaUsers, FaTrophy,
  FaWhatsapp, FaDiscord, FaEnvelope,
} from 'react-icons/fa';
import './App.css';

import logoBlack from './assets/Logo Noctua Owls BLACK.png';
import logoGold from './assets/Logo Noctua Owls GOLD.png';

const DISCIPLINES = [
  {
    name: 'Valorant', genre: 'FPS Táctico', tag: 'VAL', color: '#FF4655',
    description: 'Shooter táctico 5v5 de Riot Games. Precisión, estrategia y habilidades únicas por agente.',
    staff: [
      { role: 'Coordinadora', name: 'Laura Daniela Buitrago Reyes', email: 'lbuitragore@unal.edu.co' },
      { role: 'Coach', name: 'Tarek Alexandrovich', email: null },
    ],
  },
  {
    name: 'Valorant Femenino', genre: 'FPS Táctico', tag: 'VAL·F', color: '#FF4655',
    description: 'Equipo femenino de Valorant representando a la UNAL en torneos universitarios.',
    staff: [
      { role: 'Coordinadora', name: 'Juana Valentina Orjuela Londoño', email: 'jorjuelal@unal.edu.co' },
      { role: 'Coach', name: 'Santiago Guillen Fandiño', email: 'sguillen@unal.edu.co' },
    ],
  },
  {
    name: 'League of Legends', genre: 'MOBA', tag: 'LoL', color: '#C89B3C',
    description: 'El MOBA más popular del mundo. Estrategia 5v5 en la Grieta del Invocador.',
    staff: [
      { role: 'Coordinador', name: 'Jose Manuel Lizarazo Velandia', email: 'jolizarazov@unal.edu.co' },
      { role: 'Subcoordinador', name: 'Sergio Blanco Moreno', email: 'sblancom@unal.edu.co' },
      { role: 'Coach', name: 'Ivan Vargas', email: null },
    ],
  },
  {
    name: 'LoL Femenino', genre: 'MOBA', tag: 'LoL·F', color: '#C89B3C',
    description: 'Equipo femenino de League of Legends compitiendo en ligas universitarias nacionales.',
    staff: [
      { role: 'Coordinadora', name: 'María José Morales Villacres', email: 'mmoralesvi@unal.edu.co' },
      { role: 'Coach', name: 'Ivan Vargas', email: null },
    ],
  },
  {
    name: 'Marvel Rivals', genre: 'Hero Shooter', tag: 'MR', color: '#E62429',
    description: 'Hero shooter 6v6 con los personajes del universo Marvel. Cooperación y poder.',
    staff: [
      { role: 'Coordinadora', name: 'María José Jara Herrera', email: 'mjarah@unal.edu.co' },
      { role: 'Subcoordinador', name: 'Mateo Maya', email: 'mmayape@unal.edu.co' },
    ],
  },
  {
    name: 'Counter-Strike 2', genre: 'FPS Táctico', tag: 'CS2', color: '#F0A500',
    description: 'El shooter táctico competitivo por excelencia, renovado. Precisión y trabajo en equipo.',
    staff: [
      { role: 'Coordinador', name: 'David Esteban Romero Villalobos', email: 'dromerovi@unal.edu.co' },
      { role: 'Subcoordinador · Coach', name: 'Julián Andrés Pinzón León', email: 'jupinzonl@unal.edu.co' },
    ],
  },
  {
    name: 'Fighting Games', genre: 'Juegos de Pelea', tag: 'FGC', color: '#9B59B6',
    description: 'Domina el combate 1v1 en los mejores títulos del género: Street Fighter, Tekken y más.',
    staff: [
      { role: 'Coordinador', name: 'Lucas Eduardo Fernandez Duran', email: 'lufernandez@unal.edu.co' },
      { role: 'Subcoordinador', name: 'Manuel Santiago Gonzales Quiazua', email: 'mgonzalesqu@unal.edu.co' },
    ],
  },
  {
    name: 'Rainbow Six Siege', genre: 'FPS Táctico', tag: 'R6S', color: '#00AEEF',
    description: 'FPS táctico con destrucción ambiental y operadores únicos. Defensa y ataque.',
    staff: [
      { role: 'Coordinador', name: 'Sergio Alejandro Buitrago Melo', email: 'sebuitrago@unal.edu.co' },
    ],
  },
  {
    name: 'Brawl Stars', genre: 'Battle Arena', tag: 'BS', color: '#FFCD01',
    description: 'Multijugador móvil de Supercell con modos rápidos y acción competitiva.',
    staff: [
      { role: 'Coordinador', name: 'Santiago Elias Manjarres Vargas', email: 'smanjarresv@unal.edu.co' },
    ],
  },
  {
    name: 'Overwatch 2', genre: 'Hero Shooter', tag: 'OW2', color: '#F99E1A',
    description: 'Hero shooter 5v5 de Blizzard con héroes únicos, roles definidos y estrategia dinámica.',
    staff: [
      { role: 'Coordinador', name: 'Joel Santiago Bernal Cubillos', email: 'jobernalc@unal.edu.co' },
    ],
  },
  {
    name: 'Rocket League', genre: 'Deporte Vehicular', tag: 'RL', color: '#00AEEF',
    description: 'Fútbol con autos propulsados. Habilidad, estrategia y trabajo en equipo a alta velocidad.',
    staff: [],
  }
];

const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/noctuaowls/', Icon: FaInstagram },
  { name: 'Twitch', url: 'https://www.twitch.tv/noctuaowls', Icon: FaTwitch },
  { name: 'WhatsApp', url: 'https://chat.whatsapp.com/LbY6ZSrq1XLAXsM2j6W5fZ', Icon: FaWhatsapp },
  { name: 'Discord', url: 'https://discord.gg/wNWGvJnvcW', Icon: FaDiscord },
  { name: 'Email', url: 'mailto:noctua.owlsesports@gmail.com', Icon: FaEnvelope },
];

const PGP_STAFF = [
  { role: 'Coordinador/a', name: 'Ivan Daniel Silva Oyola', email: 'isilvao@unal.edu.co' },
  { role: 'Subcoordinador/a', name: 'Jesus David Muñoz Gomez', email: 'jmunozgo@unal.edu.co' },
];

const REGISTER_URL = 'http://forms.gle/x9ZRLus76kbb1fnu8';

function App() {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('noctua-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    localStorage.setItem('noctua-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <div className="app">

      {/* ── NAVBAR ── */}
      <nav className="navbar">
        <div className="nav-inner">
          <a href="#" className="nav-brand">
            <img src={isDark ? logoGold : logoBlack} alt="Noctua Owls" className="nav-logo" />
            <span className="nav-name">Noctua Owls</span>
          </a>
          <div className="nav-actions">
            <a href="#disciplinas" className="nav-link">Disciplinas</a>
            <a href="#nosotros" className="nav-link">Nosotros</a>
            <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="btn btn-accent">
              Únete
            </a>
            <button
              className="theme-toggle"
              onClick={() => setIsDark(d => !d)}
              aria-label="Cambiar tema"
            >
              {isDark ? <FaSun /> : <FaMoon />}
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-inner">
          <img
            src={isDark ? logoGold : logoBlack}
            alt="Noctua Owls"
            className="hero-logo"
          />
          <h1 className="hero-title">
            Noctua <span className="hero-accent">Owls</span>
          </h1>
          <p className="hero-subtitle">E-Sports · Universidad Nacional de Colombia · Sede Bogotá</p>
          <p className="hero-desc">
            Entrenamos, competimos y representamos a nuestra universidad en torneos
            universitarios y nacionales de deportes electrónicos.
          </p>
          <div className="hero-cta">
            <a href={REGISTER_URL} target="_blank" rel="noreferrer" className="btn btn-accent btn-lg">
              Únete al equipo
            </a>
            <a href="#disciplinas" className="btn btn-outline btn-lg">
              Ver disciplinas
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS / SOBRE NOSOTROS ── */}
      <section className="about" id="nosotros">
        <div className="container">
          <div className="stats-row">
            <div className="stat-card">
              <FaTrophy className="stat-icon" />
              <strong className="stat-num">10</strong>
              <span className="stat-label">Disciplinas</span>
            </div>
            <div className="stat-card">
              <FaUsers className="stat-icon" />
              <strong className="stat-num">UNAL</strong>
              <span className="stat-label">Bogotá</span>
            </div>
            <div className="stat-card">
              <FaGamepad className="stat-icon" />
              <strong className="stat-num">2025</strong>
              <span className="stat-label">Fundación</span>
            </div>
          </div>

          <div className="about-content">
            <h2 className="section-title">Sobre Nosotros</h2>
            <p className="about-text">
              Noctua Owls es el grupo estudiantil de E-Sports de la{' '}
              <strong>Universidad Nacional de Colombia, Sede Bogotá</strong>. Nuestro proyecto
              está dirigido al entrenamiento y desarrollo de deportistas electrónicos seleccionados
              para representar a la universidad en competiciones de videojuegos.
            </p>
            <p className="about-text">
              Contamos con equipos de alto rendimiento y divisiones de formación en{' '}
              <strong>10 disciplinas deportivas</strong>, reconocidas oficialmente en Colombia
              (Ley 026 de 2024) por su alta exigencia estratégica, técnica y mental.
            </p>
            <div className="about-pgp">
              <h3 className="about-pgp-title">Coordinación General</h3>
              <div className="about-pgp-grid">
                {PGP_STAFF.map((m) => (
                  <div key={m.name} className="staff-pgp-card">
                    <span className="staff-role-badge">{m.role}</span>
                    <p className="staff-member-name">{m.name}</p>
                    {m.email && (
                      <a href={`mailto:${m.email}`} className="staff-member-email">
                        <FaEnvelope /> {m.email}
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISCIPLINAS ── */}
      <section className="disciplines" id="disciplinas">
        <div className="container">
          <h2 className="section-title text-center">Nuestras Disciplinas</h2>
          <p className="section-sub text-center">
            Encuentra tu juego y forma parte de nuestros equipos de competencia
          </p>
          <div className="disciplines-grid">
            {DISCIPLINES.map((disc) => (
              <div key={disc.name} className="disc-card">
                <div
                  className="disc-tag"
                  style={{
                    color: disc.color,
                    background: disc.color + '1A',
                    borderColor: disc.color + '55',
                  }}
                >
                  {disc.tag}
                </div>
                <h3 className="disc-name">{disc.name}</h3>
                <span className="disc-genre">{disc.genre}</span>
                <p className="disc-desc">{disc.description}</p>
                <div className="disc-staff">
                  {disc.staff.map((m) => (
                    <div key={m.name} className="disc-staff-member">
                      <span className="staff-role-badge staff-role-badge--sm">{m.role}</span>
                      <span className="staff-member-name">{m.name}</span>
                      {m.email && (
                        <a href={`mailto:${m.email}`} className="staff-member-email">
                          <FaEnvelope /> {m.email}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN CTA ── */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <h2 className="cta-title">¿Listo para competir?</h2>
            <p className="cta-desc">
              Regístrate y da el primer paso para representar a la Universidad Nacional
              de Colombia en torneos universitarios y nacionales de E-Sports.
            </p>
            <a
              href={REGISTER_URL}
              target="_blank"
              rel="noreferrer"
              className="btn btn-accent btn-lg"
            >
              Formulario de Registro
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src={isDark ? logoGold : logoBlack} alt="Noctua Owls" className="footer-logo" />
            <span className="footer-name">Noctua Owls</span>
          </div>
          <div className="footer-social">
            {SOCIAL_LINKS.map(({ name, url, Icon }) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" className="social-link" aria-label={name}>
                <Icon className="social-icon" />
                <span>{name}</span>
              </a>
            ))}
          </div>
          <p className="footer-copy">© 2026 Noctua Owls · E-Sports UNAL Bogotá</p>
        </div>
      </footer>

    </div>
  );
}

export default App;