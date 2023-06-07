import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getCurrentUserPlaylists, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const Discover = () => {

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

  const dateify = (unicode) => {
    return unicode.slice(0, 10);
  }

  const timeify = (unicode) => {
    return unicode.slice(11, 16);
  }

  const unlockPro = () => {
    navigate('/unlock-pro');
  }

  useEffect(() => {
    const getLists = async() => {

    setIsLoading(true);

    const lists = await getCurrentUserPlaylists(5);

    const listsData = await Promise.all(
      lists.data.items.map(async (_playlist) => {
        const tracks = await getPlaylistTracks(_playlist.id)
        return {
          id: _playlist.id,
          name: _playlist.name,
          image: _playlist.images[0].url,
          href: _playlist.external_urls.spotify,
          tracks: tracks,
          added_at: _playlist.added_at
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
          <div className='disc-thumb-name'>
            {playlist.name}
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
                <div key={_track.track.duration_ms} className='track-lineitem'><span className='disc-track-artist'>{_track.track.artists[0].name}</span> - {_track.track.name} ({msConversion(_track.track.duration_ms)})</div>
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
                        <span className='disc-track-artist'>Created:</span> {dateify(auth.createdAt)} @ {timeify(auth.createdAt)}
                    </div>
                  </div>
              </div>

          <div className='pl-thumb-ellipsis-container'>

              <ul className='ellipsis-dropdown'>
                  <button>
                      <i className="fa-solid fa-angle-down"></i>
                  </button>
                  <ul className='ellipsis-dropdown-content'>
                      <li key='spotOpen'>
                          <a href={`spotify:playlist:${playlist.id}`}>
                              Open in Spotify App <i className="fa-solid fa-arrow-up-right-from-square"></i>
                          </a>
                      </li>
                      <li key='copyLink' onClick={() => copier(playlist.href)}>Copy Link</li>

                      <li key='remove' onClick={unlockPro}>Remove (Pro <i className="fa-solid fa-lock fa-xs" style={{marginLeft: '.25rem'}}></i>)</li>
                  </ul>
                  
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

export default Discover;
