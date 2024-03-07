import axios from "axios";
const baseUrl = "https://lms-umd5.onrender.com/v1/api/shift";
const getall = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const addShift = async (ShiftObj) => {
  const response = await axios.post(baseUrl, ShiftObj);
  return response;
};

export const deleteShift = async (id) => {
  const response = await axios.delete(baseUrl + `/${id}`);
  return response;
};
export const updateShift = async (id, shiftObj) => {
  console.log(id, "inside updateShift function", shiftObj);

  const response = await axios.patch(baseUrl + `/${id}`, shiftObj);
  return response;
};

export default { getall, addShift, deleteShift, updateShift };
