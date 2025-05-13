import React, { useState, useEffect } from 'react';
import { getPatients } from '../services/api'; // Anda perlu membuat fungsi API ini

const PatientListPage = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchPatients = async () => {
      const data = await getPatients();
      setPatients(data);
    };
    fetchPatients();
  }, []);

  return (
    <div style={styles.container}>
      <h2>Daftar Pasien</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>No. Antrean</th>
            <th>Nama Pasien</th>
            <th>Dokter</th>
            <th>Waktu Kunjungan</th>
          </tr>
        </thead>
        <tbody>
          {patients.map(patient => (
            <tr key={patient.id}>
              <td>{patient.queueNumber}</td>
              <td>{patient.name}</td>
              <td>{patient.doctor}</td>
              <td>{patient.visitTime}</td>
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
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
};

export default PatientListPage;