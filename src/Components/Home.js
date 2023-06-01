import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../server/api/spotify';
import { createUser } from '../store'
import Searcher from './Searcher';
const Home = () => {

  const { auth } = useSelector(state => state);

  const dispatch = useDispatch();

  if(!auth){
    return null;
  }

  return(
    <div className='App'>
      <Searcher/>
    </div>
  )
};

export default Home;
