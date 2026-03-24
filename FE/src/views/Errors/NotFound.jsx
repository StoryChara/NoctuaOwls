import { useNavigate } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';
import './NotFound.css';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <div className="not-found-container">
                <div className="not-found-code">404</div>
                <h1 className="not-found-title">PÁGINA NO ENCONTRADA</h1>
                <p className="not-found-desc">
                    Lo sentimos, la página que buscas no existe o ha sido movida.
                </p>
                <button onClick={() => navigate(-1)} className="not-found-back-link">
                    <FaChevronLeft /> Volver
                </button>
            </div>
        </div>
    );
}