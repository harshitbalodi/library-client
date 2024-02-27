import axios from "axios";
//for development
// const baseUrl="http://localhost:3000/desk";
//for testing
const baseUrl = "https://lms-umd5.onrender.com/v1/api/desk";
const getall = async() =>{
   const response =await axios.get(baseUrl);
    console.log(response);
    return response;
}
export default {getall};