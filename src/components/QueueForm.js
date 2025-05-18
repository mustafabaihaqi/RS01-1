import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createQueue } from '../services/api';

const QueueForm = ({ onQueueCreated }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    doctor: '',
    visitTime: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [queueNumber, setQueueNumber] = useState('');

  const navigate = useNavigate();

  const doctors = [
      { id: 1, name: "Dr. Andi", specialization: "Jantung", schedule: "08:00-15:00" },
      { id: 2, name: "Dr. Budi", specialization: "Mata", schedule: "10:00-17:00" },
      { id: 3, name: "Dr. Sule", specialization: "Kulit", schedule: "10:00-13:00" },
      { id: 4, name: "Dr. Haidar", specialization: "Kandungan", schedule: "07:00-10:00" },
      { id: 5, name: "Dr. Galih", specialization: "Paru", schedule: "12:00-14:00" },
  ];

  const visitTimes = [
    '07.00','08:00', '09:00', '10:00', '11:00',
    '13:00', '14:00', '15:00', '16:00', '17.00'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
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
    const nomorAntrean = 'A-' + Math.floor(100 + Math.random() * 900);
    setQueueNumber(nomorAntrean);
    setShowPopup(true);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pendaftaran Antrean Online</h2>
      {error && <p style={styles.error}>{error}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="patientName" style={styles.label}>Nama Pasien:</label>
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
              <option key={doctor.id} value={doctor.id}>
                {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="visitTime" style={styles.label}>Waktu Kunjungan:</label>
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

        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Daftar Antrean'}
        </button>
      </form>

      {showPopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Konfirmasi Pendaftaran</h3>
            <p><strong>Nama:</strong> {formData.patientName}</p>
            <p><strong>Nomor Antrean:</strong> {queueNumber}</p>
            <p><strong>Waktu Kunjungan:</strong> {formData.visitTime}</p>
            <button onClick={() => setShowPopup(false)}>
              Tutup
            </button>
          </div>
        </div>
      )}
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
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '300px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
};

export default QueueForm;
