import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/token";
import axiosInstance from "./axios";

const loginUser = async (userObj) => {
  console.log(userObj);
  // const response = await axios.post(baseUrl, userObj);
  const response = await axiosInstance.post("/token", userObj);
  return response;
};

const authenticateUser = async (token) => {
  const response = await axios.post(baseUrl + "/refresh", { refresh: token });
  return response;
};

export default { loginUser, authenticateUser };
