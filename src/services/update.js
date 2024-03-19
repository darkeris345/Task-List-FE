import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

export const updateData = async (_id, data) => {
  const response = await axios.patch(`${API_URL}/${_id}`, data);
  console.log(response.data);
  
  return response.data;
};