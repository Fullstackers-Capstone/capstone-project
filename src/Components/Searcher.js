import React, { useState, useEffect } from 'react';
import { catchErrors } from '../../server/api/utils';

const Searcher = () => {
  const [searchKey, setSearchKey] = useState('');
  const [artists, setArtists] = useState([]);

  const searchArtist = async () => {
    
    if (!searchKey) {
      setArtists([]);
      return;
    }

    try {
      const searchResults = await searchArtists(searchKey);
      const artistData = await Promise.all(
        searchResults.map(async (artist) => {
          const artistInfo = await getArtistInfo(artist.id);
          return {
            name: artistInfo.name,
            image: artistInfo.images.length ? artistInfo.images[0].url : null,
          };
        })
      );

      setArtists(artistData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      searchArtist();
    };
    catchErrors(fetchData());
  }, [searchKey]);

  return (
    <div>
      <div className="search-bar">
        <input
          className="Name"
          type="text"
          placeholder="Search By Artist Name ..."
          onChange={(e) => {
            setSearchKey(e.target.value);
            if (e.target.value === '') {
              setArtists([]);
            }
          }}
        />
        <button onClick={ searchArtist }>
          Search
        </button>
      </div>
      <div className="top-artists">
        <div className="grid-container">
          { artists.map((artist, index) => (
            <div className="avatar" key={ index }>
              <img src={ artist.image } alt={ `Artist ${ index + 1 }` } />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Searcher;