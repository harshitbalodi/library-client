import './Header.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import HamburgerMenuIcon from '../../assets/hamburger-menu.svg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { setSidebarInvisible, setSidebarVisible } from '../../store/SidebarSlice';
import ArrowDown from '../../assets/arrow-down-black.svg';
import { logOut } from '../../store/authSlice';
import NoDp from '../../assets/no-dp.jpg';
import { setCookie } from '../../utils/helper';

const Header = () => {
    const navigate = useNavigate();
    const [sidebar, auth] = useSelector(state => [state.sidebar, state.auth]);
    const [isMenuLogo, setIsMenuLogo] = useState(false);
    const dispatch = useDispatch();
    const location = useLocation();
    const isActive = location.pathname === "/login";
    const [isOpen, setIsOpen] = useState(false);

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
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = () => {
        console.log('Logout clicked');
        dispatch(logOut());
        setCookie("refresh", "null", 0);
    };


    return (
        <nav className="header">
            <div className="left-section">
                <div className="menu-logo">
                    {!isMenuLogo && <img src={HamburgerMenuIcon} alt="" onClick={handleClick} className='menu-icon' />}
                    <div className="logo" onClick={() => navigate('/')}>Logo</div>
                </div>
            </div>
            <div className="right-section">
                {!auth.adminLoggedIn ? (!isActive && <Link to='/login' className="admin-login">
                    <button className='login-btn'>Admin Login</button>
                </Link>) :
                    <div className="dropdown-container">
                        <button className='dropdown-button' onClick={toggleDropdown}><img className='dp-img' src={NoDp} alt="" /> <img src={ArrowDown} className='dropdown-img' alt="" /></button>
                        {isOpen && (
                            <ul className="dropdown-menu">
                                <li onClick={() => navigate('/change-password')}>Change password</li>
                                <li onClick={handleLogout}>Logout</li>
                            </ul>
                        )}
                    </div>
                }
            </div>
        </nav>
    );
};

export default Header;
