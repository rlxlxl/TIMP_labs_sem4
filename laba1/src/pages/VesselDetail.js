import React, { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const VesselDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const flagRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    axios.get(`${API_URL}/vessels/${id}`)
      .then(res => {
        nameRef.current.value = res.data.name;
        typeRef.current.value = res.data.type;
        flagRef.current.value = res.data.flag;
        yearRef.current.value = res.data.year;
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedVessel = {
      name: nameRef.current.value,
      type: typeRef.current.value,
      flag: flagRef.current.value,
      year: parseInt(yearRef.current.value)
    };

    axios.put(`${API_URL}/vessels/${id}`, updatedVessel)
      .then(() => navigate('/vessels'))
      .catch(err => console.error('Ошибка обновления:', err));
  };

  return (
    <div>
      <h1>Редактировать судно</h1>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label>Название</label>
          <input ref={nameRef} required />
        </div>
        <div className="form-group">
          <label>Тип</label>
          <input ref={typeRef} required />
        </div>
        <div className="form-group">
          <label>Флаг</label>
          <input ref={flagRef} required />
        </div>
        <div className="form-group">
          <label>Год постройки</label>
          <input ref={yearRef} type="number" required />
        </div>
        <button type="submit" className="submit-btn">Сохранить</button>
      </form>
    </div>
  );
};

export default VesselDetail;
