import { useState, useEffect } from 'react';

// Function to parse time string (hh:mm:ss) to milliseconds
function parseTime(timeString) {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
}

function ProgressBar({ startTime, endTime }) {
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const totalTime = parseTime(endTime) - parseTime(startTime);
        const updateProgress = () => {
            const currentDate = new Date();
            const midnight = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
            const timePassed = currentDate.getTime() - midnight.getTime();
            const timeLeft = Math.max(parseTime(endTime) - timePassed, 0);
            setProgress((timeLeft / totalTime) * 100);
        };
        updateProgress();

        const intervalId = setInterval(updateProgress, 10000);
        return () => clearInterval(intervalId);
    }, [startTime, endTime]);

    return (
        <div className="progress-bar-container">
            <div
                className="progress-bar"
                role="progressbar"
                aria-valuenow={Math.abs(100 - progress)}
                aria-valuemin="0"
                aria-valuemax="100"
                style={{ width: `${Math.abs(100 - progress)}%` }}
            ></div>
        </div>
    );
}

export default ProgressBar;
