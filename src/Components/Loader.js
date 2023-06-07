import React from 'react';

const Loader = () => {
    return (
        <div className="loader-container">
        <div className="bars">
          <div className="bar" style={{ animationDelay: '250ms' }}></div>
          <div className="bar" style={{ animationDelay: '715ms' }}></div>
          <div className="bar" style={{ animationDelay: '475ms' }}></div>
          <div className="bar" style={{ animationDelay: '25ms' }}></div>
          <div className="bar" style={{ animationDelay: '190ms' }}></div>
        </div>
      </div>
      );
};

export default Loader;

