import axios from 'axios'
import { apiBaseUrl } from '../constants';
import { Bin, NewBin, Request } from '../types';

export const getAllBins: () => Promise<Bin[]> = async () => {
  try {
    //  destructure and add typing to response
    // const response = await axios.get<Bin[]>(`${apiBaseUrl}/bins`);
    const response = await axios.get<Bin[]>(`${apiBaseUrl}/bins`);
    return response.data;
  } catch (error) {
    console.error("Error fetching all bins:", error);
    throw error;
  }
};

export const getOneBin = async (binPath: string) => {
  try {
    const response = await axios.get(`${apiBaseUrl}/bins/${binPath}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching bin with path ${binPath}:`, error);
    throw error;
  }
};

export const createNewBin = async () => {
  try {
    const response = await axios.post(`${apiBaseUrl}/bins`);
    return response.data;
  } catch (error) {
    console.error("Error creating new bin:", error);
    throw error;
  }
};

export const removeBin = async (binPath: string) => {
  try {
    const response = await axios.delete(`${apiBaseUrl}/bins/${binPath}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting bin with path ${binPath}:`, error);
    throw error;
  }
};

export const getRequestsByBinPath = async (binPath: string) => {
  try {
    console.log(`getRequestsByBinPath - fetching requests for bin ${binPath}`)
    const response = await axios.get(`${apiBaseUrl}/bins/${binPath}/requests`);
    console.log(`getRequestsByBinPath - fetched ${response.data.length} requests for bin ${binPath}`)
    return response.data;
  } catch (error) {
    console.error(`Error fetching requests for bin ${binPath}:`, error);
    throw error;
  }
};
