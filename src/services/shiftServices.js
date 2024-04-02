import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/shift";
import token from "./token";

const getall = async () => {
  try {
    const config = {
      headers: token.getToken(),
    };
    const response = await axios.get(baseUrl, config);
    return response;
  } catch (error) {
    console.log("error in fetching shifts", error);
    throw error;
  }
};

const addShift = async (ShiftObj) => {
  try {
    const config = {
      header: token.getToken(),
    };
    const response = await axios.post(baseUrl, ShiftObj, config);
    return response;
  } catch (error) {
    console.log("error in adding shift", error);
    throw error;
  }
};

export const deleteShift = async (id) => {
  try {
    const config = {
      header: token.getToken(),
    };
    const response = await axios.delete(baseUrl + `/${id}`, config);
    return response;
  } catch (error) {
    console.log("error in deleting shift", error);
    throw error;
  }
};
export const updateShift = async (id, shiftObj) => {
  try {
    const config = {
      header: token.getToken(),
    };
    const response = await axios.patch(baseUrl + `/${id}`, shiftObj, config);
    return response;
  } catch (error) {
    console.log("error in editing shift", error);
    throw error;
  }
};

export default { getall, addShift, deleteShift, updateShift };
