import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PatientListPage from './PatientListPage';
import * as api from '../services/api';

jest.mock('../services/api');

const mockPatients = [
  {
    id: 1,
    queueNumber: 'A01',
    name: 'Budi',
    doctor: 'Dr. Siti',
    visitTime: '10:00',
  },
];

test('renders list of patients', async () => {
  api.getPatients.mockResolvedValue(mockPatients);

  render(<PatientListPage />);

  expect(screen.getByText(/Daftar Pasien/i)).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByText(/Budi/i)).toBeInTheDocument();
    expect(screen.getByText(/Dr. Siti/i)).toBeInTheDocument();
  });
});
