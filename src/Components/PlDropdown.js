import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Turn as Hamburger } from 'hamburger-react'
import { destroyPlaylist } from '../store';

const PlDropdown = ({pl}) => {

  const { auth } = useSelector(state => state);

    const [dropdownVisible, setDropdownVisible] = useState(false);
    const [hamburgerOpen, setHamburgerOpen] = useState(false);
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [destroyer, setDestroyer] = useState(false);
    const [copier, setCopier] = useState(false);
    const [pro, setPro] = useState();


    useEffect(() => {
      if(auth){
          setPro(auth.proUser);
      }
  }, [auth])

  const mainMenu = useRef(null);

  const closeMainMenu = (e) => {
    if(mainMenu.current && hamburgerOpen && !mainMenu.current.contains(e.target)){
      setHamburgerOpen(false);
      setDropdownVisible(false);
    }
  }

  document.addEventListener('mousedown',closeMainMenu)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleDropdownToggle = () => {
        setDropdownVisible(!dropdownVisible);
        setHamburgerOpen(!hamburgerOpen);
      };

    const copyLink = (link) => {
      navigator.clipboard.writeText(link)
    }

      const destroy = (pl) => {
        console.log('this is where the playlist about to get destroyed', pl)
        dispatch(destroyPlaylist(pl))
        navigate('/');
      }
    
      const confirmedDestroyPlaylist = (pl) => {
        destroy(pl);
        auth.playlistCount = auth.playlistCount - 1;
        setPopupVisible(false);
      }
    
      const removeCheck = (inp, link) => {
        setPopupVisible(true);
        if(inp === 'destroyer') setDestroyer(true);
        if(inp === 'copier') {
          setCopier(true);
          copyLink(link);
        }
    }
    
      const removeCheckClose = () => {
        setPopupVisible(false);
        setHamburgerOpen(false);
        setDropdownVisible(false);
        if(destroyer) setDestroyer(false);
        if(copier) setCopier(false);
    };

    const unlockPro = () => {
      navigate('/unlock-pro');
    }

    return(
        <div ref={mainMenu} className={`dropdown ${dropdownVisible ? 'visible' : ''}`}>
        <div className='dropdown-toggle' onClick={handleDropdownToggle}>
          <Hamburger size={20} distance={'sm'} direction={'right'} toggled={hamburgerOpen} toggle={setHamburgerOpen}/>
        </div>
        <div className="dropdown-content" id='plDropdown-content'>

        <li key='spotOpen' style={{padding: 0}}>
              <a href={`spotify:playlist:${pl.spotData.data.id}`} onClick={handleDropdownToggle}>
                  Open in Spotify App <i className="fa-solid fa-arrow-up-right-from-square fa-xs" style={{marginLeft: '.15rem'}}></i>
              </a>
          </li>

          <li key='copyLink' onClick={() => removeCheck('copier', `https://open.spotify.com/playlist/${pl.spotData.data.id}`)}>Copy Link <i className="fa-solid fa-link fa-xs" style={{marginLeft: '.15rem'}}></i></li>

          {auth.id === pl.userId && (
            <>
            {(pro) ? <li id='remove-pro' onClick={() => removeCheck('destroyer')} key='remove'>Remove <i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></li> : <li id='remove-pro' key='remove' onClick={unlockPro}>Remove (Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i>)</li>}
            </>
          )}
          

          {isPopupVisible && (
  
            <div className="modalBackground">
                <div className="modalContainer" id='removeCheckContainer'>
                    <div className="removeCheck-title">
                        {(destroyer) && 'Remove Playlist'}
                        {(copier) && (<span style={{color: '#1DB954'}}>Copy Link Successful</span>)}
                    </div>
                    <div className='userCheck-content'>
                      {(destroyer) && 'Are you sure you want to remove this playlist from your Serenade profile?'}

                      {(copier) && `https://open.spotify.com/playlist/${pl.spotData.data.id}`}
                      
                      </div>
                    <div className='userCheck-buttons'>

                    {(destroyer) && (
                      <>
                      <button className='removeCheck-confirm-button' onClick={() => confirmedDestroyPlaylist(pl)}>Confirm</button>

                      <button className='removeCheck-cancel-button' onClick={removeCheckClose}>Cancel</button>
                      </>
                    )}  

                    {(copier) && (
                      <>
                        <button className='modal-button' onClick={removeCheckClose}>Close</button>
                      </>
                    )}

                    </div>
                </div>
            </div>

          )}
           
        </div>
      </div>
    )
}

export default PlDropdown;