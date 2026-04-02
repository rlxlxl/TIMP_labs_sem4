import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Vessels = () => {
  const [vessels, setVessels] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/vessels`)
      .then(response => setVessels(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteVessel = (id) => {
    axios.delete(`${API_URL}/vessels/${id}`)
      .then(() => {
        setVessels(vessels.filter(v => v.id !== id));
      });
  };

  return (
    <div>
      <h1>Суда</h1>

      <ul className="incidents-list">
        {vessels.map(vessel => (
          <li key={vessel.id} className="incident-card">
            <h3>
              <Link to={`/vessels/${vessel.id}`}>{vessel.name}</Link>
            </h3>
            <span className="incident-location">{vessel.type}</span>
            <span className="risk-badge">{vessel.flag}</span>
            <span className="risk-badge risk-low">{vessel.year}</span>
            <div className="card-actions">
              <button
                className="delete-btn"
                onClick={() => deleteVessel(vessel.id)}
              >
                Удалить
              </button>
            </div>
          </li>
        ))}
      </ul>

      <Link to="/vessels/add" className="add-link">+ Добавить судно</Link>
    </div>
  );
};

export default Vessels;
