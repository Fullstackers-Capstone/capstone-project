import React, { useState, useEffect } from 'react';
import { catchErrors } from '/server/api/utils.js';
import { getTopArtists } from '/server/api/spotify.js';

const TopArtists = () => {

  const [topArtists, setTopArtists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {

      const userTopArtists = await getTopArtists();
      setTopArtists(userTopArtists.data);
      
    };

    catchErrors(fetchData());
  }, []);

  console.log(topArtists);
  return (
    <div className="top-artists">
      {topArtists ? (
        <ul className='grid-container'>
          {topArtists.items.map((item, i) => (
            <li key={i}>
              <div className='avatar'>
                <img src={item.images[0].url} alt={item.name} />
              </div>
            </li>
       
          ))}
        </ul>
      ) : (
        <h1>no artists</h1>
      )}
    </div>
  );
}

export default TopArtists;

/*

{artists.map((artist, i) => (
          <li className="grid__item" key={i}>
            <div className="grid__item__inner">
              {artist.images[0] && (
                <div className="grid__item__img">
                  <img src={artist.images[0].url} alt={artist.name} />
                </div>
              )}
              <h3 className="grid__item__name overflow-ellipsis">{artist.name}</h3>
              <p className="grid__item__label">Artist</p>
            </div>
          </li>
        ))}

*/