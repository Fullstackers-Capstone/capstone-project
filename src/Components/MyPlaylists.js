import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPlaylistById } from '../../server/api/spotify';
import Loader from './Loader';
import { fetchPlaylists } from '../store';
import PlDropdown from './PlDropdown';

const MyPlaylists = () => {

  const { auth, playlists } = useSelector(state => state);
  const [isLoading, setIsLoading] = useState(false);
  const [localPlaylists, setLocalPlaylists] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchPlaylists());
  }, [])


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
                      <div className='pl-thumb-ellipsis-container'>
                        <PlDropdown pl={playlist}/>
                      </div>
                      <div className='pl-thumb-user-container'>
                        <div className='pl-thumb-user-name-container'>
                          <div className='pl-thumb-user-name'>
                            <a href={`https://open.spotify.com/user/${auth.spotifyId}`} target='_blank' title='Open in Spotify'>{auth.display_name.toUpperCase()}</a>
                          </div>
                        </div>
                        <div className='pl-thumb-user-img'>
                          <img src={auth.image} />
                        </div>
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