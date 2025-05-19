import React from 'react';

const QueueConfirmation = ({ queue }) => {
  if (!queue) return null;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Pendaftaran Berhasil!</h2>
      <div style={styles.card}>
        <p style={styles.queueNumber}>Nomor Antrean: {queue.queueNumber}</p>
        <div style={styles.details}>
          <p><strong>Nama Pasien:</strong> {queue.name}</p>
          <p><strong>Dokter:</strong> {queue.doctor}</p>
          <p><strong>Waktu Kunjungan:</strong> {queue.visitTime}</p>
        </div>
      </div>
      <p style={styles.note}>
        Silakan datang 15 menit sebelum waktu kunjungan Anda.
      </p>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    textAlign: 'center',
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
};

export default QueueConfirmation;