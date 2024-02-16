import {  useState, useEffect } from "react";
import { useParams } from "react-router-dom"
import SeatGrid from "../components/SeatGrid";

const Hall = ({shifts}) => {
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

export default Hall;