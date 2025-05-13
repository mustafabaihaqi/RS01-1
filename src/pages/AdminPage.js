import React from 'react';
import QueueList from '../components/QueueList';

const AdminPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Dashboard</h1>
      <QueueList />
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
  },
  title: {
    textAlign: 'center',
    color: '#2c3e50',
    marginBottom: '30px',
  },
};

export default AdminPage;