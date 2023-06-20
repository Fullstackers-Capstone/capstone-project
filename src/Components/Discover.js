import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserPlaylists, getCurrentUserProfile, getPlaylistById, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { fetchPlaylists } from '../store';

const MyPlaylists = () => {

  const { auth, playlists } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(false);
  const [localPlaylists, setLocalPlaylists] = useState([]);
  const [discover, setDiscover] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchPlaylists());
  }, [])

  useEffect(() => {
    if(auth){
      setDiscover(auth.discoverPlaylists)
    }
  }, [auth]);


    useEffect(() => {
    (async () => {
      try{
        const spotIdData = await Promise.all(playlists.map(async (response) => ({
          spotData: await getPlaylistById(response.spotId),
          userData: await getCurrentUserProfile(response.userSpotId),
          prompt: response.prompt,
          createdAt: response.createdAt,
          isDiscoverable: response.isDiscoverable,
          userId: response.userId,
          id: response.spotId
        })
        ));

        setLocalPlaylists(spotIdData);

      }
      catch(error){
        console.error(error)
      }
    })()
  }, [playlists])


  const discoverablePlaylists = localPlaylists.map(pl => pl)
    .filter(pl => pl.isDiscoverable)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));  // sort by playlist creation time

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

  console.log('we need the photo', discoverablePlaylists);

  return(

    <>
        {isLoading ? (
            <Loader/>
        ):( 
            <div id='pl-container'>
            {discoverablePlaylists.map(playlist => {
                return(
                <div className='pl-thumb' key={playlist.id}>
                    <div className='disc-thumb-name'>
                        <a href={`https://open.spotify.com/playlist/${playlist.id}`} target='_blank' title='Open in Spotify'>{playlist.spotData.data.name}</a>
                    </div>
        
                    <div className='pl-thumb-data-container'>
        
                        <div className='pl-thumb-img' title='Open in Spotify'>
                            <a href={`https://open.spotify.com/playlist/${playlist.id}`} target='_blank'>
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
                            <span style={{color: '#777777', fontSize: '.7rem', marginRight: '.25rem'}}>{(index + 1)}. </span><span className='track-artist' style={{color: 'gold'}}>{_track.track.artists[0].name}</span>-
                            <span style={{fontSize: '.75rem', marginLeft: '.35rem'}}>{_track.track.name} <span style={{fontSize: '.7rem'}}>({msConversion(_track.track.duration_ms)})</span></span></div>
                        )
                        })}
                      </div>
                    </div>
        
                    <div className='pl-thumb-prompt-container'>
                        <div className='pl-prompt'>

                        <div className='pl-thumb-prompt-content'>
                            <span className='prompt-title' style={{color: 'gold'}}>Prompt:</span> <span className='prompt-content'>"{playlist.prompt}"</span>
                        </div>

                        <div className='pl-thumb-createdAt'>
                             {dateify(playlist.createdAt)} @ {timeify(playlist.createdAt)} UTC
                        </div>
                        
                        </div>
                    </div>
        
                    <div className='pl-thumb-stats-container'>
                      <div className='pl-thumb-user-container'>
                          <div className='pl-thumb-user-img'>
                            <img src={playlist.userData.data.images[0].url} />
                          </div>
                          <div className='pl-thumb-user-name-container'>
                            <div className='disc-thumb-user-name'>
                            <a href={`https://open.spotify.com/user/${playlist.spotData.data.owner.id}`} target='_blank' title='Open in Spotify'>{playlist.spotData.data.owner.display_name.toUpperCase()}</a>
                            {console.log(playlist.spotData.data.owner.id)}
                            {console.log(playlist.spotData.data.owner.display_name)}
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
                                    <a href={`spotify:playlist:${playlist.id}`}>
                                        Open in Spotify App <i className="fa-solid fa-arrow-up-right-from-square"></i>
                                    </a>
                                </li>
                                <li key='copyLink' onClick={() => copier(`https://open.spotify.com/playlist/${playlist.id}`)}>Copy Link</li>

                                {/* <li key='remove' onClick={unlockPro}>Remove (Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i>)</li> */}
                            </div>
                            
                        </ul>

                    </div>
                    
        
                    </div>
                </div>
                )
              })}
            </div>
        )}
      
    </>

  )
};

export default MyPlaylists;