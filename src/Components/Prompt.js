import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse, getJSONResponse, createPrompt } from '../store';
import Searcher from './Searcher';
import { getTopTracks, createPlaylist, addTracksToPlaylist } from '../../server/api/spotify';
import Loader from './Loader';

const Prompt = () => {
  const dispatch = useDispatch();
  const { prompt, auth } = useSelector((state) => state);
  const [input, setInput] = useState('');
  const [topTracks, setTopTracks] = useState([]);
  const [testClicked, setTestClicked] = useState(false);
  const [showExamplePrompts, setShowExamplePrompts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    async function getUserTopTracks() {
      if (auth.id) {
        const response = await getTopTracks();
        setTopTracks(response.data.items.map((track) => ({ ...track, selected: false })));
      }
    }
    getUserTopTracks();
  }, [auth]);

  const submit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    await dispatch(getResponse(input));
    setIsLoading(false);
    setTestClicked(true);
    setShowExamplePrompts(false);
  };

  const goBack = () => {
    setShowExamplePrompts(true);
    setTestClicked(false);
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
      console.log(parsedTracks);
      setTopTracks(parsedTracks);
    }
  }, [prompt]);

  const createPlaylists = async () => {
    const selectedTracks = topTracks.filter((track) => track.selected);
    const trackURIs = selectedTracks.map((track) => track.uri);

    console.log('Selected Tracks:', selectedTracks);
    console.log('Track URIs:', trackURIs);
    
    try {
      const playlist = await createPlaylist(
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

  const selectPromptOption = (text) => {
    setInput(text);
  };

  return (
    <div className="prompt-container">
      <form onSubmit={submit}>
        <input className="prompt-input" value={input} onChange={(ev) => setInput(ev.target.value)}></input>
        <button className="styled-logout-button">Test</button>
      </form>

      {isLoading ? (
        <Loader /> // Display the loader component while isLoading is true
      ) : (
        <>
          {testClicked && (
            <>
              <div className="messages">
                {prompt.length > 0 && (
                  <div key={prompt[prompt.length - 1].id} id={prompt[prompt.length - 1].id}>
                    <ul>
                      <li>{prompt[prompt.length - 1].response}</li>
                    </ul>
                  </div>
                )}
              </div>
              <button className="styled-logout-button" onClick={goBack}>←</button>
            </>
          )}

          {showExamplePrompts && (
            <>
              <h2 className="options-title">Example Prompts</h2>
              <div className="options with-arrow" onClick={() => selectPromptOption('Music for chill relaxing vibes')}>
                <span className="pl-type-desc">Music for chill relaxing vibes</span>
              </div>
              <div className="options with-arrow" onClick={() => selectPromptOption('Top 10 artists from the 1990s')}>
                <span className="pl-type-desc">Top 10 artists from the 1990s</span>
              </div>
              <div className="options with-arrow" onClick={() => selectPromptOption('Music for a beach party')}>
                <span className="pl-type-desc">Music for a beach party</span>
              </div>
              <div className="options with-arrow" onClick={() => selectPromptOption('Dinner Party tunes')}>
                <span className="pl-type-desc">Dinner Party tunes</span>
              </div>
              <div className="options with-arrow" onClick={() => selectPromptOption('Grad party playlist!')}>
                <span className="pl-type-desc">Grad party playlist!</span>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
  };
  

  export default Prompt;


/* 

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

*/


/* PROMPTS, ONLY PROBLEM IS URI NOT BEING SENT.

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse, getJSONResponse, createPrompt } from '../store';
import { getTopTracks, createPlaylist, addTracksToPlaylist } from '../../server/api/spotify';

const Prompt = () => {
  const dispatch = useDispatch();
  const { prompt, auth } = useSelector((state) => state);
  const [input, setInput] = useState('');
  const [topTracks, setTopTracks] = useState([]);
  const [stringTopTracks, setStringTopTracks] = useState('');

  useEffect(() => {
    async function getUserTopTracks() {
      if (auth.id) {
        const response = await getTopTracks();
        setTopTracks(response.data.items.map((track) => ({ ...track, selected: false })));
      }
    }
    getUserTopTracks();
  }, [auth]);

  useEffect(() => {
    let str = '';
    topTracks.forEach((track, index) => {
      if (index < 5) {
        str += `"${track.name}" by ${track.artists[0].name}`;
      } else {
        str += `, "${track.name}" by ${track.artists[0].name}`;
      }
    });
    setStringTopTracks(str);
  }, [topTracks]);

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
    if (stringTopTracks) {
      const parsedTracks = parseResponseString(stringTopTracks);
      setTopTracks(parsedTracks);
    }
  }, [stringTopTracks]);


  const createPlaylists = async () => {
    const selectedTracks = parseResponseString(stringTopTracks);
    const trackURIs = selectedTracks.map((track) => track.uri);

    console.log('Selected Tracks:', selectedTracks);
    console.log('Track URIs:', trackURIs);
    
    try {
      const playlist = await createPlaylist(
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
        <button
          onClick={() => {
            dispatch(
              getResponse('Give me a playlist of ten random popular songs on Spotify.')
            );
          }}
        >
          Generate Random Playlist
        </button>
        <button
          onClick={() => {
            dispatch(getResponse('List ten random popular artists on Spotify.'));
          }}
        >
          Find Artists
        </button>
        <button onClick={() => dispatch(getJSONResponse(10, stringTopTracks))}>
          Given JSON
        </button>
        <button onClick={createPlaylists}>Create Playlist</button>
        </div>
        <div className="messages">
          {prompt.map((_prompt) => {
            return (
              <div key={_prompt.id} id={_prompt.id}>
                <div className="user-message">{_prompt.userPrompt}</div>
                {typeof _prompt.response === 'object' ? (
                  <div>
                    {Array.isArray(_prompt.response) ? (
                      <ul className="track-list">
                        {_prompt.response.map((track, index) => (
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
                    ) : (
                      <pre>{JSON.stringify(_prompt.response, null, 2)}</pre>
                    )}
                  </div>
                ) : (
                  <div className="chatgpt-message">{_prompt.response}</div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default Prompt;



*/

/* pre 6/4 MT updates


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse, getJSONResponse } from '../store';
import Searcher from './Searcher';
import {  getTopTracks } from '../../server/api/spotify';

const Prompt = () => {
  const dispatch= useDispatch();
  const { prompt, auth } = useSelector(state => state);
  const [input,setInput] = useState('');
  const [topTracks, setTopTracks] = useState(''); 
  const [stringTopTracks, setStringTopTracks] = useState('');


  useEffect(()=> {
    async function getUserTopTracks() {
      if (auth.id){
       return await getTopTracks();
      }
    }
    setTopTracks(getUserTopTracks());

  }, [auth]);

  useEffect(()=> {
    async function setJson(){
      if (await topTracks != ''){
        topTracks.then(function(result) {
          let str = '';
          result.data.items.forEach( track => {
            if (str.length < 5){
              str += `"${track.name}" by ${track.artists[0].name}`;
            }
            else{
              str += `, "${track.name}" by ${track.artists[0].name}`;
            }
          })
          setStringTopTracks(str);
        });
      }
    }
    setJson();

  }, [topTracks]);



  const submit = (ev) => {
    ev.preventDefault();
    dispatch(getResponse(input));
  }


  return(
    <div className='prompt-Container'>
      <form  onSubmit={submit}>
        <input onChange={ (ev) => { setInput(ev.target.value)}}></input>
        <button className="StyledLogoutButton" >Test</button>
      </form>
      <div className='prompt-Element'>
      <button onClick={()=> {dispatch(getResponse('Give me a playlist of ten random popular songs on spotify.'))}}>Generate Random Playlist</button>
      <button onClick={()=> {dispatch(getResponse('List ten random popular artists on spotify.'))}}>Find Artists</button>
      <button onClick={()=> {dispatch(getJSONResponse(10, stringTopTracks))}}>Given JSON</button>
      </div>

      <div className='messages'>
        {
           prompt.map(_prompt => {
              return <div key={_prompt.id} id={_prompt.id}>
                    <div className='userMessage'> { _prompt.userPrompt}</div>
                     <div className='chatgptMessage'>{_prompt.response}</div>
                     </div>
           })
        }


      </div>
      
    </div>
  )
};
export default Prompt;


*/