import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { logOut } from "../../store/authSlice";
import './ChangePassword.css';
import PasswordService from "../../services/PasswordService";
import token from "../../services/token";
import { setCookie } from "../../utils/helper";

const ChangePassword = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (!auth.adminLoggedIn) navigate('/shift');
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
      dispatch(logOut());
      token.logout();
      setCookie("refresh", "null", 0);
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.detail) {
        setErrorMessage(error?.response?.data?.detail);
      }
    }
  }
  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleChangePassword}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)} id="username" required />
          </div>
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