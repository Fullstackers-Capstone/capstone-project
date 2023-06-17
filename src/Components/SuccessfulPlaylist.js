import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserPlaylists, getPlaylistById, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from './Loader';
import { fetchPlaylists } from '../store';

const SuccessfulPlaylist = () => {

  const { auth, playlists } = useSelector(state => state);
//   const [isLoading, setIsLoading] = useState(false);
  const [localPlaylists, setLocalPlaylists] = useState(null);

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchPlaylists());
  }, [])


    useEffect(() => {
    const actualPl = playlists.find(playlist => playlist.id === id);
    (async () => {
      try{
        const spotIdData = {
          spotData: await (getPlaylistById(actualPl.spotId)),
          prompt: actualPl.prompt,
          createdAt: actualPl.createdAt,
          isDiscoverable: actualPl.isDiscoverable,
          userId: actualPl.userId,
          id: actualPl.spotId
        };
        
        if(!spotIdData.spotData.data.images[0]) window.location.reload();

        setLocalPlaylists(spotIdData);

      }
      catch(error){
        console.error(error)
      }
    })()
  }, [playlists])



//   const localPlaylists = localPlaylists[0]
//   console.log('this is the current playlist', currentPl);

// console.log('this is with the spotify return', localPlaylists)

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

  if(!auth){
    return null;
  }

  return(

    <>
        {(localPlaylists) && (
            <div id='content-body'>

            {/* <div id='successful-alert'>Playlist creation successful!</div> */}

            <div id='successfulpl-container'>

            <div className='pl-thumb' key={localPlaylists.id}>
                <div className='pl-thumb-name'>
                    <a href={`https://open.spotify.com/playlist/${localPlaylists.id}`} target='_blank' title='Open in Spotify'>{localPlaylists.spotData.data.name}</a>
                </div>
            
                <div className='pl-thumb-data-container'>
            
                    <div className='pl-thumb-img' title='Open in Spotify'>
                        <a href={`https://open.spotify.com/playlist/${localPlaylists.id}`} target='_blank'>
                            <img src={localPlaylists.spotData.data.images[0].url || '/static/default.jpeg'}/>
                        </a>
                    </div>
            
                <div className='pl-thumb-tracks'>
            
                    {localPlaylists.spotData.data.tracks.items.slice(0, 7).map(_track => {
                    return(
                      <div key={_track.track.duration_ms} className='track-lineitem'><span className='track-artist'>{_track.track.artists[0].name}</span> - {_track.track.name} ({msConversion(_track.track.duration_ms)})</div>
                    )
                    })}
                  </div>
                </div>
            
                <div className='pl-thumb-prompt-container'>
                    <div className='pl-prompt'>
            
                    <div className='pl-thumb-prompt-content'>
                        <span className='prompt-title'>Prompt:</span> <span className='prompt-content'>"{localPlaylists.prompt}"</span>
                    </div>
            
                    <div className='pl-thumb-createdAt'>

                         {dateify(localPlaylists.createdAt)} @ {timeify(localPlaylists.createdAt)} UTC
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
                                <a href={`spotify:playlist:${localPlaylists.id}`}>
                                    Open in Spotify App <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                </a>
                            </li>
                            <li key='copyLink' onClick={() => copier(`https://open.spotify.com/playlist/${localPlaylists.id}`)}>Copy Link</li>
            
                        </div>
                        
                    </ul>
            
                </div>
            
                </div>
            </div>
            
            </div>
            <div>
                <button className='playlist-button'  onClick={() => navigate('/')}>View All Playlists</button>
            </div>
            </div>
        )}
      
    </>

  )
};

export default SuccessfulPlaylist;
