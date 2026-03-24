import { useState } from 'react';
import { FaSun, FaMoon, FaBars, FaTimes } from 'react-icons/fa';
import logoBlack from '../assets/Logo Noctua Owls BLACK.png';
import logoGold from '../assets/Logo Noctua Owls GOLD.png';
import './Navbar.css';

import { registerUrl } from '../utils/SocialNetwork';

export function Navbar({ isDark, toggleTheme }) {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
        <nav className="navbar">
            <div className="nav-inner">
                <a href="/" className="nav-brand">
                    <img
                        src={isDark ? logoGold : logoBlack}
                        alt="Noctua Owls"
                        className="nav-logo"
                    />
                    <span className="nav-name">Noctua Owls</span>
                </a>
                <div className="nav-right">
                    <div className={`nav-actions ${isOpen ? 'is-open' : ''}`}>
                        <a href="/about" className="nav-link" onClick={() => setIsOpen(false)}>Nosotros</a>
                        <a href={registerUrl} target="_blank" rel="noreferrer" className="btn btn-accent nav-register" onClick={() => setIsOpen(false)}>
                            Únete
                        </a>
                    </div>
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label="Cambiar tema"
                    >
                        {isDark ? <FaSun /> : <FaMoon />}
                    </button>
                    <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Abrir menú">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>
        </nav>
    );
}
