// src/components/DoctorCard.js
import React from 'react';
import './DoctorCard.css';

function DoctorCard({ doctor, onClick }) {
  return (
    <div className="doctor-card" onClick={onClick}>
      <img
        src={doctor.profile_url || '/default-doctor.png'}
        alt={doctor.name}
        className="doctor-image"
      />
      <h3>{doctor.name}</h3>
      <p>{doctor.specialization}</p>
      <span className={`status ${doctor.availability_status?.replace(/\s+/g, '-').toLowerCase() || ''}`}>
        {doctor.availability_status || 'Unknown Status'}
      </span>
    </div>
  );
}

export default DoctorCard;
