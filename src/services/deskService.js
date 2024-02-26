import axios from "axios";
//for development
const baseUrl="http://localhost:3000/desk";
//for testing
// const baseUrl = "https://fc5b-14-98-209-142.ngrok-free.app/v1/api/desk";
const getall = async() =>{
    const response =await axios.get(baseUrl);
    console.log("response from api/desk",response.data);
    return response;

    // let headersList = {
    //     "Accept": "/",
    //     "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    // };
    
    // const response =await fetch("https://fc5b-14-98-209-142.ngrok-free.app/v1/api/desk", {
    //     method: "GET",
    //     headers: headersList
    // }).then( (response)=> {
    //     return response.json()
    //   })
    //   .then((response) =>{
    //     console.log(response); 
    //     return response;
    // })
    // response.json().then(data=> console.log(data));
    // return response;
}
export default {getall};