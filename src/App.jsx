import Footer from "./components/Footer"
import Navbar from "./components/Navbar"
import BookSlots from "./pages/BookSlots"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import { useEffect, useState } from "react";
import roomsServices from "./services/roomsServices";
import Hall from "./pages/Hall";

function App() {
  const [shifts, setShifts] = useState(null);
  useEffect(()=>{
    const getdata = async()=>{
      try{
        const {data} = await roomsServices.getall();
        console.log(data);
        setShifts(data);
      }catch(error){
        console.log(error);
      }
      
    }
    getdata();
    
  },[])
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/shift" element={<BookSlots shifts={shifts} setShifts={setShifts}/>}/>
        <Route path="/shift/:id" element={<Hall shifts={shifts}/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}

export default App
