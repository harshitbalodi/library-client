/* eslint-disable react/prop-types */
import { formatTime } from "../../utils/helper";
import ProgressBar from "./ProgressBar";
import './ShiftTimer.css';
import TimeCounter from "./TimeCounter";


const DisplayTime = ({ shifts }) => {

  return (
    <div className="display-time-card">
      <div className="shift-details-container">
        <div className="shift-names-column">
          <h3>Shifts</h3>
          {shifts?.shifts?.map((shift) => (
            <div key={shift.id} className="shift-name">
              {shift.name}
            </div>
          ))}
        </div>
        <div className="shift-timing-column">
          <h3>Timing</h3>
          <span className="shift-timing">
            {formatTime(shifts.start_time)} - {formatTime(shifts.end_time)}
          </span>
        </div>
      </div>
      <div className="timer-container">
        {shifts.status === "running" && (
          <div>
            <div>will end in</div>
            <TimeCounter timeString={shifts.time}/>
            <ProgressBar startTime={shifts.start_time} endTime={shifts.end_time} />
          </div>
        )}
        {shifts.status === "time_remaining" && (
          <div>
            <div> will start in </div>
            <TimeCounter timeString={shifts.time}/>
          </div>
        )}
        {shifts.status === "ended" && (
          <div className="ended">shifts ended</div>
        )}
      </div>
    </div>
  );
};

export default DisplayTime;
