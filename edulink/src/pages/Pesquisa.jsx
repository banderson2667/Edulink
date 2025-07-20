import React, { useState } from 'react';
import '../styles/pesquisa.css';
import NavBar from '../components/NavBar.jsx'

const dadosReunioes = [
  { id: 1, mentor: 'Dra. Laise Cavalcante', data: '2025-06-15 14:00', status: 'Confirmada' },
  { id: 2, mentor: 'Prof. João Santos', data: '2025-06-18 10:30', status: 'Pendente' },
  { id: 3, mentor: 'Ana Costa', data: '2025-06-20 16:00', status: 'Concluída' },
];

export default function Reunioes() {
  const [filtro, setFiltro] = useState('');

  const reunioesFiltradas = dadosReunioes.filter((r) =>
    r.mentor.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="reunioes-container">
      <h1>Minhas Reuniões</h1>
      <input
        type="text"
        placeholder="Buscar por mentor..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="filtro-input"
      />

      <ul className="reunioes-lista">
        {reunioesFiltradas.map((reuniao) => (
          <li key={reuniao.id} className={`reuniao-item ${reuniao.status.toLowerCase()}`}>
            <h3>{reuniao.mentor}</h3>
            <p><strong>Data:</strong> {reuniao.data}</p>
            <p><strong>Status:</strong> {reuniao.status}</p>
          </li>
        ))}
      </ul>
      <NavBar/>
    </div>
  );
}
