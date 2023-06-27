import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserPlaylists, getPlaylistById, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { fetchPlaylists, destroyPlaylist } from '../store';

const MyPlaylists = () => {

  const { auth, playlists } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(false);
  const [localPlaylists, setLocalPlaylists] = useState([]);
  const [pro, setPro] = useState();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchPlaylists());
  }, [])

  useEffect(() => {
    if(auth){
        setPro(auth.proUser);
    }
}, [auth])


    useEffect(() => {
    (async () => {
      try{
        const spotIdData = await Promise.all(playlists.map(async (response) => ({
          spotData: await getPlaylistById(response.spotId),
          prompt: response.prompt,
          createdAt: response.createdAt,
          isDiscoverable: response.isDiscoverable,
          userId: response.userId,
          spotId: response.spotId,
          id: response.id
        })
        ));

        setLocalPlaylists(spotIdData);

      }
      catch(error){
        console.error(error)
      }
    })()
  }, [playlists])


  const authPlaylists = localPlaylists.map(pl => pl)
  .filter(pl => pl.userId === auth.id)
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));  // sort by playlist creation time

  const destroy = (playlist) => {
    dispatch(destroyPlaylist(playlist))
  }

  const confirmedDestroyPlaylist = (playlist) => {
    destroy(playlist);
    setPopupVisible(false);
  }

  const removeCheck = () => {
    setPopupVisible(true);
  }

  const removeCheckClose = () => {
    setPopupVisible(false);
};

  const navigate = useNavigate();

  const msConversion = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  const copier = (inp) => {
    navigator.clipboard.writeText(inp).then(() => {
        alert("Copied: " + inp);
    })
  }

  const unlockPro = () => {
    navigate('/unlock-pro');
  }

  const dateify = (unicode) => {
    return unicode.slice(0, 10);
  }

  const timeify = (unicode) => {
    return unicode.slice(11, 16);
  }

  const imageHook = (playlistImg) => {
    return playlistImg || '/static/default.jpeg'
  }

  if(!auth){
    return null;
  }

  if(!playlists){
    return null;
  }

  return(

    <>
        {isLoading ? (
            <Loader/>
        ):( 
            <div id='pl-container'>
            {authPlaylists.map(playlist => {
                return(
                <div className='pl-thumb' key={playlist.id}>
                    <div className='pl-thumb-name'>
                        <a href={`https://open.spotify.com/playlist/${playlist.spotId}`} target='_blank' title='Open in Spotify'>{playlist.spotData.data.name}</a>
                    </div>
        
                    <div className='pl-thumb-data-container'>
        
                        <div className='pl-thumb-img' title='Open in Spotify'>
                            <a href={`https://open.spotify.com/playlist/${playlist.spotId}`} target='_blank'>
                                <img src={imageHook(playlist.spotData.data.images[0].url)}/>
                            </a>
                        </div>

                        <div className='separator-container'>
                          <div className='separator'></div>
                        </div>
        
                    <div className='pl-thumb-tracks'>
        
                        {playlist.spotData.data.tracks.items.slice(0, 7).map((_track, index) => {
                        return(
                          <div key={_track.track.duration_ms} className='track-lineitem'>
                            <span style={{color: '#777777', fontSize: '.75rem', marginRight: '.25rem'}}>{(index + 1)}. </span><span className='track-artist'>{_track.track.artists[0].name}</span>-
                            <span style={{fontSize: '.75rem', marginLeft: '.35rem'}}>{_track.track.name} <span style={{fontSize: '.7rem'}}>({msConversion(_track.track.duration_ms)})</span></span></div>
                        )
                        })}
                      </div>
                    </div>
        
                    <div className='pl-thumb-prompt-container'>
                        <div className='pl-prompt'>

                        <div className='pl-thumb-prompt-content'>
                            <span className='prompt-title'>Prompt:</span> <span className='prompt-content'>"{playlist.prompt}"</span>
                        </div>

                        <div className='pl-thumb-createdAt'>
                             {dateify(playlist.createdAt)} @ {timeify(playlist.createdAt)} UTC
                        </div>
                        
                        </div>
                    </div>
        
                    <div className='pl-thumb-stats-container'>
                      <div className='pl-thumb-user-container'>
                          <div className='pl-thumb-user-img'>
                            <img src={auth.image} />
                          </div>
                          <div className='pl-thumb-user-name-container'>
                            <div className='pl-thumb-user-name'>
                            <a href={`https://open.spotify.com/user/${auth.spotifyId}`} target='_blank' title='Open in Spotify'>{auth.display_name.toUpperCase()}</a>
                            </div>
                          </div>
                      </div>
        
                    <div className='pl-thumb-ellipsis-container'>
        
                        <ul className='ellipsis-dropdown'>
                            <button>
                                <i className="fa-solid fa-angle-down"></i>
                            </button>
                            <div className='ellipsis-dropdown-content'>
                                <li key='spotOpen'>
                                    <a href={`spotify:playlist:${playlist.spotId}`}>
                                        Open in Spotify App <i className="fa-solid fa-arrow-up-right-from-square fa-xs" style={{marginLeft: '.15rem'}}></i>
                                    </a>
                                </li>
                                <li key='copyLink' onClick={() => copier(`https://open.spotify.com/playlist/${playlist.spotId}`)}>Copy Link</li>

                                {(pro) ? <li id='remove-pro' onClick={removeCheck} key='remove'>Remove <i className="fa-solid fa-circle-check fa-xs" style={{marginLeft: '.15rem'}}></i></li> : <li id='remove-pro' key='remove' onClick={unlockPro}>Remove (Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i>)</li>}
                            </div>
                            
                        </ul>
        
                    </div>
        
                    </div>
                    {isPopupVisible && (
  
                        <div className="modalBackground">
                            <div className="modalContainer" id='removeCheckContainer'>
                                <div className="removeCheck-title">
                                    Remove Playlist
                                </div>
                                <div className='userCheck-content'>Are you sure you want to remove this playlist from your Serenade profile?</div>
                                <div className='userCheck-buttons'>
                                <button className='removeCheck-confirm-button' onClick={() => confirmedDestroyPlaylist(playlist)}>Confirm</button>

                                <button className='removeCheck-cancel-button' onClick={removeCheckClose}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    )}
                </div>
                )
              })}
            </div>
        )}
      
    </>

  )
};

export default MyPlaylists;