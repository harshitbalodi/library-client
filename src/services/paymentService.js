const baseUrl = "https://lms-umd5.onrender.com/v1/api/payment";
import axios from "axios";

const updatePayment = async (studentId, month) => {
    const response = await axios.post(baseUrl, {student:studentId, paid_for_month:month });
    return response;
};

export default {updatePayment};