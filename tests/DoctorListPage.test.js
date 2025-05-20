import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import DoctorListPage from '../src/pages/DoctorListPage';
import * as api from '../src/services/api';

jest.mock('../services/api');

const mockDoctors = [
  { id: 1, name: 'Dr. Siti', specialization: 'Umum', schedule: 'Senin - Jumat' },
];

test('renders list of doctors', async () => {
  api.getDoctors.mockResolvedValue(mockDoctors);

  render(<DoctorListPage />);

  expect(screen.getByText(/Daftar Dokter/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Dr. Siti/i)).toBeInTheDocument();
    expect(screen.getByText(/Umum/i)).toBeInTheDocument();
  });
});
