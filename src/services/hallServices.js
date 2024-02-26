import axios from "axios";
// const baseUrl ="http://localhost:3000/hall";
const baseUrl = "https://fc5b-14-98-209-142.ngrok-free.app/v1/api/hall"
const getall = async ()=>{
    const response =await axios.get(baseUrl);
    return response;
}

export default {getall};