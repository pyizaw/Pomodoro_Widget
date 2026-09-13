import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
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

      <h1 className="home-timer">25:00</h1>

      <button className='home-button'>
        Start
      </button>
    </div>
    </div>
  );
}

export default App;
