import { useEffect, useState } from "react";
import './ShiftTimer.css'

function TimeCounter({ timeString }) {
  const [timeData, setTimeData] = useState({ hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const timer = timeString.split(':');

    const setTime = () => {
      setTimeData({ hours: timer[0], minutes: timer[1], seconds: timer[2] });
    }
    setTime();
    const intervalId = setInterval(setTime, 1000);

    return () => clearInterval(intervalId);
  }, [timeString]);

  return (
    <div className="time-counter-container">
      <div className="time-box">{timeData.hours}</div>
      :
      <div className="time-box">{timeData.minutes}</div>
      :
      <div className="time-box">{timeData.seconds}</div>
      HRS
    </div>
  );
}
export default TimeCounter;  