import axiosInstance from "./axios";

const getall = async () => {
  try {
    const response = await axiosInstance.get("/student");
    return response;
  } catch (error) {
    console.log("error fetching students");
    throw error;
  }
};

const createStudent = async (studentObj) => {
  try {
    const config = {
      "Content-Type": "multipart/form-data"
    };
    const response = await axiosInstance.post("/student", studentObj, config);
    return response;
  } catch (error) {
    console.error("Error creating student:", error);
    throw error;
  }
};

const updateStudent = async (id, formData) => {
  try {
    const config = {
      "Content-Type": "multipart/form-data"
    };
    const response = await axiosInstance.patch(`/student/${id}`, formData, config);
    return response;
  } catch (error) {
    console.log("error updating student", error);
    throw error;
  }
};

const deleteStudent = async(id)=>{
  try{
    const response = await axiosInstance.delete(`/student/${id}`);
    return response;
  }catch(error){
    console.log("error deleting student", error);
    throw error;
  }
}

export default { getall, createStudent, updateStudent, deleteStudent};
