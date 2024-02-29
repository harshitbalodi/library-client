let token = null;
const setToken =(newToken)=>{
    if(newToken) token = `Bearer ${newToken}`
}
const getToken = ()=>{
    if(!token) return null;
    return {Authrization:token}
}

export default {setToken, getToken};