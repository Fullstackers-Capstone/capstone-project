import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getJSONResponse, setSpotifyURIs, createDBPlaylist, updateAuth} from '../store';
import { getTopTracks, getTopArtists } from '../../server/api/spotify';
import Loader from './Loader';

const Prompt = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { prompt, auth } = useSelector(state => state);
  const [input, setInput] = useState('');
  const [jsonResponse, setJsonResponse] = useState('');
  const [testClicked, setTestClicked] = useState(false);
  const [showExamplePrompts, setShowExamplePrompts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectAllLabel, setSelectAllLabel] = useState('Select All');
  const [playlistName, setPlaylistName] = useState('');
  const [editNameToggle, setEditNameToggle] = useState(true);
  const [trackCount, setTrackCount] = useState(10)

  localStorage.setItem("newUserId", auth.id);
  localStorage.setItem("authDiscoverable", auth.discoverPlaylists);

  //creates the prompt when user selects an option, creates prompt no spotifyURIs
  const submit = async (ev) => {
    ev.preventDefault();
    setTestClicked(true);
    setSelectedItems([]);
    setSelectAll(false);
    setSelectAllLabel("Select All");
    setIsLoading(true);
    localStorage.setItem("trackCount", trackCount);

    await dispatch(getJSONResponse('songs that fit the following criteria', trackCount, input, auth.discoverPlaylists));
    
    setIsLoading(false);
    setShowExamplePrompts(false);
    setInput('');
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
    await dispatch(setSpotifyURIs(currentPrompt, selectedResponses))
    createPlaylist();
  };

  //creates playlist and navigates to the component
  const createPlaylist = async () => {
    await dispatch(createDBPlaylist(auth,currentPrompt, input, navigate))
    auth.playlistCount += 1;
    await dispatch(updateAuth(auth));
  };

  const promptObject = JSON.parse(currentPrompt.name || '{}');
  const playlistNameTest = promptObject.playlistName;

  const selectPromptOption = (text) => {
    setInput(text);
  };

  const selectTopArtists = async() => {
    const request = await getTopArtists();
    const artists = request.data.items.map(artist => artist.name).join(', ')
    const text = `Songs that sound like ${ artists }`;
    setInput(text);
  };


  const selectTopTracks = async() => {
    const request = await getTopTracks();
    const tracks = request.data.items.map(track => `${ track.name } by ${ track.artists[0].name }`).join(', ');
    const text = `Songs that sound like these songs: ${ tracks }`;
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

  const handlePlaylistNameChange = (event) => {
    const newPlaylistName = event.target.value;
    setPlaylistName(newPlaylistName);

    // Update the playlist name in the promptObject
    setCurrentPrompt((prevPrompt) => {
      const newPrompt = { ...prevPrompt };
      const promptObject = JSON.parse(newPrompt.name || '{}');
      promptObject.playlistName = newPlaylistName;
      newPrompt.name = JSON.stringify(promptObject);
      return newPrompt;
    });
  };

  const toggleNameInput = () => {
    setEditNameToggle(false);
  }

  const saveName = async(ev) => {
    ev.preventDefault();
    setEditNameToggle(true);
  }

  return (
    <div id='prompt-outer-container'>

      <div id='pl-container' style={{marginTop: '2rem'}}>

        <div className='create-header'>
          Create 
          <span style={{ color: 'white', marginLeft: '.5rem' }}>
            Playlist
          </span>
        </div>

        <div className='pl-thumb' key={ auth.id }>

          <div className='pl-thumb-name' id='prompt-input-container'>

            <div className='prompt-input-left'>
              <div className='prompt-input-left-title'>
                Prompt
              </div>
              <div className='prompt-input-left-content'>
                <input autoFocus className="prompt-input" placeholder="e.g. Playlist for a morning commute" value={ input } onChange={ (ev) => { setInput(ev.target.value) } } />
              </div>
            </div>

            <div className='prompt-input-right'>
              <div className='prompt-input-right-inner'>
                <div className='prompt-input-right-title'>
                  Count
                </div>
                <div className='prompt-input-right-content'>
                  <select className='prompt-track-count' value={ trackCount } onChange={ ev => setTrackCount(ev.target.value) }>
                    <option value={ 10 }>
                      5+ Tracks
                    </option>
                    <option value={ 18 }>
                      10+ Tracks
                    </option>
                    <option value={ 23 }>
                      15+ Tracks
                    </option>
                  </select>
                </div>
              </div>
              <div className='create-playlist-button-container'>
                <button className="create-playlist-button" onClick={ submit }>
                  Create Playlist
                </button>
              </div>
            </div>

          </div>

          { isLoading ? (
            <div className='prof-prompt-container'>
              <div className='prof-prompt' id='create-example-prompts-window'>
                <div className='discoverable-container' id='create-example-prompts-container'>
                  <div className='discoverable-title' id='create-example-prompts'>
                    <Loader/>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {testClicked && Array.isArray(jsonResponse) && jsonResponse.length > 0 && (
                <>

                  <div className='try-again'>
                    <i className="fa-solid fa-triangle-exclamation" style={{ color: 'gold', marginRight: '.5rem' }}></i>
                    Playlist not what you expected? Try again with slightly different language to see how you can improve your results.
                  </div>

                  <div className='prof-prompt-container'>
                    <div className='prof-prompt' id='create-example-prompts-window'>
                      <div className='discoverable-container' id='create-example-prompts-container'>
                        <div className='discoverable-title' id='create-example-prompts'>

                          <div className='aiplaylist-name-container'>

                            { editNameToggle ? (
                              <div className='aiplaylist-name-edit'>
                                <div className='aiplaylist-name-left'>
                                  <div className='aiplaylist-name-title'>
                                    Playlist Name:
                                  </div>
                                  <div className='aiplaylist-name-content'>
                                    { playlistNameTest }
                                  </div>
                                </div>
                                <button className='playlist-new-button' onClick={ toggleNameInput }>
                                  Edit
                                </button>
                              </div>
                            ) : (
                              <div className='aiplaylist-name-save'>
                                <div className='aiplaylist-name-left'>
                                  <div className='aiplaylist-name-title'>
                                    Playlist Name:
                                  </div>
                                  <div className='aiplaylist-name-content'>
                                    <input
                                    className="playlist-header"
                                    type="text"
                                    value={ playlistNameTest }
                                    onChange={ handlePlaylistNameChange }
                                    />
                                  </div>
                                </div>
                                <button className='playlist-new-button' onClick={ saveName }>
                                  SAVE
                                </button>
                              </div>  
                            )}

                          </div>

                          <div className='aitracklist-container'>
                            <div className='aitracklist-left'>
                              <div className='tracklisting-title'>
                                Tracklisting
                              </div>
                              <div className='tracks-to-include'>
                                (select tracks to include)
                              </div>
                            </div>
                            <div className='aitracklist-right'>
                              <button className="playlist-new-button"onClick={ toggleSelectAll }>
                                  { selectAll ? 'Deselect All' : 'Select All' }
                              </button>
                            </div>
                          </div>


                          <div className='outer-playlist-container'>
                            <div className='playlist-container show-all'>
                              { jsonResponse.map((response, index) => (
                                <div 
                                  className={ `playlist-item ${ selectedItems.includes(index) ? 'selected' : '' }` } 
                                  key={ index } 
                                  onClick={ () => toggleItemSelection(index) }
                                >
                                  <div className="playlist-item-info">
                                    <div className="playlist-item-row">
                                      <span className='playlist-item-artist'>
                                        <span style={{ fontWeight: '600', color: 'white', marginRight: '.25rem' }}>
                                          { (index + 1) }.
                                        </span> 
                                        <span style={{ fontWeight: '500' }}>
                                          { response.artist }
                                        </span>
                                      </span> 
                                      <span className='playlist-item-title'>
                                        { response.title }
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )) }

                              <div className="playlist-generate-button-container">
                                <button
                                  className="get-started" 
                                  id='create-playlist-get-started' 
                                  disabled={ selectedItems.length === 0 }
                                  onClick={ () => handleGeneratePlaylist() }
                                >
                                  Generate 
                                </button>
                              </div>
                            </div>
                          </div>
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) }
        
              {/* {testClicked && Array.isArray(jsonResponse) && jsonResponse.length > 0 && ()} */}

              { showExamplePrompts && (
                <>
                  <div className='prof-prompt-container'>
                    <div className='prof-prompt' id='create-example-prompts-window'>
                      <div className='discoverable-container' id='create-example-prompts-container'>
                        <div className='discoverable-title' id='create-example-prompts'>

                          <div className='example-prompts-title-container'>
                            <div>
                              Example Prompts
                            </div>
                          </div>

                          <div className='outer-playlist-container'>

                            <div className="prompt-options with-arrow" onClick={ () => selectPromptOption('Music for Chill Relaxing Vibes') }>
                              Music for Chill Relaxing Vibes
                            </div>

                            <div className="prompt-options with-arrow" onClick={ () => selectPromptOption('Top 10 Artists from the 1990s') }>
                              Top 10 Artists from the 1990s
                            </div>

                            <div className="prompt-options with-arrow" onClick={ () => selectPromptOption('Music for a Beach Party') }>
                              Music for a Beach Party
                            </div>

                            <div className="prompt-options with-arrow" onClick={ () => selectPromptOption('Dinner Party Tunes') }>
                              Dinner Party Tunes
                            </div>

                            <div className="prompt-options with-arrow" onClick={ () => selectPromptOption('Songs to Help Me Focus') }>
                              Songs to Help Me Focus
                            </div>

                            { auth.proUser ? (
                              <> 
                                <div className ='pro-prompts-title-container'>  
                                  <div>
                                    Pro Prompts
                                  </div> 
                                </div>
                                <div className="prompt-options with-arrow" onClick={ () => selectTopArtists() }>
                                  Using Your Top Spotify Artists
                                </div> 

                                <div className="prompt-options with-arrow" onClick={ () => selectTopTracks() }>
                                  Using on Your Top Spotify Tracks
                                </div> 
                              </>
                            ) : '' }

                          </div>  
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) }

            </>
          ) }
          <div className='prof-bottom-container'></div>
        </div>
      </div>
    </div>
  );
};

export default Prompt;
