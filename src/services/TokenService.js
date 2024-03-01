import axios from "axios";
const baseUrl = 'https://lms-umd5.onrender.com/v1/api/token';

 const loginUser=async(userObj)=>{
    console.log(userObj);
    const response = await axios.post(baseUrl, userObj,{mode:'cors'});
    localStorage.setItem('refreshToken',response.data.refresh);
    console.log("response",response);
    return response;
}

 const authenticateUser = async (token)=>{
    const response = await axios.post(baseUrl+'/refresh',{refresh:token});
    return response;
 }

 export default {loginUser, authenticateUser}