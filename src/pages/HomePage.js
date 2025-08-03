import React, { useState, useEffect } from 'react';
import DoctorCard from '../components/DoctorCard';
import './HomePage.css'; // optional for scoped page styles
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://niroggyan-backend-qj7c.onrender.com/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch doctors');
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading doctors...</div>;
  if (error) return <div>{error}</div>;

  // Search filter
  const filtered = doctors.filter(doc =>
    doc.name.toLowerCase().includes(search.toLowerCase()) ||
    doc.specialization.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Book a Healthcare Appointment</h1>
      <input 
        type="text"
        placeholder="Search by name or specialization"
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="search-input"
      />

      <div className="doctors-list">
        {filtered.map(doc => (
          <DoctorCard 
            key={doc.id} 
            doctor={doc} 
            onClick={() => navigate(`/doctor/${doc.id}`)} 
          />
        ))}
        {filtered.length === 0 && <p>No doctors found.</p>}
      </div>
    </div>
  );
}

export default HomePage;
