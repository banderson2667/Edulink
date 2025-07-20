import React, { useState } from 'react';
import '../styles/mentor_avaliacao.css';
import NavBar from '../components/NavBar.jsx'

export default function MentorEvaluation() {
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [formData, setFormData] = useState({
    title: '',
    comments: '',
    recommend: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      alert('Por favor, avalie com as estrelas antes de enviar.');
      return;
    }

    console.log('Dados da avaliação:', { ...formData, rating });
    alert('Obrigado por sua avaliação! Sua opinião é muito importante para nós.');

    setRating(0);
    setHovered(0);
    setFormData({
      title: '',
      comments: '',
      recommend: '',
    });
  };

  const handleCancel = () => {
    if (window.confirm('Tem certeza que deseja cancelar? Sua avaliação não será salva.')) {
      setRating(0);
      setHovered(0);
      setFormData({
        title: '',
        comments: '',
        recommend: '',
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="evaluation-container">
      <div className="header">
        <a href="#" className="back-button">←</a>
        <h1>Avaliação de Mentoria</h1>
      </div>

      <h2 className="evaluation-title">Avalie sua experiência</h2>

      <div className="mentor-info">
        <img
          src="https://nosmulheresdaperiferia.com.br/wp-content/uploads/2022/09/mulheres-negras-na-politica-3.jpg"
          alt="Mentora"
          className="mentor-pic"
        />
        <div className="mentor-details">
          <h3>Dra. Laise Cavalcante</h3>
          <p>Mentor de Desenvolvimento Pessoal</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="rating-section">
          <p className="rating-title">Como você avalia esta mentoria?</p>
          <div className="rating-stars">
            {[1, 2, 3, 4, 5].map((value) => (
              <span
                key={value}
                className={`star ${value <= (hovered || rating) ? 'active' : ''}`}
                onClick={() => setRating(value)}
                onMouseOver={() => setHovered(value)}
                onMouseOut={() => setHovered(0)}
              >
                ★
              </span>
            ))}
          </div>
          <div className="rating-labels">
            <span>Péssima</span>
            <span>Regular</span>
            <span>Boa</span>
            <span>Muito Boa</span>
            <span>Excelente</span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="evaluationTitle">Título da avaliação</label>
          <input
            type="text"
            id="evaluationTitle"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Resuma sua experiência"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="evaluationComments">Comentários</label>
          <textarea
            id="evaluationComments"
            name="comments"
            value={formData.comments}
            onChange={handleInputChange}
            placeholder="Descreva sua experiência com a mentoria..."
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="evaluationRecommend">Você recomendaria esta mentoria?</label>
          <select
            id="evaluationRecommend"
            name="recommend"
            value={formData.recommend}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>Selecione uma opção</option>
            <option value="definitely">Sim, com certeza</option>
            <option value="probably">Sim, provavelmente</option>
            <option value="not-sure">Não tenho certeza</option>
            <option value="no">Não recomendaria</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">Enviar Avaliação</button>
          <button type="button" className="btn btn-outline" onClick={handleCancel}>Cancelar</button>
        </div>
      </form>
      <NavBar/>
    </div>
  );
}