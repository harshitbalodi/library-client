import axios from "axios";
import token from "./token";
const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/change_password";

const changePassword = async (userObj) => {
  try {
    const Bearertoken = token.getToken();
    const config = {
      headers: Bearertoken,
    };
    console.log(config);
    const response = await axios.patch(baseUrl, userObj, config);
    return response;
  } catch (error) {
    console.log("error in changing password", error);
    throw error;
  }
};

export default { changePassword };
