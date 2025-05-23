import React, { useState, useEffect } from 'react';
import { getDoctors, createQueue } from '../services/api';
import { useNavigate } from 'react-router-dom';
import QueueConfirmation from './QueueConfirmation';

const QueueForm = ({ onQueueCreated }) => {
  const [queueData, setQueueData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    visitTime: ''
  });

  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        setDoctors(data);
      } catch (err) {
        setError('Gagal mengambil data dokter');
      }
    };
    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'doctor') {
      const selectedDoctor = doctors.find(doc => doc._id === value);
      const doctorTime = selectedDoctor ? selectedDoctor.availableTimes : '';
      setFormData(prev => ({
        ...prev,
        doctor: value,
        visitTime: doctorTime
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.name.trim()) {
      setError('Nama pasien wajib diisi');
      return;
    }
  
    if (!formData.doctor || !formData.visitTime) {
      setError('Silakan pilih dokter');
      return;
    }
  
    setIsSubmitting(true);
    try {
      // Kirim doctor sebagai ObjectId (string _id), bukan nama dokter
      const response = await createQueue({
        patientName: formData.name,
        doctor: formData.doctor,  // <-- kirim ID dokter langsung
        time: formData.visitTime
      });
  
      const selectedDoctor = doctors.find(doc => doc._id === formData.doctor);
  
      setQueueData({
        queueNumber: response.queueNumber,
        patientName: formData.name,
        doctor: `${selectedDoctor.name} - ${selectedDoctor.specialization}`, // ini untuk tampilan saja
        visitTime: formData.visitTime,
      });
      setShowPopup(true);
      setFormData({ name: '', doctor: '', visitTime: '' });
  
      if (onQueueCreated) onQueueCreated();
    } catch (err) {
      setError('Gagal membuat antrean');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      backgroundColor: '#f9f9f9',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    title: {
      textAlign: 'center',
      color: '#2c3e50',
      marginBottom: '20px',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
    },
    label: {
      fontWeight: 'bold',
      color: '#34495e',
    },
    input: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
    },
    select: {
      padding: '10px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      fontSize: '16px',
      backgroundColor: 'white',
    },
    button: {
      padding: '12px',
      backgroundColor: '#3498db',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontSize: '16px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    },
    error: {
      color: '#e74c3c',
      backgroundColor: '#fadbd8',
      padding: '10px',
      borderRadius: '4px',
      textAlign: 'center',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pendaftaran Antrean Online</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Nama Pasien:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            maxLength={50}
            style={styles.input}
            placeholder="Masukkan nama pasien"
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="doctor" style={styles.label}>Pilih Dokter:</label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">-- Pilih Dokter --</option>
            {doctors.map(doctor => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Waktu Kunjungan:</label>
          <div style={{
            padding: '10px',
            backgroundColor: '#eee',
            borderRadius: '4px',
            color: formData.visitTime ? '#2c3e50' : '#aaa'
          }}>
            {formData.visitTime || '-- Belum memilih dokter --'}
          </div>
        </div>

        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Daftar Antrean'}
        </button>
      </form>

      {showPopup && queueData && (
        <QueueConfirmation
          queue={queueData}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
};

export default QueueForm;
