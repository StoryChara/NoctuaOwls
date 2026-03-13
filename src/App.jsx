import { useState, useEffect } from 'react';
import {
  FaSun, FaMoon, FaInstagram, FaTwitch,
  FaGamepad, FaUsers, FaTrophy,
} from 'react-icons/fa';
import './App.css';

import logoBlack from './assets/Logo Noctua Owls BLACK.png';
import logoGold from './assets/Logo Noctua Owls GOLD.png';

const DISCIPLINES = [
  {
    name: 'Valorant',
    genre: 'FPS Táctico',
    description: 'Shooter táctico 5v5 de Riot Games. Precisión, estrategia y habilidades únicas por agente.',
    tag: 'VAL',
    color: '#FF4655',
  },
  {
    name: 'Valorant Femenino',
    genre: 'FPS Táctico',
    description: 'Equipo femenino de Valorant representando a la UNAL en torneos universitarios.',
    tag: 'VAL·F',
    color: '#FF4655',
  },
  {
    name: 'League of Legends',
    genre: 'MOBA',
    description: 'El MOBA más popular del mundo. Estrategia 5v5 en la Grieta del Invocador.',
    tag: 'LoL',
    color: '#C89B3C',
  },
  {
    name: 'LoL Femenino',
    genre: 'MOBA',
    description: 'Equipo femenino de League of Legends compitiendo en ligas universitarias nacionales.',
    tag: 'LoL·F',
    color: '#C89B3C',
  },
  {
    name: 'Marvel Rivals',
    genre: 'Hero Shooter',
    description: 'Hero shooter 6v6 con los personajes del universo Marvel. Cooperación y poder.',
    tag: 'MR',
    color: '#E62429',
  },
  {
    name: 'Counter-Strike 2',
    genre: 'FPS Táctico',
    description: 'El shooter táctico competitivo por excelencia, renovado. Precisión y trabajo en equipo.',
    tag: 'CS2',
    color: '#F0A500',
  },
  {
    name: 'Fighting Games',
    genre: 'Juegos de Pelea',
    description: 'Domina el combate 1v1 en los mejores títulos del género: Street Fighter, Tekken y más.',
    tag: 'FGC',
    color: '#9B59B6',
  },
  {
    name: 'Rainbow Six Siege',
    genre: 'FPS Táctico',
    description: 'FPS táctico con destrucción ambiental y operadores únicos. Defensa y ataque.',
    tag: 'R6S',
    color: '#00AEEF',
  },
  {
    name: 'Brawl Stars',
    genre: 'Battle Arena',
    description: 'Multijugador móvil de Supercell con modos rápidos y acción competitiva.',
    tag: 'BS',
    color: '#FFCD01',
  },
  {
    name: 'Overwatch 2',
    genre: 'Hero Shooter',
    description: 'Hero shooter 5v5 de Blizzard con héroes únicos, roles definidos y estrategia dinámica.',
    tag: 'OW2',
    color: '#F99E1A',
  },
  {
    name: 'Rocket League',
    genre: 'Deporte Vehicular',
    description: 'Fútbol con coches. Competencia rápida, habilidades aéreas y trabajo en equipo.',
    tag: 'RL',
    color: '#00BFFF',
  }
];

const SOCIAL_LINKS = [
  { name: 'Instagram', url: 'https://www.instagram.com/noctuaowls/', Icon: FaInstagram },
  { name: 'Twitch', url: 'https://www.twitch.tv/noctuaowls', Icon: FaTwitch },
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