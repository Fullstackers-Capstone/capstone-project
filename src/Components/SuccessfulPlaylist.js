import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylistById } from '../../server/api/spotify';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchPlaylists } from '../store';
import PlDropdown from './PlDropdown';

const SuccessfulPlaylist = () => {

  const { auth, playlists } = useSelector(state => state);
  const { id } = useParams();
  const [localPlaylists, setLocalPlaylists] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [])

  useEffect(() => {
    const actualPl = playlists.find(playlist => playlist.id === id);

    (async () => {
      try {
        const spotIdData = {
          spotData: await (getPlaylistById(actualPl.spotId)),
          prompt: actualPl.prompt,
          createdAt: actualPl.createdAt,
          isDiscoverable: actualPl.isDiscoverable,
          userId: actualPl.userId,
          id: actualPl.spotId,
          spotId: actualPl.spotId
        };
        
        if(!spotIdData.spotData.data.images[0]) window.location.reload();

        setLocalPlaylists(spotIdData);
      }
      catch(error){
        console.error(error)
      }
    })()
  }, [playlists]);

  const msConversion = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
        { (localPlaylists) && (
          <div id='content-body'>
            <div id='successfulpl-container'>
              <div className='pl-thumb' id='successful-only' key={ localPlaylists.id }>

                <div className='pl-thumb-name'>
                  <a href={ `https://open.spotify.com/playlist/${ localPlaylists.id }` } target='_blank' title='Open in Spotify'>
                    { localPlaylists.spotData.data.name }
                  </a>
                </div>
          
                <div className='pl-thumb-data-container'>
          
                  <div className='pl-thumb-img' title='Open in Spotify'>
                      <a href={ `https://open.spotify.com/playlist/${ localPlaylists.id }` } target='_blank'>
                          <img src={ localPlaylists.spotData.data.images[0].url || '/static/default.jpeg' } />
                      </a>
                  </div>

                  <div className='separator-container'>
                    <div className='separator'></div>
                  </div>
          
                  <div className='pl-thumb-tracks'>
      
                    { localPlaylists.spotData.data.tracks.items.slice(0, 7).map((_track, index) => {
                    return(
                      <div key={ _track.track.duration_ms } className='track-lineitem'>
                        <span style={{ color: '#777777', fontSize: '.75rem', marginRight: '.25rem' }}>
                          { (index + 1) }. 
                        </span>
                        <span className='track-artist'>
                          { _track.track.artists[0].name }
                        </span> -
                        <span style={{ fontSize: '.75rem', marginLeft: '.5rem' }}>
                          { _track.track.name } 
                          <span style={{ fontSize: '.7rem', marginLeft: '.35rem' }}>
                            ({ msConversion(_track.track.duration_ms) })
                          </span>
                        </span>
                      </div>
                    )
                    }) }

                  </div>
                </div>

          
                <div className='pl-thumb-prompt-container'>
                  <div className='pl-prompt'>
                    <div className='pl-thumb-prompt-content'>
                      <span className='prompt-title'>
                        Prompt:
                      </span> 
                      <span className='prompt-content'>
                        "{ localPlaylists.prompt }"
                      </span>
                    </div>
                    <div className='pl-thumb-createdAt'>
                      { dateify(localPlaylists.createdAt) } @ { timeify(localPlaylists.createdAt) } UTC
                    </div>
                  </div>
                </div>

                <div className='pl-thumb-stats-container'>
                  <div className='pl-thumb-ellipsis-container'>
                    <PlDropdown pl={ localPlaylists } />
                  </div>
                  <div className='pl-thumb-user-container'>
                    <div className='pl-thumb-user-name-container'>
                      <div className='pl-thumb-user-name'>
                        <a href={ `https://open.spotify.com/user/${ auth.spotifyId }` } target='_blank' title='Open in Spotify'>
                          { auth.display_name.toUpperCase() }
                        </a>
                      </div>
                    </div>
                    <div className='pl-thumb-user-img'>
                      <img src={ auth.image } />
                    </div>
                  </div>
                </div>

              </div>
          
            </div>
            <div>
              <button className='playlist-button' id='view-all'  onClick={ () => navigate('/') }>
                View All Playlists
              </button>
            </div>
          </div>
        ) }
    </>
  );
};

export default SuccessfulPlaylist;