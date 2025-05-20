// src/pages/PatientListPage.test.js

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import PatientListPage from './PatientListPage';
import * as api from '../services/api';

jest.mock('../services/api');

const mockPatients = [
  { id: 1, name: 'Budi', doctor: 'Dr. Andi', visitTime: '2024-05-20 10:00' },
  { id: 2, name: 'Siti', doctor: 'Dr. Budi', visitTime: '2024-05-20 11:00' }
];

describe('PatientListPage', () => {
  it('renders patient list from API', async () => {
    api.getPatients.mockResolvedValue(mockPatients);

    render(<PatientListPage />);

    await waitFor(() => {
      expect(screen.getByText('Budi')).toBeInTheDocument();
      expect(screen.getByText('Dr. Andi')).toBeInTheDocument();
    });
  });
});
