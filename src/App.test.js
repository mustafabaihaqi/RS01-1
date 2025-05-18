import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock QueueForm dan QueueConfirmation supaya muncul teks yang gampang dicek
jest.mock('./pages/HomePage', () => () => <div>Mocked HomePage</div>);

test('renders Header and HomePage by default route', () => {
  render(<App />);

  // Cek judul header
  expect(screen.getByText(/Sistem Antrean Rumah Sakit/i)).toBeInTheDocument();

  // Cek link navigasi
  expect(screen.getByText(/Pendaftaran/i)).toBeInTheDocument();
  expect(screen.getByText(/Daftar Dokter/i)).toBeInTheDocument();
  expect(screen.getByText(/Daftar Pasien/i)).toBeInTheDocument();

  // Cek teks dari mock HomePage
  expect(screen.getByText(/Mocked HomePage/i)).toBeInTheDocument();
});
