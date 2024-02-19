import axios from "axios";
const baseUrl ="http://localhost:3000/hall";
const getall = async ()=>{
    const response =await axios.get(baseUrl);
    return response;
}

export default {getall};