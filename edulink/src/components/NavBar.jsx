import React , { useState} from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import { HomeIcon, EduLinkIcon,AccountIcon, ChatIcon, SearchIcon } from './icones';


function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="bottom-nav">
      <Link to="/home" className="nav-item">
        <span className="nav-icon"><HomeIcon/></span> HOME
      </Link>
      <Link to="/pesquisa" className="nav-item">
        <span className="nav-icon"><SearchIcon/></span> PESQUISA
      </Link>
      <Link to="/" className="nav-item">
        <span className="nav-icon"><EduLinkIcon/></span> EDULINK
      </Link>
      <Link to="/chat" className="nav-item">
        <span className="nav-icon"><ChatIcon/></span> CHAT
      </Link>

      {/* Item de conta com dropdown */}
      <div className="nav-item dropdown-container">
        <button 
          className="dropdown-toggle" 
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
        >
          <span className="nav-icon"><AccountIcon/></span> CONTA
        </button>

        {isDropdownOpen && (
          <div className="dropdown-menu">
            <Link to="/perfil_estudante" className="dropdown-item">
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
