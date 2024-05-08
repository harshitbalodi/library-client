/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HallIcon from '../../assets/SvgComponents/HallIcon';
import DashboardIcon from '../../assets/SvgComponents/DashboardIcon';
import RupeeIcon from '../../assets/SvgComponents/RupeeIcon'

const SidebarLink = ({ to, Icon, label }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
      <Link to={to} className={`sidebar-link ${isActive ? 'active' : ''}`}>
        <Icon width={24} height={24} fill={isActive ? '#FF8C00' : '#0a0f45'}/>
        <span className='sidebar-label'>{label}</span>
      </Link>
    );
};

const Sidebar = () => {
    const sidebar = useSelector(state => state.sidebar);
    console.log("sidebar",sidebar);
    return sidebar && (
      <div className="sidebar">
        <div className='application-icon'>
          <h3>LibraryApp</h3>
        </div>
        <SidebarLink to="/" Icon={DashboardIcon} label="Dashboard" />
        <SidebarLink to="/hall" Icon={HallIcon} label="Halls" />
        <SidebarLink to="/payments" Icon={RupeeIcon} label="Payments"/>
      </div>
    );
  };
  
  export default Sidebar;