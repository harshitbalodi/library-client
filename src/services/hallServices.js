import axios from "axios";
const baseUrl = "https://lms-umd5.onrender.com/v1/api/hall";

const getall = async () => {
  const response = await axios.get(baseUrl);
  return response;
};
const Addhall = async (hallName) => {
  const response = await axios.post(baseUrl, { name: hallName });
  return response;
};
const deleteHall = async (id) => {
  const response = await axios.delete(baseUrl + `/${id}`);
  return response;
};

const editHall = async (id, hallObj) => {
  const response = await axios.patch(baseUrl + `/${id}`, hallObj);
  return response;
};

export default { getall, Addhall, deleteHall, editHall};
