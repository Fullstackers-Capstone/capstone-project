import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getResponse, getJSONResponse, setSpotifyURIs, createDBPlaylist} from '../store';
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
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllLabel, setSelectAllLabel] = useState('Select All');

  

  //creates the prompt when user selects an option, creates prompt no spotifyURIS
  const submit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    await dispatch(getJSONResponse('songs that fit the following criteria', 10, input, auth.discoverPlaylists));
    setIsLoading(false);
    setTestClicked(true);
    setShowExamplePrompts(false);
    setInput("");
  };



  //get the current prompt after it is created
  useEffect(() => {
    if (prompt.length > 0){
      setCurrentPrompt(prompt[prompt.length-1]);
      const currentPrompt = prompt[prompt.length-1];
      setJsonResponse(currentPrompt.response);
    } 
  }, [prompt])


 

  //adds uriList to prompt after user selects songs
  const handleGeneratePlaylist = async() => {
    const selectedResponses = selectedItems.map((index) => jsonResponse[index]);
    console.log('look here motherfucker',selectedResponses);
    await dispatch(setSpotifyURIs(currentPrompt, selectedResponses))
    createPlaylist();
  };

  //creates playlist and navigates to the component
  const createPlaylist = async () => {
  await dispatch(createDBPlaylist(auth,currentPrompt, input, navigate))
;
  };

  const goBack = () => {
    setShowExamplePrompts(true);
    setTestClicked(false);
    setSelectedItems([]);
    setShowAllTracks(false);
    setTestClicked(false);
    setSelectAll(false);
    setSelectAllLabel("Select All");
  };

  const selectPromptOption = (text) => {
    setInput(text);
  };

  const toggleItemSelection = (index) => {
    setSelectedItems((prevSelectedItems) => {
      if (selectAll) {
        // If "Select All" is clicked, toggle the selection of the clicked item
        if (prevSelectedItems.includes(index)) {
          const updatedSelectedItems = prevSelectedItems.filter((item) => item !== index);
          if (updatedSelectedItems.length === 0) {
            setSelectAll(false);
            setSelectAllLabel('Select All');
          }
          return updatedSelectedItems;
        } else {
          return [...prevSelectedItems, index];
        }
      } else {
        // Normal toggle behavior when "Select All" is not clicked
        if (prevSelectedItems.includes(index)) {
          const updatedSelectedItems = prevSelectedItems.filter((item) => item !== index);
          if (updatedSelectedItems.length === 0) {
            setSelectAll(false);
            setSelectAllLabel('Select All');
          }
          return updatedSelectedItems;
        } else {
          const updatedSelectedItems = [...prevSelectedItems, index];
          if (updatedSelectedItems.length === jsonResponse.length) {
            setSelectAll(true);
            setSelectAllLabel('Deselect All');
          }
          return updatedSelectedItems;
        }
      }
    });
  };
  
  const toggleSelectAll = () => {
    setSelectedItems((prevSelectedItems) => {
      if (selectAll) {
        setSelectAll(false);
        setSelectAllLabel('Select All');
        return [];
      } else {
        setSelectAll(true);
        setSelectAllLabel('Deselect All');
        return Array.from(Array(jsonResponse.length).keys());
      }
    });
  };

  return (
    <div id='prompt-outer-container'>

<div id='pl-container' style={{marginTop: '2rem'}}>

            <div className='pl-thumb' key={auth.id}>
            <div className='pl-thumb-name' id='prompt-input-container'>
            <form style={{width: '100%'}} onSubmit={submit}>
              <input className="prompt-input" value={input} onChange={(ev) => { setInput(ev.target.value) }}></input>
              <button className="create-playlist-button">Create Playlist</button>
            </form>
            </div>

            <div className='prof-prompt-container'>
                <div className='prof-prompt' id='create-example-prompts-window'>

                <div className='discoverable-container' id='create-example-prompts-container'>
                    <div className='discoverable-title' id='create-example-prompts'>
                    {isLoading ? (
        <Loader />
      ) : (
        <>
          {testClicked && Array.isArray(jsonResponse) && jsonResponse.length > 0 && (
            <div className={`playlist-container ${showAllTracks ? 'show-all' : ''}`}>
              <h2 className="playlist-header">Playlist</h2>
  
              {jsonResponse.map((response, index) => (
                <div className={`playlist-item ${selectedItems.includes(index) ? 'selected' : ''}`} key={index} onClick={() => toggleItemSelection(index)}>
                  <div className="playlist-item-info">
                    <div className="playlist-item-row">
                      <div className="playlist-item-title">{response.title}</div>
                    </div>
                    <div className="playlist-item-artist">{response.artist}</div>
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
                  className="playlist-generate-button" disabled={selectedItems.length === 0}
                  onClick={() => handleGeneratePlaylist()}
                >
                  Generate Playlist
                </button>
                <button className="styled-logout-button"onClick={toggleSelectAll}>
        {selectAll ? 'Deselect All' : 'Select All'}
      </button>
              </div>
            </div>
          )}
  
          {showExamplePrompts && (
            <>

            <div className='example-prompts-title-container'>

            <div>
                Example Prompts
            </div>

            </div>
              <div className="prompt-options with-arrow" onClick={() => selectPromptOption('Music for chill relaxing vibes')}>
                Music for chill relaxing vibes
              </div>
              <div className="prompt-options with-arrow" onClick={() => selectPromptOption('Top 10 artists from the 1990s')}>
                Top 10 artists from the 1990s
              </div>
              <div className="prompt-options with-arrow" onClick={() => selectPromptOption('Music for a beach party')}>
                Music for a beach party
              </div>
              <div className="prompt-options with-arrow" onClick={() => selectPromptOption('Dinner Party tunes')}>
                Dinner Party tunes
              </div>
              <div className="prompt-options with-arrow" onClick={() => selectPromptOption('Grad party playlist!')}>
                Grad party playlist!
              </div>
            </>
          )}
        </>
      )}
                    </div>
                </div>
                </div>
            </div>

            <div className='prof-bottom-container'>
              
            </div>
        </div>
        
        </div>
    </div>
  )
  
  
};

export default Prompt;


/*

SELECT ALL


*/