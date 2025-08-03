// src/pages/DoctorProfilePage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import './DoctorProfilePage.css';

function DoctorProfilePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`https://niroggyan-backend-qj7c.onrender.com/doctors/${id}`)
      .then(res => {
        if (!res.ok) throw new Error('Not found');
        return res.json();
      })
      .then(data => {
        setDoctor(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Doctor not found');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Loading doctor...</div>;
  if (error) return <div>{error}</div>;
  if (!doctor) return <div>Doctor not found</div>;

  return (

    <div className="doctor-profile-container">
    <button
        type="button"
        className="back-btn"
        onClick={() => navigate('/')}
        style={{
          marginBottom: '24px',
          padding: '10px 22px',
          borderRadius: '8px',
          background: 'linear-gradient(90deg, #f3f4f6, #dbeafe)',
          border: '1.5px solid #2563eb',
          color: '#2563eb',
          fontWeight: '600',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'background 0.2s, color 0.2s'
        }}
      >
        ← Back to Home
      </button>
      <img
        src={doctor.profile_url || '/default-doctor.png'}
        alt={doctor.name}
        className="doctor-profile-image"
      />
      <h2>{doctor.name}</h2>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>
      <p><strong>Degree:</strong> {doctor.degree}</p>
      <p><strong>Experience:</strong> {doctor.experience} years</p>
      <p><strong>Status:</strong> {doctor.availability_status}</p>
      <p><strong>Hospital:</strong> {doctor.hospital_name}</p>
      <p><strong>Address:</strong> {doctor.hospital_address}</p>
      <p><strong>Timings:</strong> {Array.isArray(doctor.hospital_timings) ? doctor.hospital_timings.join(', ') : doctor.hospital_timings}</p>
      <p style={{ marginTop: '16px' }}>{doctor.description}</p>
      <button className="book-btn" onClick={() => {/* Book appointment logic here */}}>
        Book Appointment
      </button>
      <br/>
    </div>
  );
}

export default DoctorProfilePage;
