const baseUrl = import.meta.env.VITE_BACKEND_API_URL+"/v1/api/payment";
import axios from "axios";
import token from "./token";

const updatePayment = async (studentId, month) => {
  try {
    const config = {
      headers: token.getToken(),
    };
    const response = await axios.post(
      baseUrl,
      { student: studentId, paid_for_month: month },
      config
    );
    return response;
  } catch (error) {
    console.log("error in updating payment", error);
    throw error;
  }
};

const getAllPayments = async () =>{
  try {
    const config = {
      headers: token.getToken(),
    };
    const response = await axios.get(baseUrl, config);
    return response;
  } catch (error) {
    console.log("error in fetching payments", error);
    throw error;
  }
}

export default { updatePayment, getAllPayments };
