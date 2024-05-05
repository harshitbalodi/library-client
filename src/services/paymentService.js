import axiosInstance from "./axios";
const updatePayment = async (studentId, month) => {
  try {
    const payload = { student: studentId, paid_for_month: month };
    const response = await axiosInstance.post("/payment", payload);
    return response;
  } catch (error) {
    console.log("error in updating payment", error);
    throw error;
  }
};

const getAllPayments = async () =>{
  try {
    const response = await axiosInstance.get("/payment");
    return response;
  } catch (error) {
    console.log("error in fetching payments", error);
    throw error;
  }
}

export default { updatePayment, getAllPayments };
