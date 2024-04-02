import { Link } from "react-router-dom"
import Button from "../../components/Button/Button"
import './ErrorPage.css';

const ErrorPage = () => {
  return (
    <div className="error-container">
      <h2>path does not found</h2>
      <Button>
        <Link to='/'> Go to Home </Link> 
      </Button>  
    </div>
  )
}

export default ErrorPage