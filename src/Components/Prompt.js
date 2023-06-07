
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getResponse, getJSONResponse, createPrompt } from '../store';
// import Searcher from './Searcher';
// import { getTopTracks, createPlaylist, addTracksToPlaylist } from '../../server/api/spotify';

// const Prompt = () => {
//   const dispatch = useDispatch();
//   const { prompt, auth } = useSelector((state) => state);
//   const [input, setInput] = useState('');
//   const [topTracks, setTopTracks] = useState([]);

//   useEffect(() => {
//     async function getUserTopTracks() {
//       if (auth.id) {
//         const response = await getTopTracks();
//         setTopTracks(response.data.items.map((track) => ({ ...track, selected: false })));
//       }
//     }
//     getUserTopTracks();
//   }, [auth]);


//   const submit = (ev) => {
//     ev.preventDefault();
//     dispatch(getResponse(input));
//   };

//   const handleTrackSelection = (index) => {
//     setTopTracks((prevTracks) => {
//       const updatedTracks = [...prevTracks];
//       updatedTracks[index].selected = !updatedTracks[index].selected;
//       return updatedTracks;
//     });
//   };

//   const parseResponseString = (responseString) => {
//     const regex = /"(.*?)" by (.*?)(?=,|$)/g;
//     const tracks = [];
//     let match;
//     while ((match = regex.exec(responseString))) {
//       tracks.push({ name: match[1], artists: [{ name: match[2] }], selected: false });
//     }
//     return tracks;
//   };

//   useEffect(() => {
//     if (prompt.length > 0) {
//       const parsedTracks = parseResponseString(prompt[0].response);
//       setTopTracks(parsedTracks);
//     }
//   }, [prompt]);

//   const createPlaylists = async () => {
//     const selectedTracks = topTracks.filter((track) => track.selected);
//     const trackURIs = selectedTracks.map((track) => track.uri);

//     console.log('Selected Tracks:', selectedTracks);
//     console.log('Track URIs:', trackURIs);
    
//     try {
//       const playlist = await createPlaylist(
//         auth.spotifyId,
//         'My Playlist',
//         'Playlist created from selected tracks'
//       );
//       const playlistId = playlist.id;

//       await addTracksToPlaylist(playlistId, trackURIs);

//       console.log('Playlist created and tracks added');
//     } catch (error) {
//       console.error('Error creating playlist:', error);
//     }
//   };

//   return (
//     <div className="prompt-container">
//       <form onSubmit={submit}>
//         <input className="prompt-input" onChange={(ev) => setInput(ev.target.value)}></input>
//         <button className="styled-logout-button">Test</button>
//       </form>
//       <div className="prompt-element">
//         </div>

//         <div className="messages">
//           {prompt.map((_prompt) => {
//             return (
//               <div key={_prompt.id} id={_prompt.id}>
//                 {
//                   <ul>
//                     <li>
//                       {_prompt.response}
//                     </li>
//                   </ul>
//                 }
//               </div>
//             );
//           })}
//         </div>
  
//         <ul className="track-list">
//           {topTracks.map((track, index) => (
//             <li key={index} className="track-item">
//               <input
//                 type="checkbox"
//                 checked={track.selected}
//                 onChange={() => handleTrackSelection(index)}
//               />
//               <span>
//                 {track.name} by {track.artists[0].name}
//               </span>
//             </li>
//           ))}
//         </ul>
  
//         <button className='styled-logout-button' onClick={createPlaylists}>Create Playlist</button>
//       </div>
//     );
//   };
  
//   export default Prompt;

//PROMPTS, ONLY PROBLEM IS URI NOT BEING SENT.

// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getResponse, getJSONResponse, createPrompt } from '../store';
// import { getTopTracks, createPlaylist, addTracksToPlaylist } from '../../server/api/spotify';

// const Prompt = () => {
//   const dispatch = useDispatch();
//   const { prompt, auth } = useSelector((state) => state);
//   const [input, setInput] = useState('');
//   const [topTracks, setTopTracks] = useState([]);
//   const [stringTopTracks, setStringTopTracks] = useState('');

//   useEffect(() => {
//     async function getUserTopTracks() {
//       if (auth.id) {
//         const response = await getTopTracks();
//         setTopTracks(response.data.items.map((track) => ({ ...track, selected: false })));
//       }
//     }
//     getUserTopTracks();
//   }, [auth]);

//   useEffect(() => {
//     let str = '';
//     topTracks.forEach((track, index) => {
//       if (index < 5) {
//         str += `"${track.name}" by ${track.artists[0].name}`;
//       } else {
//         str += `, "${track.name}" by ${track.artists[0].name}`;
//       }
//     });
//     setStringTopTracks(str);
//   }, [topTracks]);

//   const submit = (ev) => {
//     ev.preventDefault();
//     dispatch(getResponse(input));
//   };

//   const handleTrackSelection = (index) => {
//     setTopTracks((prevTracks) => {
//       const updatedTracks = [...prevTracks];
//       updatedTracks[index].selected = !updatedTracks[index].selected;
//       return updatedTracks;
//     });
//   };

//   const parseResponseString = (responseString) => {
//     const regex = /"(.*?)" by (.*?)(?=,|$)/g;
//     const tracks = [];
//     let match;
//     while ((match = regex.exec(responseString))) {
//       tracks.push({ name: match[1], artists: [{ name: match[2] }], selected: false });
//     }
//     return tracks;
//   };

//   useEffect(() => {
//     if (stringTopTracks) {
//       const parsedTracks = parseResponseString(stringTopTracks);
//       setTopTracks(parsedTracks);
//     }
//   }, [stringTopTracks]);


//   const createPlaylists = async () => {
//     const selectedTracks = parseResponseString(stringTopTracks);
//     const trackURIs = selectedTracks.map((track) => track.uri);

//     console.log('Selected Tracks:', selectedTracks);
//     console.log('Track URIs:', trackURIs);
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

