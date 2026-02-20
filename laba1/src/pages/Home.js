import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5001/incidents")
      .then(response => setIncidents(response.data))
      .catch(error => console.error(error));
  }, []);

  const deleteIncident = (id) => {
    axios.delete(`http://localhost:5001/incidents/${id}`)
      .then(() => {
        setIncidents(incidents.filter(i => i.id !== id));
      });
  };

  return (
    <div>
      <h1>Инциденты безопасности морского и речного транспорта</h1>

      <ul>
        {incidents.map(i => (
          <li key={i.id}>
            <Link to={`/detail/${i.id}`}>{i.title}</Link>
            <button onClick={() => deleteIncident(i.id)}>Удалить</button>
          </li>
        ))}
      </ul>

      <Link to="/add">Добавить инцидент</Link>
    </div>
  );
};

export default Home;