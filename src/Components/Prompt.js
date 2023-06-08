
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
      <button onClick={()=> {dispatch(getJSONResponse('similar songs to the following playlist', 5, stringTopTracks))}}>Given JSON</button>
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