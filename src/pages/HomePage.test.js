import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from './HomePage';

// Mock QueueForm dan QueueConfirmation
jest.mock('../components/QueueForm', () => ({ onQueueCreated }) => {
  return (
    <div>
      <p>Mocked QueueForm</p>
      <button onClick={() => onQueueCreated({ name: 'Budi', queueNumber: 'A01' })}>
        Simulate Submit
      </button>
    </div>
  );
});

jest.mock('../components/QueueConfirmation', () => ({ queue }) => (
  <div>
    <p>Mocked QueueConfirmation</p>
    <p>{queue.name}</p>
    <p>{queue.queueNumber}</p>
  </div>
));

describe('HomePage', () => {
  test('menampilkan QueueForm saat belum ada antrean', () => {
    render(<HomePage />);
    expect(screen.getByText(/Mocked QueueForm/i)).toBeInTheDocument();
  });

  test('menampilkan QueueConfirmation setelah Queue dibuat', () => {
    render(<HomePage />);
    
    // Simulasi submit dari QueueForm
    fireEvent.click(screen.getByText(/Simulate Submit/i));

    expect(screen.getByText(/Mocked QueueConfirmation/i)).toBeInTheDocument();
    expect(screen.getByText(/Budi/i)).toBeInTheDocument();
    expect(screen.getByText(/A01/i)).toBeInTheDocument();
  });
});
