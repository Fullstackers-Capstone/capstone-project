import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserPlaylists, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const MyPlaylists = () => {

  const { auth } = useSelector(state => state);
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {

    setIsLoading(true);
    const getLists = async() => {

  const lists = await getCurrentUserPlaylists(5);

  const listsData = await Promise.all(
    lists.data.items.map(async (_playlist) => {
      const tracks = await getPlaylistTracks(_playlist.id)
      let imageURL = _playlist.images && _playlist.images.length > 0 ? _playlist.images[0].url : 'https://images.unsplash.com/photo-1546188994-07c34f6e5e1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4MTU3OTM0NQ&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080';
      return {
        id: _playlist.id,
        name: _playlist.name,
        image: imageURL,
        href: _playlist.external_urls.spotify,
        tracks: tracks,
      };
    })
  );
  setPlaylists(listsData);
  setIsLoading(false);
}

    
    catchErrors(getLists());
  }, []);

  if(!auth){
    return null;
  }

  return(

    <>
        {isLoading ? (
            <Loader/>
        ):(
            <div id='pl-container'>
            {playlists.map(playlist => {
                return(
                <div className='pl-thumb' key={playlist.id}>
                    <div className='pl-thumb-name'>
                        <a href={playlist.href} target='_blank'>{playlist.name}</a>
                    </div>
        
                    <div className='pl-thumb-data-container'>
        
                        <div className='pl-thumb-img'>
                            <a href={playlist.href} target='_blank'>
                                <img src={playlist.image}/>
                            </a>
                        </div>
        
                    <div className='pl-thumb-tracks'>
                        {playlist.tracks.data.items.map(_track => {
                        return(
                          <div key={_track.track.duration_ms} className='track-lineitem'><span className='track-artist'>{_track.track.artists[0].name}</span> - {_track.track.name} ({msConversion(_track.track.duration_ms)})</div>
                        )
                        })}
                      </div>
                    </div>
        
                    <div className='pl-thumb-prompt-container'>
                        <div className='pl-prompt'>
                        Prompt: this is where the prompt will go.
                        </div>
                    </div>
        
                    <div className='pl-thumb-stats-container'>
                      <div className='pl-thumb-user-container'>
                          <div className='pl-thumb-user-img'>
                            <img src={auth.image}/>
                          </div>
                          <div className='pl-thumb-user-name-container'>
                            <div className='pl-thumb-user-name'>
                                {auth.display_name.toUpperCase()}
                            </div>
                            <div className='pl-thumb-createdAt'>
                                <span className='track-artist'>Created:</span> {dateify(auth.createdAt)} @ {timeify(auth.createdAt)}
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
                                <li key='copyLink' onClick={() => copier(playlist.href)}>Copy Link</li>
        
                                <li key='remove' onClick={unlockPro}>Remove (Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i>)</li>
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
