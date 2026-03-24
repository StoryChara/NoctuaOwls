import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

import { Home } from './views/Home';
import { About } from './views/Abouts';

import { Game } from './views/Games/Game';

import { NotFound } from './views/Errors/NotFound';

const REGISTER_URL = 'http://forms.gle/x9ZRLus76kbb1fnu8';

function App() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved ? saved === 'dark' : true;
    });

    useEffect(() => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [isDark]);

    return (
        <div className="app">
            <Navbar isDark={isDark} toggleTheme={() => setIsDark(d => !d)} />
            <Routes>
                <Route path="/" element={<Home isDark={isDark} />} />
                <Route path="/about" element={<About isDark={isDark} />} />
                <Route path="/game/:clave_juego" element={<Game />} />

                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
            </Routes>
            <Footer isDark={isDark} />
        </div>
    );
}

export default App;