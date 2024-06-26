import './Login.css';
import Form from 'antd/es/form/Form';
import Item from 'antd/es/list/Item';
import Input from 'antd/es/input/Input';
import Password from 'antd/es/input/Password';
import { Button } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import TokenService from '../../services/TokenService';
import token from '../../services/token';
import { setCookie } from '../../utils/helper';
import { logIn } from '../../store/authSlice';

const Login= () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    console.log("username", username, "password", password);

    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(username, password);
        try {
            const response = await TokenService.loginUser({ username, password });
            console.log(response);
            setCookie("refresh", response.data.refresh, 7);
            dispatch(logIn());
            localStorage.setItem('username', username);
            token.setToken(response.data.access);
            setUsername('');
            setPassword('');
        } catch (error) {
            console.error(error);
            if (error?.response?.data?.detail) {
                setErrorMessage(error?.response?.data?.detail);
                setTimeout(() => setErrorMessage(''), 5000);
            }
        }
    }
    return (
        <div className="login-page">
            <div className="login-box">

                <Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onSubmit={handleLogin}
                >
                    <p className="form-title">Welcome back</p>
                    <p>Login to the Dashboard</p>
                    <Item
                        id='username'
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Item>

                    <Item
                        id='password'
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Password
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Item>
                    <p style={{ color: "red" }}>
                        {errorMessage}
                    </p>
                    <Item>
                        <Button type="primary" onClick={handleLogin} htmlType="submit" className="login-form-button">
                            LOGIN
                        </Button>
                    </Item>
                </Form>
                <div className="illustration-wrapper">
                    <img src="https://mixkit.imgix.net/art/preview/mixkit-left-handed-man-sitting-at-a-table-writing-in-a-notebook-27-original-large.png?q=80&auto=format%2Ccompress&h=700" alt="Login" />
                </div>
            </div>
        </div>
    );
};

export default Login;