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
  const [jsonTopTracks, setJsonTopTracks] = useState('');


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
          const arr = [];
          result.data.items.forEach( track => {
            arr.push({"id" : track.id,"title": track.name,"artist": track.artists[0].name,"album": track.album.name,"duration": track.duration_ms})
          })
          console.log(arr);
          setJsonTopTracks(arr);
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
      <button onClick={()=> {dispatch(getJSONResponse(10, JSON.stringify(jsonTopTracks)))}}>Given JSON</button>
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