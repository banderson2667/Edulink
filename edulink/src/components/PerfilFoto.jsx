// import React from 'react';
// import perfil from '../assets/perfil-placeholder.png';

// function PerfilFoto() {
//   return (
//     <div className="perfil-foto">
//       <img src={perfil} alt="Foto de Perfil" />
//       <p>Foto de Perfil</p>
//     </div>
//   );
// }

// export default PerfilFoto;
import React, { useState, useRef } from 'react';
import '../styles/fotoperfil.css';

const ProfilePictureUpload = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="profile-picture-container">
      <div className="profile-picture-wrapper" onClick={handleButtonClick}>
        {preview ? (
          <>
            <img src={preview} alt="Profile preview" className="profile-picture" />
            <div className="edit-overlay">
              <span className="edit-icon">✏️</span>
            </div>
          </>
        ) : (
          <div className="profile-picture-placeholder">
            <span className="icon">👤</span>
            <span className="text">Adicionar foto</span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        style={{ display: 'none' }}
      />
    </div>
  );
};

export default ProfilePictureUpload;