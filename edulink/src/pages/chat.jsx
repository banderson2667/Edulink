import NavBar from '../components/NavBar.jsx'
import React, { useState, useEffect, useRef } from 'react';
import splitlayout from '../styles/splitlayout.css'


const chat= () => {
    return (
      <div>
        <div>
          <NavBar/>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
          <div className='split-container'>
            <div className="left-panel">
              {/* Conteúdo do lado esquerdo */}
              <div className='aba'><h3>Conversas</h3></div><br></br>
              <div className='usuário'><p>Laís Calvacante</p></div>
            </div>
            <div className="right-panel">
              {/* Conteúdo do lado direito */}
              <div className='aba'><h3>Mentores</h3></div><br></br>
              <div className='usuário'><p> 👤Profª. Laís Calvacante</p></div><br></br>
              <div className='usuário'><p> 👤Prof. João Santos</p></div><br></br>
              <div className='usuário'><p> 👤Prof. João Santos</p></div><br></br>
            </div>
          </div>
          
      </div>
    );
};

export default chat;