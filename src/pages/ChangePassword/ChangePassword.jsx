import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './ChangePassword.css';
import PasswordService from "../../services/PasswordService";
import useLogoutUser from "../../hooks/useLogoutUser";
import { setSuccessMessage, setErrorMessage as setErrorMessageThunk } from "../../store/notificationSlice";

const ChangePassword = () => {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const logoutUser = useLogoutUser();
  const dispatch = useDispatch();

  console.log(auth);

  const username = localStorage.getItem('username');
 
  if(!username){
    logoutUser();
  }

  useEffect(() => {
    if (!auth.adminLoggedIn) navigate('/');
  }, [auth]);

  useEffect(() => {
    if (errorMessage) setErrorMessage('');
  }, [username, oldPassword, password, cpassword])


  const handleChangePassword = async (e) => {
    e.preventDefault();
    const userObj = {
      username,
      old_password: oldPassword,
      password,
      cpassword
    }
    console.log(userObj);
    if (cpassword != password) {
      setErrorMessage('new password and confirm password should be same')
      return;
    }

    try {
      const response = await PasswordService.changePassword(userObj);
      console.log(response);
      dispatch(setSuccessMessage("Password changed successfully"));
      logoutUser();
    } catch (error) {
      console.error(error);
      if(error?.response?.status === 401){
        logoutUser();
        dispatch(setErrorMessageThunk("Your session has expired. Please login again."));
      }else if(error?.response?.data?.detail){
        setErrorMessage("Error: " + error?.response?.data?.detail)
      }
    }
  }
  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h1>Update Password</h1>
        <form onSubmit={handleChangePassword}>
          {/* <div>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" required />
          </div> */}
          <div>
            <label htmlFor="old-password">Current password</label>
            <input type="password" placeholder="Enter password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} id="old-password" required />
          </div>
          <div>
            <label htmlFor="new-password">New password</label>
            <input type="password" placeholder="Enter new username" value={password} onChange={(e) => setPassword(e.target.value)} id="new-password" required />
          </div>
          <div>
            <label htmlFor="cpassword">Confirm password</label>
            <input type="password" placeholder="confirm new password" value={cpassword} onChange={(e) => setCPassword(e.target.value)} id="cpassword" required />
          </div>
          <p style={{ color: "red" }}>
            {errorMessage}
          </p>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword