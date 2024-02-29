import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenuIcon from '../../assets/hamburger-menu.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSidebarInvisible, setSidebarVisible } from '../../store/SidebarSlice';

const Header = () => {
    const navigate = useNavigate();
    const sidebar = useSelector(state => state.sidebar);
    const [isMenuLogo, setIsMenuLogo] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const isActive = location.pathname === "/login";
    console.log(isActive); 
    useEffect(() => {
        const handleResize = () => {
            setIsMenuLogo(window.innerWidth > 480);
            if (window.innerWidth > 480) {
                dispatch(setSidebarVisible());
            } else {
                dispatch(setSidebarInvisible());
            }
        }
        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])
    const handleClick = () => {
        console.log("clicked");
        if (sidebar) {
            dispatch(setSidebarInvisible());
        } else {
            dispatch(setSidebarVisible());
        }
    }
    return (
        <nav className="header">
            <div className="left-section">
                <div className="menu-logo">
                    {!isMenuLogo && <img src={HamburgerMenuIcon} alt="" onClick={handleClick} className='menu-icon' />}
                    <div className="logo" onClick={() => navigate('/')}>Logo</div>
                </div>
            </div>
            <div className="right-section">
                {!isActive && <Link to='/login' className="admin-login">
                    <button className='login-btn'>Admin Login</button>
                </Link>}
            </div>
        </nav>
    );
};

export default Header;
