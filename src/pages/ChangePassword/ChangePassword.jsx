import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import './ChangePassword.css';
import PasswordService from "../../services/PasswordService";
import useLogoutUser from "../../hooks/useLogoutUser";
import { setSuccessMessage, setErrorMessage as setErrorMessageThunk } from "../../store/notificationSlice";
import { Form, Input, Button } from "antd"; // Updated imports for Form and Input

const ChangePassword = () => {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const logoutUser = useLogoutUser();
  const dispatch = useDispatch();

  console.log("password", password, "cpassword", cpassword);
  console.log("old password", oldPassword);
  console.log(auth);

  const username = localStorage.getItem('username');

  if (!username) {
    logoutUser();
  }

  useEffect(() => {
    if (!auth.adminLoggedIn) navigate('/');
  }, [auth]);

  useEffect(() => {
    if (errorMessage) setErrorMessage('');
  }, [oldPassword, password, cpassword])

  const handleChangePassword = async (e) => {
    e.preventDefault();
    console.log(username, oldPassword, password, cpassword);
    console.log("submit clicked");
    if (cpassword !== password) {
      setErrorMessage('New password and confirm password should be same');
      return;
    }

    const userObj = {
      username,
      old_password: oldPassword,
      password,
      cpassword
    };

    try {
      const response = await PasswordService.changePassword(userObj);
      console.log(response);
      dispatch(setSuccessMessage("Password changed successfully"));
      logoutUser();
    } catch (error) {
      console.error(error);
      if (error?.response?.status === 401) {
        logoutUser();
        dispatch(setErrorMessageThunk("Your session has expired. Please login again."));
      } else if (error?.response?.data?.detail) {
        setErrorMessage("Error: " + error?.response?.data?.detail);
      }
    }
  }

  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h1>Update Password</h1>
        <form onSubmit={handleChangePassword}>
          <Form.Item
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              id='current-password'
              placeholder="Enter old password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              id='new-password'
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              id="cpassword"
              placeholder="Confirm new password"
              value={cpassword}
              onChange={(e) => setCPassword(e.target.value)}
            />
          </Form.Item>
          <p style={{ color: "red" }}>
            {errorMessage}
          </p>
          <div>
            <Button type="primary" htmlType="submit">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePassword;
