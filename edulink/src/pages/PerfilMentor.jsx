import React, { useState, useEffect } from 'react';
import '../styles/perfil_mentor.css';
import NavBar from '../components/NavBar.jsx'


export default function MentorProfile() {
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      alert('Por favor, escreva uma mensagem antes de enviar.');
      return;
    }

    alert(`Mensagem enviada para Dra. Laise Cavalcante:\n\n"${trimmed}"`);
    setMessage('');
    setShowModal(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (e.target.className === 'modal') {
        setShowModal(false);
      }
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <header>
        <a href="/home" className="back-button">←</a>
        <h1>PROFESSOR MENTOR</h1>
      </header>

      <div className="profile-container">
        <div className="profile-header">
          <img
            src="https://nosmulheresdaperiferia.com.br/wp-content/uploads/2022/09/mulheres-negras-na-politica-3.jpg"
            alt="Dra. Laise Cavalcante"
            className="profile-pic"
          />
          <h2 className="profile-name">Dra. Laise Cavalcante</h2>
          <p className="profile-title">Professora de Física - UFBA</p>
          <div className="rating">
            {'★'.repeat(5)} <span>(4.9)</span>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h3 className="section-title">Sobre</h3>
            <p className="section-content">
              Professora com 20 anos de experiência no ensino de Física para ensino médio / superior
              e preparação para vestibulares. Especialista em tornar conceitos complexos em
              explicações simples e acessíveis.
            </p>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Formação</h3>
            <p className="section-content">
              - Doutorado em Física pela UFBA<br />
              - Mestrado em Ensino de Ciências<br />
              - Licenciatura em Física
            </p>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Áreas de Atuação</h3>
            <div className="tags">
              <span className="tag">Física</span>
              <span className="tag">Sistemas Web</span>
              <span className="tag">Eletromagnetismo</span>
              <span className="tag">Vestibular</span>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Disponibilidade</h3>
            <p className="section-content">
              Segunda a Sexta: 14h às 18h<br />
              Sábado: 9h às 12h
            </p>
          </div>
        </div>

        <div className="action-buttons">
          <a href="#" className="btn btn-primary">Agendar Mentoria</a>
          <button className="btn btn-outline" onClick={handleOpenModal}>Enviar Mensagem</button>
        </div>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Enviar Mensagem</h3>
              <button className="close-modal" onClick={handleCloseModal}>&times;</button>
            </div>
            <form className="message-form" onSubmit={handleSubmit}>
              <textarea
                className="message-input"
                placeholder="Escreva sua mensagem para Dra. Laise Cavalcante..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button type="submit" className="send-btn">Enviar Mensagem</button>
            </form>
          </div>
        </div>
      )}
      <NavBar/>
    </>
  );
}