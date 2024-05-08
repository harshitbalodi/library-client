/* eslint-disable react/prop-types */
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HallIcon from '../../assets/SvgComponents/HallIcon';
import DashboardIcon from '../../assets/SvgComponents/DashboardIcon';
import RupeeIcon from '../../assets/SvgComponents/RupeeIcon'
// import CloseIcon from '../../assets/cross-icon.svg';
import { useDispatch } from 'react-redux';
import { setSidebarInvisible, setSidebarVisible, toggleSidebar } from '../../store/SidebarSlice';
import { useEffect } from 'react';

const SidebarLink = ({ to, Icon, label }) => {
  const location = useLocation();
  const isActive = location.pathname === to;
  return (
    <Link to={to} className={`sidebar-link ${isActive ? 'active' : ''}`}>
      <Icon width={24} height={24} fill={isActive ? '#FF8C00' : '#0a0f45'} />
      <span className='sidebar-label'>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  //     const sidebar = useSelector(state => state.sidebar);

  //     return sidebar && (
  //       <div className="sidebar">
  //         <div className='application-icon'>
  //           <h3>LibraryApp</h3>
  //         </div>
  //         <SidebarLink to="/" Icon={DashboardIcon} label="Dashboard" />
  //         <SidebarLink to="/hall" Icon={HallIcon} label="Halls" />
  //         <SidebarLink to="/payments" Icon={RupeeIcon} label="Payments"/>
  //       </div>
  //     );

  const navigate = useNavigate();
  useEffect(()=>{
   const handleInnerWidth = () =>{
      const width = window.innerWidth;
      if(width > 600){
        dispatch(setSidebarVisible());
      }else{
        dispatch(setSidebarInvisible());
      }
   }
   window.addEventListener('resize',handleInnerWidth)
   return ()=>{
    window.removeEventListener('resize',handleInnerWidth);
   }
  })

  const sidebar = useSelector(state => state.sidebar);
  const dispatch = useDispatch();

  console.log("sidebar", sidebar);

  return sidebar && (
    <div 
    className='sidebar-container'
    onClick={() => dispatch(toggleSidebar())}
    >
      <div
        className={`sidebar ${sidebar ? 'active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className='sidebar-header' onClick={()=>navigate('/')}>
          <h3 className='application-icon'>LibraryApp</h3>
        </div>
        {/* <button 
          className="toggle-button" 
          onClick={() => dispatch(toggleSidebar())}
          >
            {sidebar && <img width={24} src={CloseIcon} alt="" />}
          </button> */}
        {/* <div className='sidebar-content'> */}
        <SidebarLink to="/" Icon={DashboardIcon} label="Dashboard" />
        <SidebarLink to="/hall" Icon={HallIcon} label="Halls" />
        <SidebarLink to="/payments" Icon={RupeeIcon} label="Payments" />
        {/* </div> */}
      </div>
    </div>
  );
};

export default Sidebar;