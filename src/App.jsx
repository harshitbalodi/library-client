import Footer from "./components/Footer"
import BookSlots from "./pages/BookSlots"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import { useEffect } from "react";
import shiftServices from "./services/shiftServices";
import ShiftDetail from "./pages/ShiftDetail";
import Sidebar from "./components/Sidebar/Sidebar";
import Nav from "./components/Navbar/Nav";
import HallPage from "./pages/HallPage";
import Dashboard from "./pages/Dashboard";
import { useDispatch} from "react-redux";
import { setShifts } from "./store/shiftSlice";


function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const getdata = async () => {
      try {
        const { data } = await shiftServices.getall();
        dispatch(setShifts(data));
      } catch (error) {
        console.log(error);
      }

    }
    getdata();

  }, [])
  return (
    <Router>
      <div className="body-container">
        <Nav />
        <Sidebar />
        <div className="navigation-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shift" element={<BookSlots />} />
            <Route path="/shift/:id" element={<ShiftDetail/>} />
            <Route path="/hall" element={<HallPage/>}/>
            <Route path="dashboard" element={<Dashboard/>}/>
          </Routes>
        </div>
        <Footer/>
      </div>
    </Router>
  )
}


export default App
