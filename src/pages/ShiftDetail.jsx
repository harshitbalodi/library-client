import {  useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom"
import SeatGrid from "../components/SeatGrid";
import { useSelector } from "react-redux";

const ShiftDetail = () => {
    const shifts = useSelector(state => state.shifts);
    const id = useParams().id;
    const [hall, setHall] = useState(null);
    useEffect(() => {
        const singleHall = shifts?.find(s => Number(s.id) === Number(id));
        setHall(singleHall);
    }, [id, shifts]);
  return !hall?
  <div>
    sorry no such hall exist
  </div>:(
    <div>
        <Link to="../"  path="relative">back to the page..</Link>
        <table>
            <tbody>
                <tr>
                    <td>Timing:</td>
                    <td>{hall.start_time} - {hall.end_time}</td>
                </tr>
                <tr>
                    <td> Hall name:</td>
                    <td>{hall.name}</td>
                </tr>
            </tbody>
        </table>
        <SeatGrid shift={hall}/>
    </div>
  )
}

export default ShiftDetail;