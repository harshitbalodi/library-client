import axiosInstance from "./axios";

const getall = async () => {
  const response = await axiosInstance.get("/desk");
  return response;
};

const updateDesk = async (id, deskObj) => {
  const response = await axiosInstance.patch(`/desk/${id}`, deskObj);
  return response;
};
export default { getall, updateDesk };
