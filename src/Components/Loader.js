import React from 'react';

const Loader = () => {

  const trackCount = window.localStorage.getItem('trackCount') * 1

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
        <div className="loading-text">

          {trackCount === 23 && '15+ tracks will take some time. Please allow up to 45 seconds for your custom playlist to be created.'}

          {trackCount === 18 && '10+ tracks will take some time. Please allow up to 30 seconds for your custom playlist to be created.'}

          {trackCount === 10 && "Just a sec! We're working on this custom playlist for you..."}

        {/* <em>Just a sec! We're working on this custom playlist for you...</em> */}
      </div>

      </div>
      </>
      );
};

export default Loader;

