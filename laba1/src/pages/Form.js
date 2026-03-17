import React, { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const titleRef = useRef(null);
  const locationRef = useRef(null);
  const riskRef = useRef(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newIncident = {
      title: titleRef.current.value,
      location: locationRef.current.value,
      riskLevel: riskRef.current.value
    };

    axios.post("http://localhost:8080/incidents", newIncident)
      .then(() => navigate('/'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Название инцидента" ref={titleRef} required />
      <input placeholder="Место" ref={locationRef} required />
      <input placeholder="Уровень риска" ref={riskRef} required />
      <button type="submit">Сохранить</button>
    </form>
  );
};

export default Form;