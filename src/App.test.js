// src/App.test.js

import React from 'react';
import { render, screen } from '@testing-library/react';
import { act } from 'react';
import App from './App';

describe('App Component', () => {
  it('renders Header and HomePage by default route', async () => {
    await act(async () => {
      render(<App />);
    });

    // Header content
    expect(screen.getByText(/Sistem Antrean Rumah Sakit/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Pendaftaran/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Daftar Dokter/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Daftar Antrean/i })).toBeInTheDocument();

    // Halaman utama (optional: sesuaikan dengan teks utama halaman beranda)
    expect(screen.getByText(/Pendaftaran Antrean Online/i)).toBeInTheDocument();
  });
});
