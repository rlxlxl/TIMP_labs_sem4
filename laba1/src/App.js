import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './pages/Home'
import Form from './pages/Form'
import Detail from './pages/Detail'
import Vessels from './pages/Vessels'
import VesselForm from './pages/VesselForm'
import VesselDetail from './pages/VesselDetail'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <nav style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid #ccc' }}>
          <Link to="/" style={{ marginRight: '15px' }}>Инциденты</Link>
          <Link to="/vessels">Суда</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/add" element={<Form />} />
          <Route path="/vessels" element={<Vessels />} />
          <Route path="/vessels/add" element={<VesselForm />} />
          <Route path="/vessels/:id" element={<VesselDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;