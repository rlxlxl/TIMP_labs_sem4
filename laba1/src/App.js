import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './pages/Home'
import Form from './pages/Form'
import Detail from './pages/Detail'

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <h2>Приложение</h2>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/add" element={<Form />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;