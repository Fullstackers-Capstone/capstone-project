import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse, getJSONResponse, createPrompt } from '../store';
import Searcher from './Searcher';
import { getTopTracks, addTracksToPlaylist } from '../../server/api/spotify';
//import { createPlaylistTest } from '../store';

const TopTracks = () => {
  const dispatch = useDispatch();
  const { prompt, auth } = useSelector((state) => state);
  const [input, setInput] = useState('');
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    async function getUserTopTracks() {
      if (auth.id) {
        const response = await getTopTracks();
        setTopTracks(response.data.items.map((track) => ({ ...track, selected: false })));
      }
    }
    getUserTopTracks();
  }, [auth]);

  const submit = (ev) => {
    ev.preventDefault();
    dispatch(getResponse(input));
  };

  const handleTrackSelection = (index) => {
    setTopTracks((prevTracks) => {
      const updatedTracks = [...prevTracks];
      updatedTracks[index].selected = !updatedTracks[index].selected;
      return updatedTracks;
    });
  };

  const parseResponseString = (responseString) => {
    const regex = /"(.*?)" by (.*?)(?=,|$)/g;
    const tracks = [];
    let match;
    while ((match = regex.exec(responseString))) {
      tracks.push({ name: match[1], artists: [{ name: match[2] }], selected: false });
    }
    return tracks;
  };

  useEffect(() => {
    if (prompt.length > 0) {
      const parsedTracks = parseResponseString(prompt[0].response);
      setTopTracks(parsedTracks);
    }
  }, [prompt]);

  const createPlaylists = async () => {
    const selectedTracks = topTracks.filter((track) => track.selected);
    const trackURIs = selectedTracks.map((track) => track.uri);

    console.log('Selected Tracks:', selectedTracks);
    console.log('Track URIs:', trackURIs);
    
    try {
      const playlist = await createPlaylistTest(
        auth.spotifyId,
        'My Playlist',
        'Playlist created from selected tracks'
      );
      const playlistId = playlist.id;

      await addTracksToPlaylist(playlistId, trackURIs);

      console.log('Playlist created and tracks added');
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="prompt-container">
      <form onSubmit={submit}>
        <input onChange={(ev) => setInput(ev.target.value)}></input>
        <button className="styled-logout-button">Test</button>
      </form>
      <div className="prompt-element">
        </div>

        <div className="messages">
          {prompt.map((_prompt) => {
            return (
              <div key={_prompt.id} id={_prompt.id}>
              </div>
            );
          })}
        </div>
  
        <ul className="track-list">
          {topTracks.map((track, index) => (
            <li key={index} className="track-item">
              <input
                type="checkbox"
                checked={track.selected}
                onChange={() => handleTrackSelection(index)}
              />
              <span>
                {track.name} by {track.artists[0].name}
              </span>
            </li>
          ))}
        </ul>
  
        <button onClick={createPlaylists}>Create Playlist</button>
      </div>
    );
  };
  
  export default TopTracks;