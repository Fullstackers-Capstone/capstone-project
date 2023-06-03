import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserPlaylists, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';

const Discover = () => {

  const { auth } = useSelector(state => state);
  const [playlists, setPlaylists] = useState([]);

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

  useEffect(() => {
    const getLists = async() => {

    const lists = await getCurrentUserPlaylists(5);

    const listsData = await Promise.all(
      lists.data.items.map(async (_playlist) => {
        const tracks = await getPlaylistTracks(_playlist.id)
        return {
          id: _playlist.id,
          name: _playlist.name,
          image: _playlist.images[0].url,
          href: _playlist.external_urls.spotify,
          tracks: tracks
        };
      })
    );
  
      setPlaylists(listsData);
    }
    catchErrors(getLists());
  }, []);

  if(!auth){
    return null;
  }

  return(

    <div id='pl-container'>
      {playlists.map(playlist => {
        return(
          <div className='pl-thumb' key={playlist.id}>
            <div className='disc-thumb-name'>
              {playlist.name}
            </div>

            <div className='disc-thumb-data-container'>

                <div className='pl-thumb-img'>
                    <a href={playlist.href}>
                        <img src={playlist.image}/>
                    </a>
                </div>

              <div className='pl-thumb-tracks'>
                {playlist.tracks.data.items.map(_track => {
                return(
                  <div key={_track.id} className='track-lineitem'><span className='disc-track-artist'>{_track.track.artists[0].name}</span> - {_track.track.name} ({msConversion(_track.track.duration_ms)})</div>
                )
                })}
              </div>
            </div>

            <div className='disc-thumb-prompt-container'>
                Prompt: this is where the prompt will go.
            </div>

            <div className='disc-thumb-stats-container'>
              <div className='pl-thumb-user-container'>
                  <div className='pl-thumb-user-img'>
                    <img src={auth.image}/>
                  </div>
                  <div style={{color: 'black'}}className='pl-thumb-user-name'>
                    {auth.display_name.toUpperCase()}
                  </div>
              </div>
              <div className='dist-thumb-ellipsis-container'>
              <ul className='ellipsis-dropdown'>
                    <button>
                        <i style={{color: 'black'}} class="fa-solid fa-angle-down"></i>
                    </button>
                    <ul className='ellipsis-dropdown-content'>
                        <li key='spotOpen'>
                            <a href={`spotify:playlist:${playlist.id}`}>
                                Open in Spotify App <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                        </li>
                        <li key='copyLink' onClick={() => copier(playlist.href)}>Copy Link</li>
                    </ul>
                    
                </ul>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
};

export default Discover;
