import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getResponse, getJSONResponse, getSpotifyURIs, createDBPlaylist} from '../store';
import Searcher from './Searcher';
import { getTopTracks, createPlaylist,  } from '../../server/api/spotify';
import Loader from './Loader';

const Prompt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prompt, auth, playlists } = useSelector(state => state);
  const [input, setInput] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');
  const [testClicked, setTestClicked] = useState(false);
  const [showExamplePrompts, setShowExamplePrompts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [currentPlaylist, setCurrentPlaylist] = useState('');
  const [stringTopTracks, setStringTopTracks] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showAllTracks, setShowAllTracks] = useState(false); // added
  

  //creates the prompt when user selects an option, creates prompt no spotifyURIS
  const submit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    await dispatch(getJSONResponse('songs that fit the following criteria', 5, input, auth.discoverPlaylists));
    setIsLoading(false);
    setTestClicked(true);
    setShowExamplePrompts(false);
  };


  //get the current prompt after it is created
  useEffect(() => {
    if (prompt.length > 0){
      setCurrentPrompt(prompt[prompt.length-1]);
      const currentPrompt = prompt[prompt.length-1];
      setJsonResponse(JSON.parse(currentPrompt.response));
    } 
  }, [prompt])


 

  //adds uriList to prompt after user selects songs
  const handleGeneratePlaylist = async() => {
    const selectedResponses = selectedItems.map((index) => jsonResponse[index]);
    await dispatch(getSpotifyURIs(currentPrompt, selectedResponses))
    createPlaylist();
  };

  //creates playlist and navigates to the component
  const createPlaylist = async () => {
   await dispatch(createDBPlaylist(auth,currentPrompt, input));
   navigate('/');
  };


  const goBack = () => {
    setShowExamplePrompts(true);
    setTestClicked(false);
  };

  const selectPromptOption = (text) => {
    setInput(text);
  };

  const toggleItemSelection = (index) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(index)) {
        return prevSelectedItems.filter((item) => item !== index);
      } else {
        return [...prevSelectedItems, index];
      }
    });
  };

  return (
    <div className='prompt-container'>
      <form onSubmit={submit}>
        <input className="prompt-input" value={input} onChange={(ev) => { setInput(ev.target.value) }}></input>
        <button className="StyledLogoutButton">Test</button>
      </form>
  
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {testClicked && Array.isArray(jsonResponse) && jsonResponse.length > 0 && (
            <div className={`playlist-container ${showAllTracks ? 'show-all' : ''}`}>
              <h2 className="playlist-header">Playlist</h2>
              {jsonResponse.map((response, index) => (
                <div className="playlist-item" key={index}>
                  <div className="playlist-item-info">
                    <div className="playlist-item-row">
                      <div className="playlist-item-title">{response.title}</div>
                    </div>
                    <div className="playlist-item-artist">{response.artist}</div>
                    <div className="playlist-item-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(index)}
                        onChange={() => toggleItemSelection(index)}
                      />
                    </div>
                  </div>
                </div>
              ))}
              {!showAllTracks && (
                <button className='styled-logout-button' onClick={() => setShowAllTracks(true)}>Add More Tracks</button>
              )}
              <div className="playlist-buttons-container">
                <button className="playlist-back-button" onClick={goBack}>
                  Back
                </button>
                <button
                  className="playlist-generate-button"
                  onClick={() => handleGeneratePlaylist()}
                >
                  Generate Playlist
                </button>
              </div>
            </div>
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
  )
  
};

export default Prompt;


// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { getResponse, getJSONResponse, getSpotifyURIs, wasCreated, fetchPlaylists } from '../store';
// import Searcher from './Searcher';
// import { getTopTracks, createPlaylist } from '../../server/api/spotify';
// import Loader from './Loader';

// const Prompt = () => {
//   const dispatch = useDispatch();
//   const { prompt, auth, playlists } = useSelector(state => state);
//   const { jsonResponse } = useSelector(state => state.prompt);
//   const [input, setInput] = useState('');
//   const [topTracks, setTopTracks] = useState('');
//   const [testClicked, setTestClicked] = useState(false);
//   const [showExamplePrompts, setShowExamplePrompts] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [stringTopTracks, setStringTopTracks] = useState('');
//   const [selectedItems, setSelectedItems] = useState([]);


//   useEffect(() => {
//     async function getUserTopTracks() {
//       if (auth.id) {
//         const response = await getTopTracks();
//         setTopTracks(response.data.items.map((track) => track));
//       }
//     }
//     getUserTopTracks();
//   }, [auth]);

//   const submit = async (ev) => {
//     ev.preventDefault();
//     setIsLoading(true);
//     await dispatch(getJSONResponse('songs that fit the following criteria', 5, input, auth.discoverPlaylists));
//     setIsLoading(false);
//     setTestClicked(true);
//     setShowExamplePrompts(false);
//   };

//   const goBack = () => {
//     setShowExamplePrompts(true);
//     setTestClicked(false);
//   };

//   useEffect(() => {
//     const setJson = async () => {
//       if (topTracks && topTracks.length > 0) {
//         let str = '';
//         topTracks.forEach((track) => {
//           if (str.length < 5) {
//             str += `"${track.name}" by ${track.artists[0].name} from ${track.album.name}`;
//           } else {
//             str += `, "${track.name}" by ${track.artists[0].name} from ${track.album.name}`;
//           }
//         });
//         setStringTopTracks(str);
//       }
//     };

//     setJson();
//   }, [topTracks]);

//   const selectPromptOption = (text) => {
//     setInput(text);
//   };

//   const toggleItemSelection = (index) => {
//     setSelectedItems((prevSelectedItems) => {
//       if (prevSelectedItems.includes(index)) {
//         return prevSelectedItems.filter((item) => item !== index);
//       } else {
//         return [...prevSelectedItems, index];
//       }
//     });
//   };

//   const handleGeneratePlaylist = () => {
//     const selectedResponses = selectedItems.map((index) => jsonResponse[index]);
//     console.log(selectedResponses);
//     dispatch(getSpotifyURIs(selectedResponses));
//   };

//   return (
//     <div className='prompt-container'>
//       <form onSubmit={submit}>
//         <input className="prompt-input" value={input} onChange={(ev) => { setInput(ev.target.value) }}></input>
//         <button className="StyledLogoutButton">Test</button>
//       </form>

//       {isLoading ? (
//         <Loader />
//       ) : (
//         <>

// {testClicked && Array.isArray(jsonResponse) && jsonResponse.length > 0 && (
//   <div className="playlist-container">
//     <h2 className="playlist-header">Playlist</h2>
//     {jsonResponse.map((response, index) => (
//       <div className="playlist-item" key={index}>
//         <div className="playlist-item-info">
//           <div className="playlist-item-row">
//             <div className="playlist-item-title">{response.title}</div>
//           </div>
//           <div className="playlist-item-artist">{response.artist}</div>
//           <div className="playlist-item-checkbox">
//             <input
//               type="checkbox"
//               checked={selectedItems.includes(index)}
//               onChange={() => toggleItemSelection(index)}
//             />
//           </div>
//         </div>
//       </div>
//     ))}
//     <div className="playlist-buttons-container">
//       <button className="playlist-back-button" onClick={goBack}>
//         Back
//       </button>
//       <button
//         className="playlist-generate-button"
//         onClick={() => handleGeneratePlaylist()}
//       >
//         Generate Playlist
//       </button>
//     </div>
//   </div>
// )}


//           {showExamplePrompts && (
//             <>
//               <h2 className="options-title">Example Prompts</h2>
//               <div className="options with-arrow" onClick={() => selectPromptOption('Music for chill relaxing vibes')}>
//                 <span className="pl-type-desc">Music for chill relaxing vibes</span>
//               </div>
//               <div className="options with-arrow" onClick={() => selectPromptOption('Top 10 artists from the 1990s')}>
//                 <span className="pl-type-desc">Top 10 artists from the 1990s</span>
//               </div>
//               <div className="options with-arrow" onClick={() => selectPromptOption('Music for a beach party')}>
//                 <span className="pl-type-desc">Music for a beach party</span>
//               </div>
//               <div className="options with-arrow" onClick={() => selectPromptOption('Dinner Party tunes')}>
//                 <span className="pl-type-desc">Dinner Party tunes</span>
//               </div>
//               <div className="options with-arrow" onClick={() => selectPromptOption('Grad party playlist!')}>
//                 <span className="pl-type-desc">Grad party playlist!</span>
//               </div>
//             </>
//           )}
//         </>
//       )}
//     </div>
//   )
// };

// export default Prompt;
