import React, { useState, useEffect } from 'react';
import { getQueues } from '../services/api';
import './PatientListPage.css';

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getQueues();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Daftar Pasien</h2>
      <table style={styles.table}>
        <thead style={styles.thead}>
          <tr>
            <th>No. Antrean</th>
            <th>Nama Pasien</th>
            <th>Dokter</th>
            <th>Waktu Kunjungan</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id} style={styles.row}>
              <td>{patient.queueNumber}</td>
              <td>{patient.patientName}</td>
              <td>{patient.doctor}</td>
              <td>{patient.time}</td>
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
    maxWidth: '1200px',
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

export default PatientListPage;
