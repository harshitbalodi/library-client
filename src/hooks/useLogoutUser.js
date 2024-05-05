import { useDispatch } from "react-redux";
import { logOut } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../utils/helper";
import token from "../services/token";


const useLogoutUser = () => {  
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {  
        dispatch(logOut());
        setCookie("refresh", "null", 0);
    localStorage.removeItem("username");
    token.logout();
        navigate('/');
    }
    return logout;
}

export default useLogoutUser