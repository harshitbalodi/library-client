import './Header.css';
import { toggleSidebar } from '../../store/sidebarSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleSidebar = () => {
        dispatch(toggleSidebar());
    }
    return (
        <nav className="nav">
            <div className="left-section">
                <div className="menu-logo">
                    <div className="menu-icon" onClick={handleSidebar}>☰</div>
                    <div className="logo" onClick={()=>navigate('/')}>Logo</div>
                </div>
            </div>

            <div className="middle-section">
                <div className="search-bar">
                    <input className='search-input' type="text" placeholder="Search" />
                    <button className='search-btn'>Search</button>
                </div>
            </div>

            <div className="right-section">
                <div className="admin-login">Admin Login</div>
            </div>
        </nav>
    );
};

export default Header;
