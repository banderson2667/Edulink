import React from 'react';
import '../styles/edulink.css';
import logo from '../assets/logo.png';
import NavBar from '../components/NavBar.jsx'

export default function EduLink() {
  return (
    <div className="apresentacao-container">
      <header className="apresentacao-header">
        <br/><br/><br/>
        <h1>Conectando Estudantes e Mentores</h1>
        <p>Orientação acadêmica e profissional gratuita para quem precisa!</p>
        <br/><br/>
        <a href="/login" className="btn-principal">Começar Agora</a>
      </header>

      <section className="apresentacao-about">
        <img src="https://alexsilvaconsultoria.com/wp-content/webp-express/webp-images/uploads/2024/01/Mentoria-para-que-serve.jpg.webp" alt="Mentoria EduLink" />
        <div className="about-text">
          <h2>O que é o EduLink?</h2>
          <p>
            O EduLink é uma plataforma social que conecta estudantes e mentores voluntários
            para orientação acadêmica e profissional. Nossa missão é facilitar o acesso à informação,
            incentivo e suporte, ajudando jovens a traçarem seus caminhos com mais segurança.
          </p>
          <br/><br/>
          <a href="/cadastro" className="btn-secundario">Quero ser Mentor</a>
        </div>
      </section>
      <NavBar/>
    </div>
  );
}
