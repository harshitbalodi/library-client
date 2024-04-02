import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/token";

const loginUser = async (userObj) => {
  console.log(userObj);
  const response = await axios.post(baseUrl, userObj);
  return response;
};

const authenticateUser = async (token) => {
  const response = await axios.post(baseUrl + "/refresh", { refresh: token });
  return response;
};

export default { loginUser, authenticateUser };
