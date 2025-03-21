import React from 'react';
import './TimerProgressBar.css';

const TimerProgressBar = ({ timeLeft, totalTime }) => {
  const progressPercent = (timeLeft / totalTime) * 100;
  return (
    <div className="progress-bar-container">
      <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
    </div>
  );
};

export default TimerProgressBar;
