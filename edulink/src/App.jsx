import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Home from './pages/Home';
import Calendario from './pages/Calendario';
import EdicaoPerfil from './pages/EdicaoPerfil';
import PerfilMentor from './pages/PerfilMentor';
import MentorAvaliacao from './pages/MentorAvaliacao';
import Pesquisa from './pages/Pesquisa';
import EduLink from './pages/EduLink';
import Chat from './pages/chat';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EduLink />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calendario" element={<Calendario />} />
        <Route path="/edicao_perfil" element={<EdicaoPerfil />} />
        <Route path="/perfil_mentor" element={<PerfilMentor />} />
        <Route path="/mentor_avaliacao" element={<MentorAvaliacao />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  );
}

export default App;
