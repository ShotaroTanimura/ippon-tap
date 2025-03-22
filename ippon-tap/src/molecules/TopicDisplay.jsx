import React from 'react';
import './TopicDisplay.css';

const TopicDisplay = ({ topic }) => {
  return (
    <div className="molecule-topic-display">
      <p>{topic}</p>
    </div>
  );
};

export default TopicDisplay;
