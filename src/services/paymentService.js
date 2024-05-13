import axiosInstance from "./axios";
const updatePayment = async (studentId, month, paymentMethod) => {
  try {
    const payload = { student: Number(studentId), paid_for_month: month, payment_method: paymentMethod };
    const response = await axiosInstance.post("/payment", payload);
    return response;
  } catch (error) {
    console.log("error in updating payment", error);
    throw error;
  }
};

const getAllPayments = async (controller) =>{
  try {
    const response = await axiosInstance.get("/payment", { signal: controller?.signal });
    return response;
  } catch (error) {
    console.log("error in fetching payments", error);
    throw error;
  }
}

export default { updatePayment, getAllPayments };
