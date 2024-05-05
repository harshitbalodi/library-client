import axiosInstance from "./axios";

const getall = async () => {
  try {
    const response = await axiosInstance.get('/hall');
    return response;
  } catch (error) {
    console.log("error in fetching halls", error);
    throw error;
  }
};
const Addhall = async (hallName) => {
  try {
    const response = await axiosInstance.post('/hall',{ name: hallName });
    console.log(response);
    return response;
  } catch (error) {
    console.log("error in adding hall", error);
    throw error;
  }
};

const deleteHall = async (id) => {
  try {
    const response = await axiosInstance.delete(`/hall/${id}`);
    return response;
  } catch (error) {
    console.log("error in deleting hall", error);
    throw error;
  }
};

const editHall = async (id, hallObj) => {
  try {
    const response = await axiosInstance.patch(`/hall/${id}`, hallObj); 
    return response;
  } catch (error) {
    console.log("error in editing hall", error);
    throw error;
  }
};

export default { getall, Addhall, deleteHall, editHall };
