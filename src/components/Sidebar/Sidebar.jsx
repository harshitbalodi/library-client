// import './Sidebar.css'; 
// import { toggleSidebar } from '../../store/sidebarSlice';
// import { useDispatch, useSelector } from 'react-redux';

// const Sidebar = () => {
//     const isOpen = useSelector(state => state.isSidebarOpen);
//     const dispatch = useDispatch();
//   const handleCloseSidebar = () => {
//     dispatch(toggleSidebar());
//   };

//   const handleSidebarClick = (e) => {
//     e.stopPropagation();
//   };

//   return (
//     <div>
//         {isOpen && (
//         <div className="sidebar-overlay" onClick={handleCloseSidebar}>
//           <div className="sidebar" onClick={handleSidebarClick}>
//             <button className="close-button" onClick={handleCloseSidebar}>Close</button>

//             <ul>
//               <li><Link to='/'>Home</Link></li>
//               <li><Link to='/dashboard'>Dashboard</Link></li>
//               <li ><Link to='/shift'>Shifts</Link></li>
//               <li><Link to='/hall'>Halls</Link></li>
//             </ul>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Sidebar;
import { Link } from 'react-router-dom';

import './Sidebar.css'; // Import CSS for styling

const Sidebar = () => {
    return (
        <div className="sidebar">
             <div><Link to='/'>Home</Link></div> 
             <div><Link to='/dashboard'>Dashboard</Link></div> 
              <div><Link to='/shift'>Shifts</Link></div>
              <div><Link to='/hall'>Halls</Link></div>
        </div>
    );
};

export default Sidebar;
