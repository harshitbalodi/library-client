import axios from "axios";
const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/student";
import token from "./token";

const getall = async () => {
  try {
    const config = {
      header: token.getToken(),
    };
    const response = await axios.get(baseUrl, config);
    return response;
  } catch (error) {
    console.log("error fetching students");
    throw error;
  }
};

const createStudent = async (studentObj) => {
  try {
    const config = {
      header: token.getToken(),
      "Content-Type": "multipart/form-data"
    };
    const response = await axios.post(baseUrl, studentObj, config);
    return response;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

const updateStudent = async (id, formData) => {
  try {
    const config = {
      header: token.getToken(),
      "Content-Type": "multipart/form-data"
    };
    const response = await axios.patch(baseUrl + "/" + id, formData, config);
    return response;
  } catch (error) {
    console.log("error updating student", error);
    throw error;
  }
};

export default { getall, createStudent, updateStudent };
