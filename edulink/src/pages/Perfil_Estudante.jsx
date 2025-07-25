import React, { useState, useRef, useEffect } from 'react';
import '../styles/estudante.css';
import NavBar from '../components/NavBar.jsx';

const interestsList = {
  frontend: 'Front-end',
  uiux: 'UI/UX',
  react: 'React',
  backend: 'Back-end',
  mobile: 'Mobile',
  testing: 'Testes',
  devops: 'DevOps',
};

export default function PerfilEstudante() {
  const [activeTab, setActiveTab] = useState('profile');
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [profile, setProfile] = useState({
    name: 'Clinton Coelho',
    bio: 'Desenvolvedor front-end com 7 anos de experiência, especializado em React e UI/UX.',
    interests: ['frontend', 'uiux', 'react', 'DevOps'],
    picture: null,
    articles: [
      { title: 'Introdução ao React Hooks', url: 'https://exemplo.com/react-hooks' },
      { title: 'Design Systems na prática', url: 'https://exemplo.com/design-systems' }
    ],
    courses: [
      { name: 'Desenvolvimento Web Moderno', institution: 'Digital House', hours: 120, year: 2022 },
      { name: 'UI/UX Design Avançado', institution: 'Coursera', hours: 80, year: 2021 }
    ]
  });

  const [formData, setFormData] = useState(profile);
  const [newArticle, setNewArticle] = useState({ title: '', url: '' });
  const [newCourse, setNewCourse] = useState({ name: '', institution: '', hours: '', year: '' });
  const fileInputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setAlert({ message: '', type: '' }), 5000);
    return () => clearTimeout(timer);
  }, [alert]);

  const toggleEdit = () => {
    if (editing) {
      setFormData(profile);
    }
    setEditing(!editing);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleInterestToggle = (value) => {
    setFormData((prev) => {
      const selected = prev.interests.includes(value)
        ? prev.interests.filter((i) => i !== value)
        : [...prev.interests, value].slice(0, 5);
      return { ...prev, interests: selected };
    });
  };

  const handlePictureUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      setAlert({ message: 'Por favor, selecione um arquivo de imagem.', type: 'error' });
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setAlert({ message: 'A imagem deve ter no máximo 2MB.', type: 'error' });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      setFormData((prev) => ({ ...prev, picture: e.target.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name.trim().length < 2) {
      setAlert({ message: 'Por favor, insira um nome válido.', type: 'error' });
      return;
    }

    const names = formData.name.trim().split(' ');
    const initials = (names[0][0] + (names[1]?.[0] || '')).toUpperCase();
    setProfile({ ...formData, initials });
    setEditing(false);
    setAlert({ message: 'Perfil atualizado com sucesso!', type: 'success' });
  };

  const handleArticleSubmit = (e) => {
    e.preventDefault();
    if (!newArticle.title || !newArticle.url) {
      setAlert({ message: 'Preencha todos os campos do artigo.', type: 'error' });
      return;
    }
    setProfile(prev => ({
      ...prev,
      articles: [...prev.articles, newArticle]
    }));
    setFormData(prev => ({
      ...prev,
      articles: [...prev.articles, newArticle]
    }));
    setNewArticle({ title: '', url: '' });
    setAlert({ message: 'Artigo adicionado com sucesso!', type: 'success' });
  };

  const handleCourseSubmit = (e) => {
    e.preventDefault();
    if (!newCourse.name || !newCourse.institution || !newCourse.hours || !newCourse.year) {
      setAlert({ message: 'Preencha todos os campos do curso.', type: 'error' });
      return;
    }
    setProfile(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
    setFormData(prev => ({
      ...prev,
      courses: [...prev.courses, newCourse]
    }));
    setNewCourse({ name: '', institution: '', hours: '', year: '' });
    setAlert({ message: 'Curso adicionado com sucesso!', type: 'success' });
  };

  const removeArticle = (index) => {
    setProfile(prev => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index)
    }));
    setFormData(prev => ({
      ...prev,
      articles: prev.articles.filter((_, i) => i !== index)
    }));
  };

  const removeCourse = (index) => {
    setProfile(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
    setFormData(prev => ({
      ...prev,
      courses: prev.courses.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="profile-container">
      <br/><br/>
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}

      <div className="profile-header">
        <br/>
        <p className="profile-title">Meu Perfil</p>
        <button className="edit-toggle-btn" onClick={toggleEdit}>
          <i className={`fas fa-${editing ? 'eye' : 'edit'}`}></i>{' '}
          {editing ? 'Visualizar Perfil' : 'Editar Perfil'}
        </button>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Perfil
        </button>
        <button 
          className={`tab-btn ${activeTab === 'articles' ? 'active' : ''}`}
          onClick={() => setActiveTab('articles')}
        >
          Artigos
        </button>
        <button 
          className={`tab-btn ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Cursos
        </button>
      </div>

      {activeTab === 'profile' && (
        !editing ? (
          <div className="profile-content">
            <div className="profile-picture-container">
              <div
                className="profile-picture"
                style={{
                  backgroundImage: profile.picture
                    ? `url(${profile.picture})`
                    : 'none',
                }}
              >
                {!profile.picture && profile.initials}
              </div>
            </div>
            <div className="profile-details">
              <h2 className="profile-name">{profile.name}</h2>
              <p className="profile-bio">{profile.bio}</p>
              <h3 className="section-title">Áreas de Interesse</h3>
              <div className="interests-container">
                {profile.interests.map((i) => (
                  <span key={i} className="interest-tag">
                    {interestsList[i]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="picture-upload">
              <div className="profile-picture-container">
                <div
                  className="profile-picture"
                  style={{
                    backgroundImage: formData.picture
                      ? `url(${formData.picture})`
                      : 'none',
                  }}
                >
                  {!formData.picture && profile.initials}
                </div>
                <div
                  className="picture-upload-btn"
                  onClick={() => fileInputRef.current.click()}
                >
                  <i className="fas fa-camera"></i>
                </div>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handlePictureUpload}
                style={{ display: 'none' }}
              />
            </div>

            <div className="form-group">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                className="form-control"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="bio">Biografia</label>
              <textarea
                id="bio"
                className="form-control"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label>Áreas de Interesse</label>
              <div className="interests-select">
                {Object.entries(interestsList).map(([key, label]) => (
                  <div
                    key={key}
                    className={`interest-option ${
                      formData.interests.includes(key) ? 'selected' : ''
                    }`}
                    onClick={() => handleInterestToggle(key)}
                  >
                    {label}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleEdit}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Salvar Alterações
              </button>
            </div>
          </form>
        )
      )}

      {activeTab === 'articles' && (
        <div className="articles-section">
          <h2 className="section-title">Meus Artigos</h2>

          <div className="articles-list">
            {profile.articles.map((article, index) => (
              <div key={index} className="article-item">
                <div className="article-info">
                  <h3>{article.title}</h3>
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    {article.url}
                  </a>
                </div>
                {editing && (
                  <button 
                    className="remove-btn"
                    onClick={() => removeArticle(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <form className="add-article-form" onSubmit={handleArticleSubmit}>
              <h3 className="section-subtitle">Adicionar Artigo</h3>
              <div className="form-group">
                <label>Título</label>
                <input
                  type="text"
                  className="form-control"
                  value={newArticle.title}
                  onChange={(e) => setNewArticle({...newArticle, title: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>URL</label>
                <input
                  type="url"
                  className="form-control"
                  value={newArticle.url}
                  onChange={(e) => setNewArticle({...newArticle, url: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Adicionar Artigo
              </button>
            </form>
          )}
        </div>
      )}

      {activeTab === 'courses' && (
        <div className="courses-section">
          <h2 className="section-title">Meus Cursos</h2>

          <div className="courses-list">
            {profile.courses.map((course, index) => (
              <div key={index} className="course-item">
                <div className="course-info">
                  <h3>{course.name}</h3>
                  <p><strong>Instituição:</strong> {course.institution}</p>
                  <p><strong>Carga horária:</strong> {course.hours} horas</p>
                  <p><strong>Ano de conclusão:</strong> {course.year}</p>
                </div>
                {editing && (
                  <button 
                    className="remove-btn"
                    onClick={() => removeCourse(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            ))}
          </div>

          {editing && (
            <form className="add-course-form" onSubmit={handleCourseSubmit}>
              <h3 className="section-subtitle">Adicionar Curso</h3>
              <div className="form-group">
                <label>Nome do Curso</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCourse.name}
                  onChange={(e) => setNewCourse({...newCourse, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Instituição</label>
                <input
                  type="text"
                  className="form-control"
                  value={newCourse.institution}
                  onChange={(e) => setNewCourse({...newCourse, institution: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Carga Horária (horas)</label>
                <input
                  type="number"
                  className="form-control"
                  value={newCourse.hours}
                  onChange={(e) => setNewCourse({...newCourse, hours: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Ano de Conclusão</label>
                <input
                  type="number"
                  className="form-control"
                  value={newCourse.year}
                  onChange={(e) => setNewCourse({...newCourse, year: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Adicionar Curso
              </button>
            </form>
          )}
        </div>
      )}

      <NavBar/>
    </div>
  );
}