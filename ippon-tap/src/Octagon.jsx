import React from 'react';

const Octagon = ({ size = 200, children, colored = false }) => {
  const innerOctagonSize = `${size}px`;
  const outerOctagonSize = `${size + 5}px`;
  const octagonStyle = {
    width: innerOctagonSize,
    height: innerOctagonSize,
    background: colored ? 'linear-gradient(45deg, #FFFF45, #FED240)' : 'white',
    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  };
  const borderOctagonStyle = {
    width: outerOctagonSize,
    height: outerOctagonSize,
    background: 'linear-gradient(45deg, rgb(126, 124, 33), rgb(126, 125, 66))',
    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  };

  return (
    <div style={borderOctagonStyle}>
      <div style={octagonStyle}>
        {children}
      </div>
    </div>
  );
};

export default Octagon;
