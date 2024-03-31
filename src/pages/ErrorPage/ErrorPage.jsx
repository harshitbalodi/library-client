import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import './ErrorPage.css';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="error-container">
      <h2>path does not found</h2>
      <Button onclick={()=>navigate('/')}>
         Go to Home  
      </Button>  
    </div>
  )
}

export default ErrorPage