import React , { useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';

// function Navbar() {
//   return (
//     <div className="bottom-nav">
//       <Link to="/home" className="nav-item">
//         <span className="nav-icon">🏠</span> HOME
//       </Link>
//       <Link to="/pesquisa" className="nav-item">
//         <span className="nav-icon">🔍</span> PESQUISA
//       </Link>
//       <Link to="/" className="nav-item">
//         <span className="nav-icon">📚</span> EDULINK
//       </Link>
//       <Link to="/chat" className="nav-item">
//         <span className="nav-icon">💬</span> CHAT
//       </Link>
//       <Link to="/edicao_perfil" className="nav-item">
//         <span className="nav-icon">👤</span> CONTA
//       </Link>
//     </div>

//   );
// }
function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bottom-nav">
      <Link to="/home" className="nav-item">
        <span className="nav-icon">🏠</span> HOME
      </Link>
      <Link to="/pesquisa" className="nav-item">
        <span className="nav-icon">🔍</span> PESQUISA
      </Link>
      <Link to="/" className="nav-item">
        <span className="nav-icon">📚</span> EDULINK
      </Link>
      <Link to="/chat" className="nav-item">
        <span className="nav-icon">💬</span> CHAT
      </Link>

      {/* Item de conta com dropdown */}
      <div className="nav-item dropdown-container">
        <button 
          className="dropdown-toggle" 
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        >
          <span className="nav-icon">👤</span> CONTA
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/edicao_perfil" className="dropdown-item">
              Meu Perfil
            </Link>
            <Link to="/configuracoes" className="dropdown-item">
              Configurações
            </Link>
            <Link to="/sair" className="dropdown-item">
              Sair
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
