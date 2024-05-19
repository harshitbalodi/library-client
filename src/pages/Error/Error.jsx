import {  useNavigate } from "react-router-dom"
import './Error.css';
import '../BookingPage/BookingPage.css';
import { useSelector } from "react-redux";

const Error = () => {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  console.log(auth);
  return (
    <div className="error-container">
      <h3>404! Path does not found</h3>
      <p>Go back to {auth.adminLoggedIn ?<> Dashboard</> :<> Home</>}</p>
      <button className="home-button" onClick={()=>navigate('/')}>
      {auth.adminLoggedIn ?<> Dashboard</> :<> Home</>}
      </button>  
    </div>
  )
}

export default Error;