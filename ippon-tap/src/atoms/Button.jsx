import React from 'react';
import './Button.css';

const Button = ({ onClick, children }) => {
  return (
    <button className="atom-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
