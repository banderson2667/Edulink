import React from 'react';
import '../styles/home.css';
import NavBar from '../components/NavBar.jsx'

export default function Home() {
  return (
    <div className="home-container">
      <div className="home-box">
        <h1 className="home-title">Bem-vindo ao EduLink</h1>
        <p className="home-subtitle">
          Uma plataforma para conectar estudantes e mentores voluntários.
        </p>

        <div className="home-buttons">
          <a href="/pesquisa" className="home-btn">🔍 Buscar Mentores</a>
          <a href="/calendario" className="home-btn">📅 Agendamentos</a>
          <a href="/edicao_perfil" className="home-btn">👤 Meu Perfil</a>
          <a href="/chat" className="home-btn">💬 Chat</a>
        </div>
      </div>
      <NavBar/>
    </div>
  );
}
