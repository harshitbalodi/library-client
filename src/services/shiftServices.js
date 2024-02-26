import axios from 'axios';
const baseUrl = "http://localhost:3000/shift";

const getall = async()=>{
    const response = await axios.get(baseUrl);
    return response;
}

export const addShift = async(ShiftObj)=>{
    const response = await axios.post(baseUrl, ShiftObj);
    return response;
}
export default {getall, addShift};