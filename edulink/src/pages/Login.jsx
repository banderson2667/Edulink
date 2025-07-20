import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/login.css';
import NavBar from '../components/NavBar.jsx'


export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      alert('Preencha todos os campos!');
      return;
    }
    
    // Se o email e senha estiver correto redireciona para o home.
    alert(`Login com sucesso: ${email}`);
    navigate('/home');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">FAÇA SEU LOGIN</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label>Email:</label>
          <input
            type="email"
            placeholder="Digite seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          <button type="submit" className="btn-login">Entrar</button>
        </form>
        <div className="login-links">
          <a href="#">Esqueceu a senha?</a>
          <a href="/cadastro">Criar uma conta</a>
        </div>
      </div>
      <NavBar/>
    </div>
  );
}
