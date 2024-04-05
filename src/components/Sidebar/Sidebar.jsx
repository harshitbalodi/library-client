/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Sidebar.css';
import DashboardIcon from '../../assets/dashboard-icon.svg';
import HallIcon from '../../assets/hall-icon.svg'
import Rupeeicon from '../../assets/rupee-icon.svg';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

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
    const sidebar = useSelector(state => state.sidebar);
    console.log(sidebar);
    return sidebar && (
      <div className="sidebar">
        <SidebarLink to="/" icon={DashboardIcon} label="Dashboard" />
        <SidebarLink to="/hall" icon={HallIcon} label="Halls" />
        <SidebarLink to="/payments" icon={Rupeeicon} label="Payments"/>
      </div>
    );
  };
  
  export default Sidebar;