import React from 'react';
import './ResultDisplay.css';

const ResultDisplay = ({ tapCount }) => {
  return (
    <div className="result-display">
      {tapCount >= 10 ? 'IPPON!!' : tapCount}
    </div>
  );
};

export default ResultDisplay;
