import axios from "axios";
import TokenService from "./TokenService";
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL + "/v1/api";
import token from "./token";
import { getCookie } from "../utils/helper";


const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = token.getToken();
    if (accessToken && !config.headers.Authorization) {
      config.headers = accessToken;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const prevRequest = error?.config;
    if (error?.response?.status === 401 && !prevRequest?.sent) {
      prevRequest.sent = true;
      const refreshtoken = getCookie("refresh");
      if (!refreshtoken) return Promise.reject(error);
      const newAccessToken = await TokenService.authenticateUser(refreshtoken);
      console.log(newAccessToken.data.access);
      token.setToken(newAccessToken.data.access);
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken.data.access}`;
      return axiosInstance(prevRequest);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
