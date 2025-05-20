import React from 'react';

const QueueConfirmation = ({ queue, onClose }) => {
  if (!queue) return null;

  return (
    <div style={styles.modalOverlay}>
      <div style={styles.modalContent}>
        <h2 style={styles.title}>Pendaftaran Berhasil!</h2>
        <div style={styles.card}>
          <p style={styles.queueNumber}>Nomor Antrean: {queue.queueNumber}</p>
          <div style={styles.details}>
            <p><strong>Nama Pasien:</strong> {queue.patientName}</p>
            <p><strong>Dokter:</strong> {queue.doctor}</p>
            <p><strong>Waktu Kunjungan:</strong> {queue.visitTime}</p>
          </div>
        </div>
        <p style={styles.note}>
          Silakan datang 15 menit sebelum waktu kunjungan Anda.
        </p>
        <button onClick={onClose} style={styles.closeButton}>Tutup</button>
      </div>
    </div>
  );
};

const styles = {
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
    width: '320px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
  },
  title: {
    color: '#27ae60',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    marginBottom: '20px',
  },
  queueNumber: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#e67e22',
    margin: '0 0 15px 0',
  },
  details: {
    textAlign: 'left',
    margin: '0 auto',
    maxWidth: '300px',
  },
  note: {
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  closeButton: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default QueueConfirmation;
