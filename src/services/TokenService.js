import axiosInstance from "./axios";

const loginUser = async (userObj) => {
  console.log(userObj);
  const response = await axiosInstance.post("/token", userObj);
  return response;
};

const authenticateUser = async (token) => {
  const response = await axiosInstance.post("/token/refresh", { refresh: token });
  return response;
};

export default { loginUser, authenticateUser };
