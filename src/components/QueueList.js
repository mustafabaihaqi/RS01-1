import React, { useEffect, useState } from 'react';
import { getQueues } from '../services/api';

const QueueList = () => {
  const [queues, setQueues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchQueues = async () => {
      try {
        const data = await getQueues();
        setQueues(data);
      } catch (err) {
        console.error('Error fetching queues:', err);
        setError('Gagal memuat data antrean');
      } finally {
        setLoading(false);
      }
    };

    fetchQueues();
  }, []);

  if (loading) return <p>Memuat data antrean...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Daftar Antrean</h2>
      {queues.length === 0 ? (
        <p>Tidak ada antrean saat ini.</p>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>No. Antrean</th>
              <th style={styles.th}>Nama Pasien</th>
              <th style={styles.th}>Dokter</th>
              <th style={styles.th}>Waktu</th>
            </tr>
          </thead>
          <tbody>
            {queues.map(queue => (
              <tr key={queue._id} style={styles.tr}>
                <td style={styles.td}>{queue.queueNumber}</td>
                <td style={styles.td}>{queue.name}</td>
                <td style={styles.td}>{queue.doctor}</td>
                <td style={styles.td}>{queue.visitTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
  },
  th: {
    backgroundColor: '#3498db',
    color: 'white',
    padding: '12px',
    textAlign: 'left',
  },
  tr: {
    borderBottom: '1px solid #ddd',
    '&:nth-child(even)': {
      backgroundColor: '#f2f2f2',
    },
    '&:hover': {
      backgroundColor: '#e6f7ff',
    },
  },
  td: {
    padding: '12px',
  },
};

export default QueueList;