import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/hall";
import token from "./token";

const getall = async () => {
  try {
    const config = {
      headers: token.getToken(),
    };
    const response = await axios.get(baseUrl, config);
    return response;
  } catch (error) {
    console.log("error in fetching halls", error);
    throw error;
  }
};
const Addhall = async (hallName) => {
  try {
    const config = {
      headers: token.getToken(),
    };
    const response = await axios.post(baseUrl, { name: hallName }, config);
    return response;
  } catch (error) {
    console.log("error in adding hall", error);
    throw error;
  }
};
const deleteHall = async (id) => {
  try {
    const config = {
      headers: token.getToken(),
    };
    const response = await axios.delete(baseUrl + `/${id}`, config);
    return response;
  } catch (error) {
    console.log("error in deleting hall", error);
    throw error;
  }
};

const editHall = async (id, hallObj) => {
  try {
    const config = {
      headers: token.getToken(),
    };
    const response = await axios.patch(baseUrl + `/${id}`, hallObj, config);
    return response;
  } catch (error) {
    console.log("error in editing hall", error);
    throw error;
  }
};

export default { getall, Addhall, deleteHall, editHall };
