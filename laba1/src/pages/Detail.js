import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const riskRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/incidents/${id}`)
      .then(res => {
        titleRef.current.value = res.data.title;
        locationRef.current.value = res.data.location;
        riskRef.current.value = res.data.riskLevel;
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedIncident = {
      title: titleRef.current.value,
      location: locationRef.current.value,
      riskLevel: riskRef.current.value
    };

    axios.put(`${API_URL}/incidents/${id}`, JSON.stringify(updatedIncident), {
      headers: { 'Content-Type': 'application/json' }
    })
      .then(() => navigate('/'))
      .catch(err => console.error('Ошибка обновления:', err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input ref={titleRef} />
      <input ref={locationRef} />
      <input ref={riskRef} />
      <button>Сохранить</button>
    </form>
  );
};

export default Detail;