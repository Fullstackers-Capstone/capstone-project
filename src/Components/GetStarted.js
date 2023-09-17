import React, { useState, useRef } from 'react';

const GetStarted = () => {

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyLink = (link) => {
    navigator.clipboard.writeText(link)
  }

  const loginCheck = () => {
    setPopupVisible(true);
  }

  const copyContinue = () => {
    navigator.clipboard.writeText('serenader@fastmail.com');
    setCopied(true);
  }

  const popupWindow = useRef(null);

  const closePopup = (e) => {
    if(popupWindow.current && !popupWindow.current.contains(e.target)) {
      setPopupVisible(false);
    }
  }

  document.addEventListener('mousedown', closePopup);

  return(
    <>
      <div className="login-container">
        <button className="get-started" onClick={ loginCheck }>Get Started</button>
        {/* <div className='requires-spotify'>
        Requires Spotify account. <a href='http://www.spotify.com' target='_blank'>Get one here</a>.
        </div> */}
      </div>

      { isPopupVisible && (
          <div className="modalBackground">
          <div ref={ popupWindow } className="modalContainer" style={{ textAlign: 'left'}}>

            <div className="removeCheck-title">

                <span style={{ color: '#1DB954' }}>
                  Logging In
                </span>

            </div>

            <div className='userCheck-content' style={{ color: 'white', marginTop: '1.5rem' }}>
                <div className='loginCheck-content'>Serenade is currently in <span style={{ borderBottom: '1px dotted #1DB954'}}>beta development</span> and awaiting approval from Spotify to be able to provide access to public users.</div>

                <div className='loginCheck-content'>In the meantime, please use the following credentials when prompted on the next screen in order to access the app.</div>

                <div className='loginCheck-content' style={{ marginBottom: '.15rem'}}><span style={{ fontWeight: 600, color: 'gold'}}>Email:</span> serenader@fastmail.com</div>

                <div className='loginCheck-content' style={{ marginBottom: '1.5rem' }}><span style={{ fontWeight: 600, color: 'gold' }}>Password:</span> serenader</div>
            </div>

            <div className='userCheck-buttons'> 

                  <button disabled={ copied } className={ `${copied ? 'loginCheck-copied' : 'modal-button'}`} onClick={ copyContinue }>
                    {copied ? <>Copied <i className="fa-solid fa-circle-check fa-xs" style={{ marginLeft: '.25rem' }}></i></> : 'Copy Email'}
                  </button>
                  <button className={ `${copied ? 'modal-button' : 'removeCheck-cancel-button'}`} onClick={ () => location.replace('/login')}>
                    Continue
                  </button>

            </div>

          </div>
        </div>
      )}
    </>
  )
}

export default GetStarted;
