import axios from "axios";
const baseUrl = "https://lms-umd5.onrender.com/v1/api/student";
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

// const createStudent = async (formData, studentObj) => {
//   try {
//     const config = {
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     };
//     const response = await axios.post(baseUrl, formData, config, {
//       ...studentObj
//     });
//     return response;
//   } catch (error) {
//     console.error('Error creating student:', error);
//     throw error;
//   }
// }

const createStudent = async (studentObj) => {
  try {
    // const config = {
    //   headers: {
    //     'Content-Type': 'multipart/form-data'
    //   }
    // };
    // const response = await axios.post(baseUrl, formData, config);
    const response = await axios.post(baseUrl, studentObj);
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

// const updateStudentImage = async (id, formData) => {
//   try {
//     const config = {
//       headers: {
//         "Content-Type": "multipart/form-data",
//       },
//     };
//     const response = await axios.patch(baseUrl + "/" + id, formData, config);
//     return response;
//   } catch (error) {
//     console.log("error updating student image", error);
//     throw error;
//   }
// }
export default { getall, createStudent, updateStudent };
