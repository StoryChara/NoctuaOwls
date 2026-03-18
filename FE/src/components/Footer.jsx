import logoBlack from '../assets/Logo Noctua Owls BLACK.png';
import logoGold from '../assets/Logo Noctua Owls GOLD.png';
import './Footer.css';

import { SOCIAL_LINKS } from '../utils/SocialNetwork';

export function Footer({ isDark }) {
    return (
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
    );
}
