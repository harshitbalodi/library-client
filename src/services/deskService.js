import axios from "axios";
const baseUrl = "https://lms-umd5.onrender.com/v1/api/desk";

const getall = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const updateDesk = async (id, deskObj) => {
  const response = await axios.patch(baseUrl + `/${id}`, deskObj);
  return response;
};
export default { getall, updateDesk };
