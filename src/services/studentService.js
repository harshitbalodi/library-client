import axios from "axios";
const baseUrl ="https://lms-umd5.onrender.com/v1/api/student";
const getall = async ()=>{
    const response =await axios.get(baseUrl);
    console.log(response);
    return response;
}

export default {getall};