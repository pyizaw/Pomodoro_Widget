import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import work_background from './Assets/work_background.png';
import break_background from './Assets/break_background.png';
import workBtnClicked from "./Assets/work-clicked.png";
import workBtn from "./Assets/work.png";
import breakBtnClicked from "./Assets/break-clicked.png";
import breakBtn from "./Assets/break.png";
import closeBtn from "./Assets/close.png";
import playImg from "./Assets/play.png";

function App() {
    // Encouragement messages
  const cheerMessages = ["You can do it!", "Stay focused!", "Study Study Study!!"];

  // Break Messages
  const breakMessages = ["Stay hydrated!", "Snack time!", "nap... soon..."];

  // Various States
  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [encouragement, setEncouragement] = useState("You Can Do It!");
  const [breakButtonImage, setBreakButtonImage] = useState(breakBtn);
  const [workButtonImage, setWorkButtonImage] = useState(workBtn);

  // Set constant for Work and Break timing (Consistency)
  const WORK_TIME = 25 * 60; // 1500 seconds
  const BREAK_TIME = 5 * 60;  // 300 seconds

  // To automatically change messages every 4 seconds
  useEffect(() => {
    let messageInterval;

    if (isRunning) {
      const messages = isBreak ? breakMessages : cheerMessages;
      setEncouragement(messages[0]); // show immediately
      let index = 1;

      messageInterval = setInterval(() => {
        setEncouragement(messages[index]);
        index = (index + 1) % messages.length;
      }, 4000);
    }
    return () => clearInterval(messageInterval);
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
    setBreakButtonImage(breakMode ? breakBtnClicked : breakBtn);
    setWorkButtonImage(breakMode ? workBtn : workBtnClicked);
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

  const containerClass = `home-container ${isRunning ? "work_background" : "break_background"}`;

  return (
    //Requires something to wrap (Syntax)
    <div className="home-container"
      style={{ backgroundImage: `url(${isBreak ? break_background : work_background})`, backgroundSize: "cover", backgroundPosition: "center>"}}>
    <div>
      <button className="close-button">
        <img src={closeBtn} alt="Close" />
      </button>
    </div>
    
    <div className="home-content">
      <div className="home-timer"></div>

      <div className="home-controls">
        <button className="image-button" onClick={() => switchMode(false)}>
          <img src={workButtonImage} alt="Work" />
        </button>
        <button className="image-button" onClick={() => switchMode(true)}>
          <img src={breakButtonImage} alt="Break" />
        </button>
      </div>

      <p className={`encouragement-text ${!isRunning ? "hidden" : ""}`}>
        {encouragement}
      </p>

      <h1 className="home-timer">{formatTime(timeLeft)}</h1>

      <button className='home-button' onClick={(handleClick)}>
        <img src={playImg} alt="Start" />
      </button>
    </div>
    </div>
  );
}

export default App;
