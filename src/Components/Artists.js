import React, { useState, useEffect } from 'react';
import { catchErrors } from '/server/api/utils.js';
import { getTopArtists } from '/server/api/spotify.js';

const Artists = () => {
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
    <div className='App'>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
        />
      </div>
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
    </div>
  );
}

export default Artists;