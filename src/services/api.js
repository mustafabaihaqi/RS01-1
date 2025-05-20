import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Data dokter dari backend
export const getDoctors = async () => {
  try {
    const response = await axios.get(`${API_URL}/doctor`);
    return response.data;
  } catch (error) {
    console.error('Error fetching doctors:', error);
    console.error('Error fetching doctors:', error);
    throw error;
  }
};

// Data antrean dari backend
export const getQueues = async () => {
  try {
    const response = await axios.get(`${API_URL}/queue`)
    return response.data;
  } catch (error) {
    console.error('Error fetching queues:', error);
    throw error;
  }
};

// Buat antrean baru ke backend
export const createQueue = async (queueData) => {
  try {
    const response = await axios.post(`${API_URL}/queue`, queueData); 
    return response.data;
  } catch (error) {
    console.error('Error creating queue:', error);
    throw error;
  }
};