import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUserPlaylists, getPlaylistTracks } from '../../server/api/spotify';
import { catchErrors } from '../../server/api/utils';

const Discover = () => {

  const { auth } = useSelector(state => state);
  const [playlists, setPlaylists] = useState([]);

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
          <div id='pl-thumb' key={playlist.id}>
            <div id='disc-thumb-name'>
              {playlist.name}
            </div>

            <div id='disc-thumb-data-container'>

              <div id='pl-thumb-img'>
                <a href={playlist.href}>
                  <img src={playlist.image}/>
                </a>
              </div>
              <div id='pl-thumb-tracks'>
                {playlist.tracks.data.items.map(_track => {
                return(
                  <div key={_track.id}><span className='track-artist'>{_track.track.artists[0].name}</span> - {_track.track.name}</div>
                )
                })}
              </div>
            </div>

            <div id='disc-thumb-stats-container'>
              <div id='pl-thumb-user-container'>
                  <div id='pl-thumb-user-img'>
                    <img src={auth.image}/>
                  </div>
                  <div id='pl-thumb-user-name'>
                    {auth.display_name.toUpperCase()}
                  </div>
              </div>
              <div id='pl-thumb-elipses-container'>
                    <button>...</button>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
};

export default Discover;
