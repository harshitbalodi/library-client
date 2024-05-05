import axiosInstance from "./axios";

const changePassword = async (userObj) => {
  try {
    const response = await axiosInstance.patch("/change_password", userObj);
    return response;
  } catch (error) {
    console.log("error in changing password", error);
    throw error;
  }
};

export default { changePassword };
