import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getResponse } from '../store';
import Searcher from './Searcher';

const Home = () => {
  const dispatch= useDispatch();
  const { prompt } = useSelector(state => state);
  const [input,setInput] = useState('');

  const submit = (ev) => {
    ev.preventDefault();
    dispatch(getResponse(input));
  }

  return(
    <div className='App'>
    <div className="logout-container">
      <form onSubmit={submit}>
        <input onChange={ (ev) => { setInput(ev.target.value)}}></input>
        <button className="StyledLogoutButton" >Test</button>
      </form>
    </div>
    </div>
  )
};
export default Home;