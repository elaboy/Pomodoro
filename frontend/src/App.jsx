import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [initialSeconds, setInitialSeconds] = useState(0); // for resetting progress bar

    useEffect(() => {
        let interval;

        if (isRunning && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(prev => prev - 1);
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    const startCountdown = () => {
        setIsRunning(true);
    };

    const clearCountdown = () => {
        setIsRunning(false);
        setSeconds(initialSeconds);
    }

    const handleTimeSelect = (minutes) => {
        const totalSeconds = minutes * 60;
        setInitialSeconds(totalSeconds);
        setSeconds(totalSeconds);
        setIsRunning(false); // reset state before starting
    };

    return (
        <>
            <h1>Pomodoro</h1>
            <div className="row">
                <TimeCard time={10} onClick={() => handleTimeSelect(10)} />
                <TimeCard time={15} onClick={() => handleTimeSelect(15)} />
                <TimeCard time={25} onClick={() => handleTimeSelect(25)} />
            </div>
            <div className="row">
                <TimeCard time={30} onClick={() => handleTimeSelect(30)} />
                <TimeCard time={45} onClick={() => handleTimeSelect(45)} />
                <TimeCard time={60} onClick={() => handleTimeSelect(60)} />
            </div>
            <div className="column">
                <CountdownCard seconds={seconds} />
                <progress max={initialSeconds} value={initialSeconds - seconds}></progress>
                <div className={"row"}>
                    <button onClick={startCountdown}>Start</button>
                    <button onClick={clearCountdown}>Reset</button>
                </div>
            </div>
        </>
    );
}

function TimeCard({ time, onClick }) {
    return (
        <div className="time-card" onClick={onClick} style={{ cursor: 'pointer' }}>
            {time} minutes
        </div>
    )
}


function CountdownCard({ seconds }) {
    const minutes = Math.floor(seconds / 60);
    const sec = seconds % 60;
    const paddedSec = sec < 10 ? `0${sec}` : sec;
    return (
        <h2 style={{ fontFamily: "Orbitron", fontSize: "2rem" }}>
            {minutes}:{paddedSec}
        </h2>
    );
}

export default App;
