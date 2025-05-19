import React, { useState , useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { createQueue , getDoctors } from '../services/api';

const QueueForm = ({ onQueueCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    doctor: '',
    visitTime: ''
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [queueNumber, setQueueNumber] = useState('');

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(true);
  const [doctorError, setDoctorError] = useState('');
  
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getDoctors();
        console.log('Doctors fetched:', data); // debug
        setDoctors(data);
      } catch (err) {
        console.error('Gagal mengambil data dokter:', err);
        setDoctorError('Gagal memuat daftar dokter');
      } finally {
        setLoadingDoctors(false);
      }
    };
  
    fetchDoctors();
  }, []);
  
  
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'doctor') {
      const selectedDoctor = doctors.find(doc => doc.id === parseInt(value));
      const doctorSchedule = selectedDoctor ? selectedDoctor.schedule : '';
      setFormData(prev => ({
        ...prev,
        doctor: value,
        visitTime: doctorSchedule
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
  
    if (formData.name.length > 50) {
      setError('Nama pasien maksimal 50 karakter');
      return;
    }
  
    if (!formData.doctor || !formData.visitTime) {
      setError('Silakan pilih dokter');
      return;
    }
  
    const selectedDoctor = doctors.find(doc => doc.id === parseInt(formData.doctor));
    if (!selectedDoctor) {
      setError('Dokter tidak ditemukan');
      return;
    }
  
    const queueData = {
      patientName: formData.name,
      doctor: selectedDoctor.name,
      time: selectedDoctor.name
    };
    
  
    setIsSubmitting(true);
    setError('');
  
    try {
      const createdQueue = await createQueue(queueData);
      setQueueNumber(createdQueue.queueNumber); // Ambil dari respon backend
      setShowPopup(true);
      onQueueCreated(createdQueue); // Berikan ke HomePage untuk ditampilkan
    } catch (err) {
      setError('Gagal mendaftar antrean. Coba lagi.');
      console.error(err);
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
          {loadingDoctors ? (
            <p>Memuat daftar dokter...</p>
          ) : doctorError ? (
            <p style={styles.error}>{doctorError}</p>
          ) : (
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
          )}
        </div>


        {formData.visitTime && (
          <div style={styles.formGroup}>
            <label style={styles.label}>Waktu Kunjungan:</label>
            <div style={{ padding: '10px', backgroundColor: '#eee', borderRadius: '4px' }}>
             {formData.visitTime}
            </div>
         </div>
      )}


        <button type="submit" style={styles.button} disabled={isSubmitting}>
          {isSubmitting ? 'Memproses...' : 'Daftar Antrean'}
        </button>
      </form>

      {showPopup && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h3>Konfirmasi Pendaftaran</h3>
            <p><strong>Nama:</strong> {formData.name}</p>
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
