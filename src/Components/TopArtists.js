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

  return (
    <div className="test">
      { topArtists ? (
        <ul className='grid-container'>
          { topArtists.items.map((item, i) => (
            <li key={ i }>
              <div className='avatar'>
                <img src={ item.images[0].url } alt={ item.name } />
              </div>
            </li>
          )) }
        </ul>
      ) : (
        <h1>
          no artists
        </h1>
      ) }
    </div>
  );
}

export default TopArtists;