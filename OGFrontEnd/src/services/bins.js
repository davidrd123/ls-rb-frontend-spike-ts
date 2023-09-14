import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/bins' // Proxying to http://localhost:3001/api/bins
import { Bin } from '../types';

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bins:", error);
    throw error;
  }
};

const getOne = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bin with id ${id}:`, error);
    throw error;
  }
};

const create = async (newObject) => {
  try {
    const response = await axios.post(baseUrl, newObject);
    return response.data;
  } catch (error) {
    console.error("Error creating new bin:", error);
    throw error;
  }
};

const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bin with id ${id}:`, error);
    throw error;
  }
};

const getRequestsByBinId = async (binId) => {
  try {
    console.log(`getRequestsByBinId - fetching requests for bin ${binId}`)
    const response = await axios.get(`${baseUrl}/${binId}/requests`);
    console.log(`getRequestsByBinId - fetched ${response.data.length} requests for bin ${binId}`)
    return response.data;
  } catch (error) {
    console.error(`Error fetching requests for bin ${binId}:`, error);
    throw error;
  }
};

export default { 
  getAll, 
  getOne, 
  create, 
  remove, 
  getRequestsByBinId
};
