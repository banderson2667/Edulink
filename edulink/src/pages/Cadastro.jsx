import React, { useState } from 'react';
import '../styles/cadastro.css';
import NavBar from '../components/NavBar.jsx'
import ProfilePictureUpload from '../components/PerfilFoto.jsx'

export default function CadastroForm() {
  const [curriculo, setCurriculo] = useState(null);

  // Estados para os campos do formulário
  const [formData, setFormData] = useState({
    nome: '',
    nascimento: '',
    genero: '',
    nacionalidade: '',
    email: '',
    naturalidade: '',
    telefone: '',
    whatsapp: '',
    escolaridade: '',
    curso: '',
    semestre: '',
    universidade: '',
    areaInteresse: '',
    cursosQualificacao: '',
    papel: '', // mentor ou estudante
  });

  const handleUpload = (e) => {
    setCurriculo(e.target.files[0]);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "radio" ? value : value
    }));
  };

  const handleSubmit = async () => {
    const dataToSend = new FormData();
    for (const key in formData) {
      dataToSend.append(key, formData[key]);
    }
    if (curriculo) {
      dataToSend.append('curriculo', curriculo);
    }

    try {
      const response = await fetch('http://localhost:3001/cadastro', {
        method: 'POST',
        body: dataToSend
      });

      const result = await response.json();
      alert('Cadastro enviado com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar cadastro:', error);
      alert('Erro ao enviar cadastro');
    }
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-titulo">FAÇA O SEU CADASTRO</h1>

      <div className="cadastro-form-box">
        <div className="form-coluna">
          <h3>Dados Pessoais</h3>
          <br/>

          <ProfilePictureUpload />
          <br/>
          <div className="form-grid">
            <div>
              <label>Nome Completo:</label>
              <input type="text" name="nome" onChange={handleChange} />
            </div>
            <div>
              <label>Data de Nascimento:</label>
              <input type="date" name="nascimento" onChange={handleChange} />
            </div>
            <div>
              <label>Gênero:</label>
              <select name="genero" onChange={handleChange}>
                <option>Selecione</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label>Nacionalidade:</label>
              <select name="nacionalidade" onChange={handleChange}>
                <option>Selecione</option>
                <option>Brasileira</option>
                <option>Estrangeira</option>
              </select>
            </div>
            <div>
              <label>E-mail:</label>
              <input type="email" name="email" onChange={handleChange} />
            </div>
            <div>
              <label>Naturalidade:</label>
              <select name="naturalidade" onChange={handleChange}>
                <option>Selecione</option>
                <option>Salvador</option>
                <option>Feira de Santana</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label>Telefone:</label>
              <input type="tel" name="telefone" onChange={handleChange} />
            </div>
            <div>
              <label>Deseja receber notificações por WhatsApp?</label>
              <div className="checkbox-line">
                <label><input type="radio" name="whatsapp" value="Sim" onChange={handleChange} /> Sim</label>
                <label><input type="radio" name="whatsapp" value="Não" onChange={handleChange} /> Não</label>
              </div>
            </div>
          </div>

          <br/>
          <h3>Escolaridade</h3>
          <br/>
          <div className="form-grid">
            <div>
              <label>Grau de Escolaridade:</label>
              <select name="escolaridade" onChange={handleChange}>
                <option>Selecione</option>
                <option>Médio</option>
                <option>Técnico</option>
                <option>Superior</option>
              </select>
            </div>
            <div>
              <label>Curso:</label>
              <input type="text" name="curso" onChange={handleChange} />
            </div>
            <div>
              <label>Semestre:</label>
              <select name="semestre" onChange={handleChange}>
                <option>Selecione</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Universidade:</label>
              <input type="text" name="universidade" onChange={handleChange} />
            </div>
            <div>
              <label>Áreas de Interesse:</label>
              <select name="areaInteresse" onChange={handleChange}>
                <option>Selecione</option>
                <option>Engenharia</option>
                <option>Ciência de Dados</option>
                <option>Medicina</option>
                <option>Educação</option>
              </select>
            </div>
            <div>
              <label>Cursos de Qualificação:</label>
              <input type="text" name="cursosQualificacao" onChange={handleChange} />
            </div>
            <div>
              <label>Anexe aqui o seu currículo:</label>
              <input type="file" onChange={handleUpload} />
              <p className="file-label">{curriculo ? curriculo.name : 'Nenhum arquivo escolhido'}</p>
            </div>
            <div>
              <label>Você deseja atuar como?</label><br/>
              <div className="checkbox-line">
                <label><input type="radio" name="papel" value="Mentor" onChange={handleChange} /> Mentor</label>
                <label><input type="radio" name="papel" value="Estudante" onChange={handleChange} /> Estudante</label>
              </div>
            </div>
          </div>

          <div className="btn-wrap">
            <button className="btn-add" onClick={handleSubmit}>Adicionar</button>
          </div>
        </div>
      </div>
      <NavBar/>
    </div>
  );
}
