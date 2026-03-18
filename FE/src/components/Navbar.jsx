import { FaSun, FaMoon } from 'react-icons/fa';
import logoBlack from '../assets/Logo Noctua Owls BLACK.png';
import logoGold from '../assets/Logo Noctua Owls GOLD.png';
import './Navbar.css';

import { registerUrl } from '../utils/SocialNetwork';

export function Navbar({ isDark, toggleTheme }) {
    
    return (
        <nav className="navbar">
            <div className="nav-inner">
                <a href="#" className="nav-brand">
                    <img
                        src={isDark ? logoGold : logoBlack}
                        alt="Noctua Owls"
                        className="nav-logo"
                    />
                    <span className="nav-name">Noctua Owls</span>
                </a>
                <div className="nav-actions">
                    <a href="#disciplinas" className="nav-link">Disciplinas</a>
                    <a href="#nosotros" className="nav-link">Nosotros</a>
                    <a href={registerUrl} target="_blank" rel="noreferrer" className="btn btn-accent">
                        Únete
                    </a>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                    >
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
