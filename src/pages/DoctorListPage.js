import React, { useState, useEffect } from 'react';
import { getDoctors } from '../services/api';

const DoctorListPage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };
    fetchDoctors();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Daftar Dokter</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th>Nama</th>
            <th>Spesialisasi</th>
            <th>Jadwal Praktek</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id} style={styles.row}>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.schedule}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '1000px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 0 8px rgba(0, 0, 0, 0.1)',
  },
  thead: {
    backgroundColor: '#2c3e50',
    color: 'white',
  },
  row: {
    transition: 'background-color 0.2s',
  },
  'table td, table th': {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
};

export default DoctorListPage;
