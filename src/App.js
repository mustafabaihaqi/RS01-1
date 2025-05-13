import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import DoctorListPage from './pages/DoctorListPage';
import PatientListPage from './pages/PatientListPage';
import DoctorSchedulePage from './pages/DoctorSchedulePage';
import PatientQueuePage from './pages/PatientQueuePage';

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
            <Route path="/jadwal-dokter" element={<DoctorSchedulePage />} />
            <Route path="/antrian-pasien" element={<PatientQueuePage />} />
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