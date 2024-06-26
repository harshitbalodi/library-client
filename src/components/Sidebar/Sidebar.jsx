/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setSidebarInvisible, setSidebarVisible, toggleSidebar } from '../../store/SidebarSlice';
import HallIcon from '../../assets/SvgComponents/HallIcon';
import DashboardIcon from '../../assets/SvgComponents/DashboardIcon';
import RupeeIcon from '../../assets/SvgComponents/RupeeIcon';
import CloseIcon from '../../assets/cross-icon.svg';
import './Sidebar.css';

const SidebarLink = ({ to, Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`sidebar-link ${isActive ? 'active' : ''}`}>
      <Icon width={24} height={24} fill={isActive ? '#FF8C00' : '#0a0f45'} />
      <span className="sidebar-label">{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isCloseIconVisible, setIsCloseIconVisible] = useState(false);
  const sidebar = useSelector(state => state.sidebar);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width > 600) {
        dispatch(setSidebarVisible());
        setIsCloseIconVisible(false);
      } else {
        dispatch(setSidebarInvisible());
        setIsCloseIconVisible(true);
      }
    };
    window.addEventListener('resize', handleResize);

    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return sidebar && (
    <div className="sidebar-container" onClick={() => dispatch(toggleSidebar())}>
      <div className={`sidebar ${sidebar ? 'active' : ''}`} onClick={(e) => e.stopPropagation()}>
        {isCloseIconVisible && (
          <div className="close-icon">
            <img
              src={CloseIcon}
              alt="close-icon"
              onClick={() => dispatch(toggleSidebar())}
            />
          </div>
        )}

        <div className="sticky-sidebar-block">
          <div className="sidebar-header" onClick={() => navigate('/')}>
            <h3 className="application-icon">LibraryApp</h3>
          </div>

          <SidebarLink to="/" Icon={DashboardIcon} label="Dashboard" />
          <SidebarLink to="/hall" Icon={HallIcon} label="Halls" />
          <SidebarLink to="/payments" Icon={RupeeIcon} label="Payments" />
          
         
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
