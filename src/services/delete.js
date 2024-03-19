import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const deleteData = async (_id) => {
  try {
    const deleteResponse = await axios.delete(`${API_URL}/${_id}`);
    return deleteResponse.data;
  } catch (error) {
    console.error(`Error deleting task with ID ${_id}:`, error);
    throw error;
  }
};