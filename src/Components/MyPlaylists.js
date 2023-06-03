import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserPlaylists, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';

const MyPlaylists = () => {

  const { auth } = useSelector(state => state);
  const [playlists, setPlaylists] = useState([]);

  function msConversion(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }


  useEffect(() => {
    const getLists = async() => {

    const lists = await getCurrentUserPlaylists(5);

    const listsData = await Promise.all(
      lists.data.items.map(async (_playlist) => {
        const tracks = await getPlaylistTracks(_playlist.id)
        console.log(tracks);
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

  console.log(playlists)


  if(!auth){
    return null;
  }

  return(

    <div id='pl-container'>
      {playlists.map(playlist => {
        return(
        <div className='pl-thumb' key={playlist.id}>
            <div className='pl-thumb-name'>
              {playlist.name}
            </div>

            <div className='pl-thumb-data-container'>

                <div className='pl-thumb-img'>
                    <a href={playlist.href}>
                        <img src={playlist.image}/>
                    </a>
                </div>


            <div className='pl-thumb-tracks'>
                {playlist.tracks.data.items.map(_track => {
                return(
                  <div key={_track.id} className='track-lineitem'><span className='track-artist'>{_track.track.artists[0].name}</span> - {_track.track.name} ({msConversion(_track.track.duration_ms)})</div>
                )
                })}
              </div>
            </div>

            <div className='pl-thumb-prompt-container'>
                Prompt: this is where the prompt will go.
            </div>

            <div className='pl-thumb-stats-container'>
              <div className='pl-thumb-user-container'>
                  <div className='pl-thumb-user-img'>
                    <img src={auth.image}/>
                  </div>
                  <div className='pl-thumb-user-name'>
                    {auth.display_name.toUpperCase()}
                  </div>
              </div>
              <div className='pl-thumb-ellipsis-container'>
                <a href={playlist.href} target='_blank'>Open in Spotify <i className="fa-solid fa-arrow-up-right-from-square"></i></a>
              </div>
            </div>
        </div>
        )
      })}
    </div>
  )
};

export default MyPlaylists;
