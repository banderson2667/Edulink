import React, { useState } from 'react';
import '../styles/cadastro.css';
import NavBar from '../components/NavBar.jsx'
import ProfilePictureUpload from '../components/PerfilFoto.jsx'

export default function CadastroForm() {
  const [curriculo, setCurriculo] = useState(null);

  const handleUpload = (e) => {
    setCurriculo(e.target.files[0]);
  };

  return (
    <div className="cadastro-container">
      <h1 className="cadastro-titulo">FAÇA O SEU CADASTRO</h1>

      <div className="cadastro-form-box">
        <div className="form-coluna">
          <h3>Dados Pessoais</h3>
          <br/>
          {/* <div className="form-foto">
            <img src="./assets/perfil-placeholder.png" alt="Foto de Perfil" />
            <p>Foto de Perfil</p>
          </div> */}

          <ProfilePictureUpload />
          
          <br/>
          <div className="form-grid">
            <div>
              <label>Nome Completo:</label>
              <input type="text" />
            </div>
            <div>
              <label>Data de Nascimento:</label>
              <input type="date" />
            </div>
            <div>
              <label>Gênero:</label>
              <select>
                <option>Selecione</option>
                <option>Masculino</option>
                <option>Feminino</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label>Nacionalidade:</label>
              <select>
                <option>Selecione</option>
                <option>Brasileira</option>
                <option>Estrangeira</option>
              </select>
            </div>
            <div>
              <label>E-mail:</label>
              <input type="email" />
            </div>
            <div>
              <label>Naturalidade:</label>
              <select>
                <option>Selecione</option>
                <option>Salvador</option>
                <option>Feira de Santana</option>
                <option>Outro</option>
              </select>
            </div>
            <div>
              <label>Telefone:</label>
              <input type="tel" />
            </div>
            <div>
              <label>Deseja receber notificações por WhatsApp?</label>
              <div className="checkbox-line">
                <label><input type="radio" name="whatsapp" /> Sim</label>
                <label><input type="radio" name="whatsapp" /> Não</label>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <h3>Escolaridade</h3>
          <br/>
          <div className="form-grid">
            <div>
              <label>Grau de Escolaridade:</label>
              <select>
                <option>Selecione</option>
                <option>Médio</option>
                <option>Técnico</option>
                <option>Superior</option>
              </select>
            </div>
            <div>
              <label>Curso:</label>
              <input type="text" />
            </div>
            <div>
              <label>Semestre:</label>
              <select>
                <option>Selecione</option>
                {[...Array(12)].map((_, i) => (
                  <option key={i}>{i + 1}</option>
                ))}
              </select>
            </div>
            <div>
              <label>Universidade:</label>
              <input type="text" />
            </div>
            <div>
              <label>Áreas de Interesse:</label>
              <select>
                <option>Selecione</option>
                <option>Engenharia</option>
                <option>Ciência de Dados</option>
                <option>Medicina</option>
                <option>Educação</option>
              </select>
            </div>
            <div>
              <label>Cursos de Qualificação:</label>
              <input type="text" />
            </div>
            <div>
              <label>Anexe aqui o seu currículo:</label>
              <input type="file" onChange={handleUpload} />
              <p className="file-label">{curriculo ? curriculo.name : 'Nenhum arquivo escolhido'}</p>
            </div>
            <div>
              <label>Você deseja atuar como?</label><br/>
              <div className="checkbox-line">
                <label><input type="radio" name="mentor" /> Mentor</label>
                <label><input type="radio" name="estudante" /> Estudante</label>
              </div>
            </div>
          </div>
          <div className="btn-wrap">
            <button className="btn-add">Adicionar</button>
          </div>
          
        </div>
      </div>
      <NavBar/>
    </div>
  );
}
