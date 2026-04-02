import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Home = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/incidents`)
      .then(response => setIncidents(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteIncident = (id) => {
    axios.delete(`${API_URL}/incidents/${id}`)
      .then(() => {
        setIncidents(incidents.filter(i => i.id !== id));
      });
  };

  return (
    <div>
      <h1>Инциденты безопасности морского и речного транспорта</h1>

      <ul className="incidents-list">
        {incidents.map(i => (
          <li key={i.id} className="incident-card">
            <h3>
              <Link to={`/detail/${i.id}`}>{i.title}</Link>
            </h3>
            <span className="incident-location">{i.location}</span>
            <span className={`risk-badge ${
              i.riskLevel === 'Высокий' ? 'risk-high' : 
              i.riskLevel === 'Средний' ? 'risk-medium' : 'risk-low'
            }`}>
              {i.riskLevel}
            </span>
            <div className="card-actions">
              <button 
                className="delete-btn" 
                onClick={() => deleteIncident(i.id)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/add" className="add-link">+ Добавить инцидент</Link>
    </div>
  );
};

export default Home;