import axios from "axios";
// const baseUrl ="http://localhost:3000/hall";
const baseUrl = "https://lms-umd5.onrender.com/v1/api/hall"
const getall = async ()=>{
    const response =await axios.get(baseUrl);
    return response;
}

export default {getall};