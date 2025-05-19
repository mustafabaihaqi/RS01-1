import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/HomePage', () => () => <div>Mocked HomePage</div>);

test('renders Header and HomePage by default route', () => {
  render(<App />);

  expect(screen.getByText(/Sistem Antrean Rumah Sakit/i)).toBeInTheDocument();

  expect(screen.getByText(/Pendaftaran/i)).toBeInTheDocument();
  expect(screen.getByText(/Daftar Dokter/i)).toBeInTheDocument();
  expect(screen.getByText(/Daftar Pasien/i)).toBeInTheDocument();

  expect(screen.getByText(/Mocked HomePage/i)).toBeInTheDocument();
});
