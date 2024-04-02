import axios from "axios";
import token from "./token";
const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/desk";

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
