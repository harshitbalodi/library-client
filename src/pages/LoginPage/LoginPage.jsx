import { useDispatch, useSelector } from 'react-redux';
import TokenService from '../../services/TokenService';
import './LoginPage.css';
import { logIn } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import token from '../../services/token';
import { setCookie } from '../../utils/helper';

const LoginPage = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');

  console.log(auth);

  useEffect(() => {
    if (auth.adminLoggedIn) navigate('/dashboard');
  }, [auth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(username, password);
    try {
      const response = await TokenService.loginUser({ username, password });
      console.log(response);
      setCookie("refresh", response.data.refresh, 7);
      dispatch(logIn());
      token.setToken(response.data.access);
      e.target.username.value = '';
      e.target.password.value = '';
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.detail) {
        setErrorMessage(error?.response?.data?.detail);
        setTimeout(() => setErrorMessage(''), 5000);
      }
    }
  }
  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={(e) => handleLogin(e)}>
          <div>
            <label htmlFor="name">Username</label>
            <input type="text" placeholder="Enter your username" name="username" id="username" required />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your password" name="password" id="password" required />
          </div>
          <p style={{ color: "red" }}>
            {errorMessage}
          </p>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
