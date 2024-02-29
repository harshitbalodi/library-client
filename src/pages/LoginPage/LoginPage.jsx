import TokenService from '../../services/TokenService';
import './LoginPage.css';

const LoginPage = () => {

  const handleLogin=async(e)=>{
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    console.log(username, password);
    try{
      const response = await TokenService.loginUser({username, password})
      console.log(response);
    }catch(error){
      console.error(error);
    }
    // e.target.username.value='';
    // e.target.password.value='';
  }
  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={(e)=>handleLogin(e)}>
          <div>
            <label htmlFor="name">Username</label>
            <input type="text" placeholder="Enter your username" name="username" id="username" required/>
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="Enter your password" name="password" id="password" required/>
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
