import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Sistem Antrean Rumah Sakit</h1>
      <nav style={styles.nav}>
        <Link to="/" style={styles.link}>Pendaftaran</Link>
        <Link to="/daftar-dokter" style={styles.link}>Daftar Dokter</Link>
        <Link to="/daftar-pasien" style={styles.link}>Daftar Antrean</Link>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    fontSize: '1.5rem',
  },
  nav: {
    display: 'flex',
    gap: '1rem',
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
    ':hover': {
      backgroundColor: '#3498db',
    }
  },
};

export default Header;