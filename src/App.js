import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DoctorListPage from './pages/DoctorListPage';
import PatientListPage from './pages/PatientListPage';

const App = () => {
  return (
    <Router>
      <div style={styles.app}>
        <Header />
        <main style={styles.main}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/daftar-dokter" element={<DoctorListPage />} />
            <Route path="/daftar-pasien" element={<PatientListPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  main: {
    flex: 1,
    padding: '20px',
    backgroundColor: '#ecf0f1',
  },
};

export default App;