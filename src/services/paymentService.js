const baseUrl = "https://lms-umd5.onrender.com/v1/api/payment";
import axios from "axios";
import token from "./token";

const updatePayment = async (studentId, month) => {
  try {
    const config = {
      header: token.getToken(),
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

export default { updatePayment };
