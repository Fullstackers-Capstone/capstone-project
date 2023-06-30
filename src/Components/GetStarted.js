import React from 'react';

const GetStarted = () => {
  return(
    <>
      <div className="login-container">
        <a className="get-started" href={ '/login' }>Get Started</a>
        <div className='requires-spotify'>
        Requires Spotify account. <a href='http://www.spotify.com' target='_blank'>Get one here</a>.
        </div>
      </div>
    </>
  )
}

export default GetStarted;
