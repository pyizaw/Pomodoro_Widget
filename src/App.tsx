import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // Various States
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("");

  // Encouragement messages
  const cheerMessages = [
    "You can do it!",
    "Stay focused!",
    "Study Study Study!!"
  ];

  // Break Messages
  const breakMessages = [
    "Stay hydrated!",
    "Snack time!",
    "nap... soon..."
  ];

  // Set constant for Work and Break timing (Consistency)
  const WORK_TIME = 25 * 60; // 1500 seconds
  const BREAK_TIME = 5 * 60;  // 300 seconds

  // To automatically change messages every 4 seconds
  useEffect(() => {
    let messageInterval: NodeJS.Timeout;

    if(isRunning) {
      const messages = isBreak? breakMessages : cheerMessages;
      setEncouragement(messages[0]);
      let index = 1

      messageInterval = setInterval (() => {
        setEncouragement(messages[index]);
        index = (index +1) % messages.length;
      },4000);
    } else {
      setEncouragement("");
    }

    return() => clearInterval(messageInterval);
  }, [isRunning, isBreak]);

  // Countdown function
  useEffect( () => {
    let timer:NodeJS.Timeout;
    if (isRunning && timeLeft > 0) {
      timer = setInterval (()=> {
        setTimeLeft(prev => prev -1);
      }, 1000);
    }
    return() => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const formatTime = (seconds:number): string => {
    
    const m = Math.floor(seconds/60).toString().padStart(2, '0');
    // Divides total seconds by 60 and round down
    // Convert for example "2" to "02"
    
    const s = (seconds % 60).toString().padStart(2, '0');
    // Calculate remaining seconds by using modulo
    
    return `${m}:${s}`;
    // Returns as "02:05"
  };
  
  // Changing between Work and Break Mode
  const switchMode = (breakMode: boolean) => {
    setIsBreak(breakMode);
    setIsRunning(false);
    setTimeLeft(breakMode ? BREAK_TIME : WORK_TIME);
  }

  const handleClick = () => {
    if(!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(isBreak ? BREAK_TIME : WORK_TIME);
    }
  }

  return (
    //Requires something to wrap (Syntax)
    <div style={{position: 'relative'}}>
    <div>
      <button className="closeButton">
        Close
      </button>
    </div>
    
    <div className="home-content">
      <div className="home-controls">
        <button className="image-button" onClick={ () => switchMode(false)}>
          Work
        </button>
        <button className="image-button" onClick={ () => switchMode(true)}>
          Break
        </button>
      </div>

      <p className = {'encouragement-text ${!isRunning ? "hidden" : ""}'}>
        { encouragement }
      </p>

      <h1 className="home-timer">{formatTime(timeLeft)}</h1>

      <button className='home-button' onClick={(handleClick)}>
        Start
      </button>
    </div>
    </div>
  );
}

export default App;
