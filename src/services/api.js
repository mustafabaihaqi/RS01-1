import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

export const createQueue = async (queueData) => {
  try {
    const response = await axios.post(`${API_URL}/queues`, queueData);
    return response.data;
  } catch (error) {
    console.error('Error creating queue:', error);
    throw error;
  }
};

export const getQueues = async () => {
  try {
    const response = await axios.get(`${API_URL}/queues`);
    return response.data;
  } catch (error) {
    console.error('Error fetching queues:', error);
    throw error;
  }
};

// services/api.js
export const getDoctors = async () => {
    return [
      { id: 1, name: "Dr. Andi", specialization: "Jantung", schedule: "08:00-15:00" },
      { id: 2, name: "Dr. Budi", specialization: "Mata", schedule: "10:00-17:00" },
      { id: 3, name: "Dr. Sule", specialization: "Kulit", schedule: "10:00-13:00" },
      { id: 4, name: "Dr. Haidar", specialization: "Kandungan", schedule: "07:00-10:00" },
      { id: 5, name: "Dr. Galih", specialization: "Paru", schedule: "12:00-14:00" },
    ];
  };
  
  export const getPatients = async () => {
    return [
      { id: 1, queueNumber: "A001", name: "Budi Santoso", doctor: "Dr. Andi", visitTime: "09:00" },
      { id: 2, queueNumber: "A002", name: "Ani Wijaya", doctor: "Dr. Budi", visitTime: "10:00" }
    ];
  };