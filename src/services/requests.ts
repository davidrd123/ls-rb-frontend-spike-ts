import axios from 'axios'
import { apiBaseUrl } from '../constants';
import { Request } from '../types';

export const getAllRequests = async () => {
  try {
    const response = await axios.get(`${apiBaseUrl}/requests`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all requests:", error);
    throw error;
  }
}

// Returns a Promise that resolves to a Request object
export const getRequestById : (id: string) => Promise<Request> = async (id: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/requests/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching request with id ${id}:`, error);
    throw error;
  }
}

// Delete a request
export const removeRequest = async (id: string) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/requests/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting request with id ${id}:`, error);
    throw error;
  }
};
