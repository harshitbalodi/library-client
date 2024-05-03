import axios from "axios";
import TokenService from "./TokenService";
import { logOut } from "../store/authSlice";
const BASE_URL = import.meta.env.VITE_BACKEND_API_URL + "/v1/api/desk";
import token from "./token";
import { getCookie, setCookie } from "../utils/helper";
import { useDispatch } from "react-redux";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
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
      prevRequest.headers[
        "Authorization"
      ] = `Bearer ${newAccessToken.data.access}`;
      return axiosInstance(prevRequest);
    }
    const dispatch = useDispatch();
    dispatch(logOut());
    setCookie("refresh", "null", 0);
    localStorage.removeItem("username");
    token.logout();
    return Promise.reject(error);
  }
);

export default axiosInstance;

