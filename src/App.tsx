import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  const [timeLeft, setTimeLeft] = useState(25*60);
  const [isRunning, setIsRunning] = useState(false);

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

  const handleClick = () => {
    if(!isRunning) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
      setTimeLeft(25*60);
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
        <button className="image-button">
          Work
        </button>
        <button className="image-button">
          Break
        </button>
      </div>

      <p>
        You can do it!
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
