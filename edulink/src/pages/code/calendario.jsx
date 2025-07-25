import React, { useState, useEffect } from 'react';
import '../styles/calendario.css';
import NavBar from '../components/NavBar.jsx';

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export default function Calendar() {
  const today = new Date();
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);
  const [appointments, setAppointments] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [newAppointment, setNewAppointment] = useState({ time: '', description: '' });
  const [alert, setAlert] = useState('');

  useEffect(() => {
    // Obter agendamentos do backend
    const fetchAppointments = async () => {
      const response = await fetch('http://localhost:5000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => setAlert(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const changeMonth = (direction) => {
    const newMonth = direction === 'prev' ? currentMonth - 1 : currentMonth + 1;
    if (newMonth < 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  const generateCalendar = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const startingDay = firstDay.getDay();

    const cells = [];

    for (let i = 0; i < startingDay; i++) {
      cells.push(<div key={`empty-${i}`} className="day disabled" />);
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      const isSelected = selectedDate === dateKey;
      const hasAppointment = appointments[dateKey]?.length > 0;

      cells.push(
        <div
          key={i}
          className={`day ${isToday ? 'current' : ''} ${isSelected ? 'selected' : ''} ${hasAppointment ? 'has-appointment' : ''}`}
          onClick={() => selectDate(dateKey)}
        >
          {i}
        </div>
      );
    }

    const totalCells = startingDay + daysInMonth;
    const remaining = 7 - (totalCells % 7);
    if (remaining < 7) {
      for (let i = 0; i < remaining; i++) {
        cells.push(<div key={`post-empty-${i}`} className="day disabled" />);
      }
    }

    return cells;
  };

  const selectDate = (dateKey) => {
    setSelectedDate(dateKey);
  };

  const formatDate = (dateKey) => {
    if (!dateKey) return 'Nenhuma data selecionada';
    const [year, month, day] = dateKey.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  const confirmAppointment = async () => {
    if (!newAppointment.time || !newAppointment.description) {
      setAlert('Por favor, preencha todos os campos');
      return;
    }

    const response = await fetch('http://localhost:5000/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ date: selectedDate, ...newAppointment }),
    });

    if (response.ok) {
      setAppointments((prev) => ({
        ...prev,
        [selectedDate]: [...(prev[selectedDate] || []), newAppointment]
      }));
      setNewAppointment({ time: '', description: '' });
      setShowModal(false);
      setAlert('Agendamento confirmado com sucesso!');
    } else {
      const error = await response.json();
      setAlert(error.message);
    }
  };

  return (
    <div className="conteudo-calendar">
      <div className="calendar-container">
        {alert && <div className="alert alert-success">{alert}</div>}

        <div className="calendar-header">
          <div className="month-year">{`${monthNames[currentMonth]} ${currentYear}`}</div>
          <div className="nav-buttons">
            <button className="nav-btn" onClick={() => changeMonth('prev')}>&lt;</button>
            <button className="nav-btn" onClick={() => changeMonth('next')}>&gt;</button>
          </div>
        </div>

        <div className="weekdays">
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map((d) => (
            <div key={d} className="weekday">{d}</div>
          ))}
        </div>

        <div className="days">{generateCalendar()}</div>

        <div className="appointment-display">
          <h3>Agendamentos para <span>{formatDate(selectedDate)}</span></h3>
          <div id="appointments-list">
            {selectedDate && appointments[selectedDate]?.length > 0 ? (
              appointments[selectedDate].map((appt, i) => (
                <div key={i} className="appointment-item">
                  <div>
                    <span className="appointment-time">{appt.time}</span>
                    <span>{appt.description}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-appointments">Nenhum agendamento para esta data</p>
            )}
          </div>
        </div>

        <div className="confirmation-section">
          <button
            className="confirm-btn"
            onClick={() => setShowModal(true)}
            disabled={!selectedDate}
          >
            Confirmar Data
          </button>
        </div>

        {showModal && (
          <div className="confirmation-modal" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3>Confirmar Agendamento</h3>
              <p>{`Você está agendando para: ${formatDate(selectedDate)}`}</p>
              <div className="form-group">
                <label>Horário:</label>
                <input
                  type="time"
                  className="form-control"
                  value={newAppointment.time}
                  onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label>Descrição:</label>
                <input
                  type="text"
                  className="form-control"
                  value={newAppointment.description}
                  onChange={(e) => setNewAppointment({ ...newAppointment, description: e.target.value })}
                />
              </div>
              <div className="modal-actions">
                <button className="modal-btn modal-cancel" onClick={() => setShowModal(false)}>Cancelar</button>
                <button className="modal-btn modal-confirm" onClick={confirmAppointment}>Confirmar</button>
              </div>
            </div>
          </div>
        )}
        <NavBar/>
      </div>
    </div>
  );
}