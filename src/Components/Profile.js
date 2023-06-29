import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getCurrentUserProfile } from '../../server/api/spotify';
import { fetchPlaylists, updateAuth, updatePlaylist } from '../store';
import Switch from 'react-ios-switch';

const Profile = () => {

    const { auth, playlists } = useSelector(state => state);
    const [discover, setDiscover] = useState(false);
    const [pro, setPro] = useState();
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [localSpotProf, setLocalSpotProf] = useState(null)

    const dispatch = useDispatch();

    const didMount = useRef(false); // Ref to track the component mount status

    const authPlaylists = playlists.map(pl => pl).filter(pl => pl.userId === auth.id)

    useEffect(() => {
        if(auth){
            setDiscover(auth.discoverPlaylists);
            setPro(auth.proUser);
        }
    }, [auth])

    useEffect(() => {
        (async () => {

            const spotUserData = await(getCurrentUserProfile());
            setLocalSpotProf(spotUserData)

        })()
      }, [])


    useEffect(() => {
        if (didMount.current) {  // Avoid running on initial render
            if(auth){
                dispatch(updateAuth({id: auth.id, discoverPlaylists: discover}));
            }
        } else {
            didMount.current = true;
        }
    }, [discover])

    const discoverToggle = () => {
        setDiscover((current) => {

          console.log("Current discover state:", current);
          console.log("Toggling discover state to:", !current);

          const newDiscoverState = !current;

          dispatch(updateAuth({id: auth.id, discoverPlaylists: newDiscoverState}));

          authPlaylists.forEach(pl => {
            dispatch(updatePlaylist({id: pl.id, isDiscoverable: newDiscoverState}))
        })

            dispatch(fetchPlaylists())

          return newDiscoverState;
        })
        ;
      }
    
    const cancelSubscription = () => {
        dispatch(updateAuth({id: auth.id, proUser: false}));
    }

    const confirmedCancelSubscription = () => {
        cancelSubscription();
        setPopupVisible(false);
      }

    const removeCheck = () => {
        setPopupVisible(true);
      }
    
      const removeCheckClose = () => {
        setPopupVisible(false);
    };
      
    if(!auth){
        return null;
    }

    
    return(

        <div id='content-body'>
            <div id='pl-container' style={{marginTop: '2rem'}}>

                <div className='create-header' id='about-header'>
                User <span style={{color: 'white', marginLeft: '.5rem'}}>Profile</span>
                </div>
          

          <div className="about-steps-container">
                            <div className="about-inner-container" style={{marginTop: 0}}>

                        <div className='prof-spot-user'>
                            <div className='prof-spot-img'>
                            <img src={auth.image} />
                          </div>

                          <div className='prof-spot-userId'>
   
                                    <a href={`https://open.spotify.com/user/${ auth.spotifyId }`} target='_blank' title='Open in Spotify'>{auth.display_name.toUpperCase()} 
                                    </a>


                                <div className={`${(pro === true) ? 'prof-unlock-pro' : 'prof-free'}`} title={`${(pro === true) ? 'Pro User' : 'Free User'}`}><i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></div>
                                </div>

                            </div>
                            </div>



                            <div className="info-inner-container" id='prof-inner-container'>
                                <div className='prof-stats'>
                              <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                              <span className='prof-title'>Spotify User ID:</span> <span>{ auth.spotifyId }</span>
                                </div>
                              </div>

                              <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                              <span className='prof-title'>Email:</span> <span>{ auth.email }</span>
                            </div>
                            </div>

                            <div className="feature-header" id='info-header'>
                              <div className='step-num-title'>
                              <span className='prof-title'>Serenade Playlist Count:</span> <span>{ authPlaylists.length }</span>
                            </div>
                            </div>

                            {/* <div className="feature-header" id='info-header' style={{marginBottom: 0}}>
                              <div className='step-num-title'>
                              <span className='prof-title'>Account Status:</span> <span className='prof-unlock-pro'>Pro <i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></span> <span className='cancelSub' onClick={removeCheck}>(cancel subcription)</span>
                            </div>
                            </div> */}

                            <div className="feature-header" id='info-header' style={{marginBottom: 0}}>
                              <div className='step-num-title'>
                              <span className='prof-title'>Account Status:</span> <span>{(pro) ? <span><span className='prof-unlock-pro'>Pro <i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></span> <span className='cancelSub' onClick={removeCheck}>(cancel subcription)</span></span> : <span>Free (<span className='prof-unlock-pro'><Link to='/unlock-pro'>Unlock Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i></Link></span>)</span>}</span>
                            </div>
                            </div>

                            {isPopupVisible && (
  
                                <div className="modalBackground">
                                    <div className="modalContainer" id='removeCheckContainer'>
                                        <div className="removeCheck-title">
                                            Cancel Subscription
                                        </div>
                                        <div className='userCheck-content'>Are you sure you want to cancel your monthly Serenade subcription?</div>
                                        <div className='userCheck-buttons'>
                                        <button className='removeCheck-confirm-button' onClick={() => confirmedCancelSubscription()}>Confirm</button>

                                        <button className='removeCheck-cancel-button' onClick={removeCheckClose}>Nevermind</button>
                                        </div>
                                    </div>
                                </div>

                                )}
                            </div>




                            <div className='prof-prompt-outer-container'>
                                <div className='prof-prompt' id='prof-discoverable-only'>
                                    <div className='discoverable-container'>

                                        <div className='discoverable-title'>
                                        Make Playlists Discoverable?
                                        </div>

                                        <div className='discoverable-switch-container'>
                                        <Switch checked={discover} onColor={'#1DB954'} onChange={() => discoverToggle()} className='ios-switch'/>
                                        </div>

                                    </div>
                                </div>
                            </div>
                              
                            </div>
                            </div>

                        



        
        </div>
        </div>

    
    )
}
export default Profile;