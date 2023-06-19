import React from 'react';

const Loader = () => {
    return (
      <>
        <div className="loader-container">
        <div className="bars">
          <div className="bar" style={{ animationDelay: '250ms' }}></div>
          <div className="bar" style={{ animationDelay: '715ms' }}></div>
          <div className="bar" style={{ animationDelay: '475ms' }}></div>
          <div className="bar" style={{ animationDelay: '25ms' }}></div>
          <div className="bar" style={{ animationDelay: '190ms' }}></div>
        </div>

        <span className='please-allow'>
                  Please allow up to 30 seconds for your playlist to be constructed.
        </span>

      </div>
      </>
      );
};

export default Loader;

