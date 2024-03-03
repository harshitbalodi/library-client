let token = null;
const setToken =(accessToken)=>{
    if(accessToken) token = `Bearer ${accessToken}`
}
const getToken = ()=>{
    if(!token) return null;
    return {Authorization:token}
}
const logout =()=>{
    token= null;
} 

export default {setToken, getToken, logout};