import React, { useState } from 'react';
import { createQueue } from '../services/api';

const QueueForm = ({ onQueueCreated }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctor: '',
    visitTime: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doctors = [
    { id: '1', name: 'Dr. Andi', specialization: 'Spesialis Jantung' },
    { id: '2', name: 'Dr. Budi', specialization: 'Spesialis Mata' },
    { id: '3', name: 'Dr. Citra', specialization: 'Spesialis Anak' }
  ];

  const visitTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '13:00', '14:00', '15:00', '16:00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.patientName.trim()) {
      setError('Nama pasien wajib diisi');
      return;
    }
    
    if (formData.patientName.length > 50) {
      setError('Nama pasien maksimal 50 karakter');
      return;
    }
    
    if (!formData.doctor || !formData.visitTime) {
      setError('Silakan pilih dokter dan waktu kunjungan');
      return;
    }
    
    setError('');
    setIsSubmitting(true);
    
    try {
      const selectedDoctor = doctors.find(d => d.id === formData.doctor);
      const doctorInfo = `${selectedDoctor.name} - ${selectedDoctor.specialization}`;
      
      const queueData = {
        patientName: formData.patientName,
        doctor: doctorInfo,
        visitTime: formData.visitTime
      };
      
      const response = await createQueue(queueData);
      onQueueCreated(response);
      
      // Reset form
      setFormData({
        patientName: '',
        doctor: '',
        visitTime: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Gagal membuat antrean. Silakan coba lagi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pendaftaran Antrean Online</h2>
      {error && <p style={styles.error}>{error}</p>}
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="patientName" style={styles.label}>
            Nama Pasien:
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            maxLength={50}
            style={styles.input}
            placeholder="Masukkan nama pasien"
          />
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="doctor" style={styles.label}>
            Pilih Dokter:
          </label>
          <select
            id="doctor"
            name="doctor"
            value={formData.doctor}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">-- Pilih Dokter --</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>
        
        <div style={styles.formGroup}>
          <label htmlFor="visitTime" style={styles.label}>
            Waktu Kunjungan:
          </label>
          <select
            id="visitTime"
            name="visitTime"
            value={formData.visitTime}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="">-- Pilih Waktu --</option>
            {visitTimes.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        
        <button 
          type="submit" 
          style={styles.button}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Memproses...' : 'Daftar Antrean'}
        </button>
      </form>
    </div>
  );
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

export default QueueForm;