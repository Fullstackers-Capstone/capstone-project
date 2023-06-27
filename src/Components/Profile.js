import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchPlaylists, updateAuth, updatePlaylist } from '../store';
import Switch from 'react-ios-switch';

const Profile = () => {

    const { auth, playlists } = useSelector(state => state);
    const [discover, setDiscover] = useState(false);
    const [pro, setPro] = useState();

    const dispatch = useDispatch();

    const didMount = useRef(false); // Ref to track the component mount status

    const authPlaylists = playlists.map(pl => pl).filter(pl => pl.userId === auth.id)

    console.log('authPlaylists: ', authPlaylists);

    useEffect(() => {
        if(auth){
            setDiscover(auth.discoverPlaylists);
            setPro(auth.proUser);
        }
    }, [auth])

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
      

    if(!playlists){
        return null;
    }
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

                            <div className="feature-header" id='info-header' style={{marginBottom: 0}}>
                              <div className='step-num-title'>
                              <span className='prof-title'>Account Status:</span> <span>{(pro) ? <span><span className='prof-unlock-pro'>Pro <i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></span> <span className='cancelSub' onClick={() => {dispatch(cancelSubscription)}}>(cancel subcription)</span></span> : <span>Free (<span className='prof-unlock-pro'><Link to='/unlock-pro'>Unlock Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i></Link></span>)</span>}</span>
                            </div>
                            </div>


                              {/* <p className="p-landing">Visit your <a href=''>Spotify Profile <i className="fa-solid fa-arrow-up-right-from-square fa-xs"></i></a> to make changes to your user info.</p> */}
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

        
        // <div id='content-body'>
        //     <div id='pl-container' style={{marginTop: '2rem'}}>

        //     <div className='create-header'>
        //     User <span style={{color: 'white', marginLeft: '.5rem'}}>Profile</span>
        //   </div>

        //     <div className='pl-thumb' key={auth.id}>
        //     <div className='pl-thumb-name'>
        //       <a href={`https://open.spotify.com/user/${ auth.spotifyId }`} target='_blank' title='Open in Spotify'>{auth.display_name.toUpperCase()} <span className={`${(pro === true) ? 'prof-unlock-pro' : 'prof-free'}`} title={`${(pro === true) ? 'Pro User' : 'Free User'}`}><i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></span></a>
        //     </div>

        //     <div className='profstats-container'>

        //     <div className='profstats'>

        //         <div><span className='prof-title'>Spotify ID:</span> { auth.spotifyId }</div>
        //         <div><span className='prof-title'>Email:</span> { auth.email }</div>

        //         {/* <div className='prof-edit-info'>
        //             Visit your <a href=''>Spotify Profile <i className="fa-solid fa-arrow-up-right-from-square fa-xs"></i></a> to make changes to your user info.
        //         </div> */}

        //         <div><span className='prof-title'>Serenade Playlist Count:</span> { authPlaylists.length }</div>

        //         <div><span className='prof-title'>Account Status:</span> {(pro) ? <span><span className='prof-unlock-pro'>Pro <i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></span> <span className='cancelSub' onClick={() => {dispatch(cancelSubscription)}}>(cancel subcription)</span></span> : <span>Free (<span className='prof-unlock-pro'><Link to='/unlock-pro'>Unlock Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i></Link></span>)</span>}</div>

        //     </div>

        //     </div>

            

        //     <div className='prof-prompt-container'>
        //         <div className='prof-prompt'>

        //         <div className='discoverable-container'>
        //             <div className='discoverable-title'>
        //             Make Playlists Discoverable?
        //             </div>
        //             <div className='discoverable-switch-container'>
        //             <Switch checked={discover} onColor={'#1DB954'} onChange={() => discoverToggle()} className='ios-switch'/>
        //             </div>
        //         </div>
        //         </div>
        //     </div>

        //     <div className='prof-bottom-container'>
              
        //     </div>
        // </div>
        
        // </div>
        // </div>
    )
}
export default Profile;
