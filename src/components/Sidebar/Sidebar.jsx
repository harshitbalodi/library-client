import { Link } from 'react-router-dom';
import './Sidebar.css';
import HomeLogo from '../../assets/home-icon.svg';
import DashboardLogo from '../../assets/dashboard-icon.svg';
import ShiftLogo from '../../assets/shift-icon.svg'
import HallLogo from '../../assets/hall-icon.svg'
import { useLocation } from 'react-router-dom';

const SidebarLink = ({ to, icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`sidebar-link ${isActive ? 'active' : ''}`}>
        <img src={icon} alt={`${label}-icon`} />
        <div>{label}</div>
      </Link>
    );
};

const Sidebar = () => {
    return (
      <div className="sidebar">
        <SidebarLink to="/" icon={HomeLogo} label="Home" />
        <SidebarLink to="/dashboard" icon={DashboardLogo} label="Dashboard" />
        <SidebarLink to="/shift" icon={ShiftLogo} label="Shifts" />
        <SidebarLink to="/hall" icon={HallLogo} label="Halls" />
      </div>
    );
  };
  
  export default Sidebar;