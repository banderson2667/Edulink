import React, { useState, useRef, useEffect } from 'react';
import '../styles/profile.css';
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

export default function Profile() {
  const [editing, setEditing] = useState(false);
  const [alert, setAlert] = useState({ message: '', type: '' });
  const [profile, setProfile] = useState({
    name: '',
    bio: '',
    interests: [],
    picture: null,
  });

  const [formData, setFormData] = useState(profile);
  const fileInputRef = useRef(null);

  useEffect(() => {
    // Obter dados do perfil do backend
    const fetchProfile = async () => {
      const response = await fetch('http://localhost:5000/api/profile');
      const data = await response.json();
      setProfile(data);
      setFormData(data);
    };

    fetchProfile();
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name.trim().length < 2) {
      setAlert({ message: 'Por favor, insira um nome válido.', type: 'error' });
      return;
    }

    const response = await fetch('http://localhost:5000/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const updatedProfile = await response.json();
      setProfile(updatedProfile.profile);
      setEditing(false);
      setAlert({ message: 'Perfil atualizado com sucesso!', type: 'success' });
    } else {
      const error = await response.json();
      setAlert({ message: error.message, type: 'error' });
    }
  };

  return (
    <div className="profile-container">
      <br/><br/>
      {alert.message && (
        <div className={`alert alert-${alert.type}`}>{alert.message}</div>
      )}

      <div className="profile-header">
        <br/>
        <h1 className="profile-title">Meu Perfil</h1>
        <button className="edit-toggle-btn" onClick={toggleEdit}>
          <i className={`fas fa-${editing ? 'eye' : 'edit'}`}></i>{' '}
          {editing ? 'Visualizar Perfil' : 'Editar Perfil'}
        </button>
      </div>

      {!editing ? (
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
      )}
      <NavBar/>
    </div>
  );
}