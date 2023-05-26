import axios from "axios";
import React, { useState } from "react";
import { accessToken } from "../../server/api/spotify";

function Searcher() {
    const [searchKey, setSearchKey] = useState("")
    const [name, setName] = useState([])
    const [image, setImage] = useState([]);
        
    const searchArtist = async () => {
        const { data } = await axios.get("https://api.spotify.com/v1/search", {
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${accessToken}`
          },
          params: {
            q: searchKey,
            type: "artist"
          }
        });
      
        const artists = data.artists.items.map(async (artist) => {
          const artistID = artist.id;
          const artistInfo = await axios.get(`https://api.spotify.com/v1/artists/${artistID}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
          return {
            name: artistInfo.data.name,
            image: artistInfo.data.images[0].url
          };
        });
      
        const artistData = await Promise.all(artists);
        setName(artistData.map(artist => artist.name));
        setImage(artistData.map(artist => artist.image));
      }

    
      return (
        <div className='App'>
          <div className="search-bar">
            <input
              className="Name"
              type="text"
              placeholder="Search By Artist Name ..."
              onChange={(e) => {
                setSearchKey(e.target.value);
                if (e.target.value === '') {
                  setName([]);
                  setImage([]);
                }
              }}
            />
            <button onClick={searchArtist}>Search</button>
          </div>
          <div className="top-artists">
            <div className='grid-container'>
              {image.map((imageUrl, index) => (
                <div className='avatar' key={index}>
                  <img src={imageUrl} alt={`Artist ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      );  
    }
    
    export default Searcher