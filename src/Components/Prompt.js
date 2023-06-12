import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse, getJSONResponse, wasCreated, fetchPlaylists } from '../store';
import Searcher from './Searcher';
import { getTopTracks, createPlaylist } from '../../server/api/spotify';
import Loader from './Loader';

const Prompt = () => {
  const dispatch= useDispatch();
  const { prompt, auth, playlists } = useSelector(state => state);
  const [input,setInput] = useState('');
  const [topTracks, setTopTracks] = useState(''); 
  const [testClicked, setTestClicked] = useState(false);
  const [showExamplePrompts, setShowExamplePrompts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [stringTopTracks, setStringTopTracks] = useState('');
  

  useEffect(() => {
    async function getUserTopTracks() {
      if (auth.id) {
        const response = await getTopTracks();
        setTopTracks(response.data.items.map((track) => track));
      }
    }
    getUserTopTracks();
  }, [auth]);

  const submit = async (ev) => {
    ev.preventDefault();
    setIsLoading(true);
    await dispatch(getJSONResponse('songs that fit the following criteria', 5, input, auth.discoverPlaylists));
    setIsLoading(false);
    setTestClicked(true);
    setShowExamplePrompts(false);
  };
  const goBack = () => {
    setShowExamplePrompts(true);
    setTestClicked(false);
  };
  useEffect(() => {
    const setJson = async () => {
      if (topTracks && topTracks.length > 0) {
        let str = '';
        topTracks.forEach((track) => {
          if (str.length < 5) {
            str += `"${track.name}" by ${track.artists[0].name} from ${track.album.name}`;
          } else {
            str += `, "${track.name}" by ${track.artists[0].name} from ${track.album.name}`;
          }
        });
        setStringTopTracks(str);
      }
    };
  
    setJson();
  }, [topTracks]);
  
  
  const selectPromptOption = (text) => {
    setInput(text);
  };

  const submitTopSpotify = async() => {
    setIsLoading(true);
    await dispatch(getJSONResponse('similar songs to the following playlist', 5, stringTopTracks));
    setIsLoading(false);
  }

  return(
    <div className='prompt-Container'>
      <form  onSubmit={submit}>
        <input className="prompt-input" value = {input} onChange={ (ev) => { setInput(ev.target.value)}}></input>
        <button className="StyledLogoutButton" >Test</button>
      </form>
      
      {isLoading ? (
        <Loader /> 
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
  )
};
export default Prompt;

/* BEFORE 6/10 MT Updates


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse, getJSONResponse, wasCreated } from '../store';
import Searcher from './Searcher';
import { getTopTracks, createPlaylist } from '../../server/api/spotify';

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
              str += `"${track.name}" by ${track.artists[0].name} from ${track.album.name}`;
            }
            else{
              str += `, "${track.name}" by ${track.artists[0].name} from ${track.album.name}`;
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
      <button onClick={async()=> {await dispatch(getJSONResponse('similar songs to the following playlist', 5, stringTopTracks)); }}>Given JSON</button>
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