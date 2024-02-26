import './LoginPage.css'

const LoginPage = () => {
  return (
    <div className='login-wrapper'>
      <div className="login-container">
        <div>
            <label htmlFor="name">name</label>
            <input type="text" placeholder="Admin name" name="name" id="name"/>
        </div>
        <div>
            <label htmlFor="password"> Password</label>
            <input type="password" placeholder="type your password" name="password" id="password"/>
        </div>
        <div>
            <button type="submit">Login</button>
        </div>
    </div>
    </div>
    
  )
}

export default LoginPage