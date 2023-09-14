import axios from 'axios'
const baseUrl = 'http://localhost:3001/api/requests' // Proxying to http://localhost:3001/api/requests

const getAll = async () => {
  try {
    const response = await axios.get(baseUrl);
    return response.data;
  } catch (error) {
    console.error("Error fetching all requests:", error);
    throw error;
  }
}

const getOne = async (id) => {
  try {
    const response = await axios.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching request with id ${id}:`, error);
    throw error;
  }
}

// Delete a request
const remove = async (id) => {
  try {
    const response = await axios.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting request with id ${id}:`, error);
    throw error;
  }
};

export default { getAll, getOne, remove };