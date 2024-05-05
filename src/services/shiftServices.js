import axiosInstance from "./axios";

const getall = async () => {
  try {
    const response = await axiosInstance.get("/shift");
    return response;
  } catch (error) {
    console.log("error in fetching shifts", error);
    throw error;
  }
};

const addShift = async (ShiftObj) => {
  try {
    const response = await axiosInstance.post("/shift", ShiftObj);
    return response;
  } catch (error) {
    console.log("error in adding shift", error);
    throw error;
  }
};

export const deleteShift = async (id) => {
  try {
    const response = axiosInstance.delete(`/shift/${id}`);
    return response;
  } catch (error) {
    console.log("error in deleting shift", error);
    throw error;
  }
};
export const updateShift = async (id, shiftObj) => {
  try {
    const response = await axiosInstance.patch(`/shift/${id}`, shiftObj);
    return response;
  } catch (error) {
    console.log("error in editing shift", error);
    throw error;
  }
};

export default { getall, addShift, deleteShift, updateShift };
