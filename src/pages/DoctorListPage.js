import React, { useState, useEffect } from 'react';
import { getDoctors } from '../services/api'; // Anda perlu membuat fungsi API ini

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
      <h2>Daftar Dokter</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>Nama</th>
            <th>Spesialisasi</th>
            <th>Jadwal Praktek</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map(doctor => (
            <tr key={doctor.id}>
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
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
};

export default DoctorListPage;