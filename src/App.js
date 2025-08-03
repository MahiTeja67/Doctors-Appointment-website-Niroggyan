import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DoctorProfilePage from './pages/DoctorProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/doctor/:id" element={<DoctorProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
