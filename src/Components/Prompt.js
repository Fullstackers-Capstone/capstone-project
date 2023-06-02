import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse } from '../store';
import Searcher from './Searcher';

const Prompt = () => {
  const dispatch= useDispatch();
  const { prompt } = useSelector(state => state);
  const [input,setInput] = useState('');

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
      <button onClick={()=> {dispatch(getResponse(`
                                                  You are an assistant that only responds in JSON. 
                                                  Create a list of ten unique songs.
                                                  Include "id", "title", "artist", "album" 
                                                  in your response. An example response is: "
                                                  [
                                                    {
                                                        "id": 1,
                                                        "title": "Hey Jude",
                                                        "artist": "The Beatles",
                                                        "album": "The Beatles (White Album)",
                                                        "duration": "4:56"
                                                    }
      ]".`))}}>JSON Playlist</button>
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