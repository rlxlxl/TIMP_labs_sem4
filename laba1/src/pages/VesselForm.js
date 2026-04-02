import React, { useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const VesselForm = () => {
  const nameRef = useRef(null);
  const typeRef = useRef(null);
  const flagRef = useRef(null);
  const yearRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`${API_URL}/vessels/${id}`)
        .then(res => {
          nameRef.current.value = res.data.name;
          typeRef.current.value = res.data.type;
          flagRef.current.value = res.data.flag;
          yearRef.current.value = res.data.year;
        });
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const vessel = {
      name: nameRef.current.value,
      type: typeRef.current.value,
      flag: flagRef.current.value,
      year: parseInt(yearRef.current.value)
    };

    if (id) {
      axios.put(`${API_URL}/vessels/${id}`, vessel)
        .then(() => navigate('/vessels'));
    } else {
      axios.post(`${API_URL}/vessels`, vessel)
        .then(() => navigate('/vessels'));
    }
  };

  return (
    <div>
      <h1>{id ? 'Редактировать судно' : 'Добавить судно'}</h1>
      <form onSubmit={handleSubmit} className="incident-form">
        <div className="form-group">
          <label>Название</label>
          <input 
            ref={nameRef} 
            placeholder="Название судна" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Тип</label>
          <select ref={typeRef} required>
            <option value="">Выберите тип</option>
            <option value="Грузовое">Грузовое</option>
            <option value="Пассажирское">Пассажирское</option>
            <option value="Танкер">Танкер</option>
            <option value="Буксир">Буксир</option>
            <option value="Контейнеровоз">Контейнеровоз</option>
          </select>
        </div>
        <div className="form-group">
          <label>Флаг</label>
          <input 
            ref={flagRef} 
            placeholder="Страна флага" 
            required 
          />
        </div>
        <div className="form-group">
          <label>Год постройки</label>
          <input 
            ref={yearRef} 
            type="number" 
            placeholder="Год" 
            required 
            min="1900"
            max={new Date().getFullYear()}
          />
        </div>
        <button type="submit" className="submit-btn">Сохранить</button>
      </form>
    </div>
  );
};

export default VesselForm;
