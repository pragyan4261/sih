import axios from 'axios';

const API_URL = 'http://192.168.56.1:5000/api'; // Update this URL if your backend is hosted elsewhere

export const getShifts = async () => {
  try {
    const response = await axios.get(`${API_URL}/shifts`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shifts:', error);
    throw error;
  }
};

export const createShift = async (shiftData) => {
  try {
    const response = await axios.post(`${API_URL}/shifts`, shiftData);
    return response.data;
  } catch (error) {
    console.error('Error creating shift:', error);
    throw error;
  }
};

export const getShiftById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/shifts/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching shift:', error);
    throw error;
  }
};

// Registration function
// export const registerUser = async (userData) => {
//   try {
//     const response = await axios.post(`${API_URL}/register`, userData);
//     return response.data;
//   } catch (error) {
//     console.error('Error registering user:', error);
//     throw error;
//   }
// };