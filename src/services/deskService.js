import axios from "axios";
import token from "./token";
const baseUrl = "https://lms-umd5.onrender.com/v1/api/desk";

const getall = async () => {
  const config = {
    headers: token.getToken()
  }
  const response = await axios.get(baseUrl, config);
  return response;
};

const updateDesk = async (id, deskObj) => {
  const config = {
    headers: token.getToken()
  }

  const response = await axios.patch(baseUrl + `/${id}`, deskObj,config);
  return response;
};
export default { getall, updateDesk };
