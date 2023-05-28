import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../server/api/spotify';
import { createUser } from '../store'
import Searcher from './Searcher';

const Home = () => {

  const { users, auth } = useSelector(state => state);
  const [selectedUser, setSelectedUser] = useState([]);

  /* 5.28 Ryan's code
  const [selectedUser, setSelectedUser] = useState([]);
  */

  const dispatch = useDispatch();

  const user = users.find(user => user.spotifyId === auth.id);

  useEffect(() => {
      if(!user){
        const email = auth.email;
        const spotifyId = auth.id
        dispatch(createUser({ email, spotifyId }))   
        }
  }, [auth])

  // const user = users.find(user => user.spotifyId === auth.id);

  // useEffect(() => {
  //     if(!user){
  //       const email = auth.email;
  //       const spotifyId = auth.id
  //       dispatch(createUser({ email, spotifyId }))   
  //       }
  // }, [auth])

  /* 5.28 Ryan's code
  useEffect(() => {
    const user = users.find(user => user.spotifyId === auth.id);
    if(user){
        setSelectedUser(user);
    } else {
      const email = auth.email;
      const spotifyId = auth.id;
      dispatch(createUser({ email, spotifyId }));
    }},[users])
  */

  if(!user){
      return null;
  }

  /* 5.28 Ryan's code

    if(!selectedUser){
      return null;
  }

  */

  return(
    <div>
    <Searcher/>
    </div>
  )


  /* 5.28 Ryan's code
  
  return(
    <div className='App'>
    <div className="logout-container">
      <Link to={`/users/${selectedUser.id}`}>Profile</Link>
      <Link to={`/users/${user.id}`}>Profile</Link>
      <Link to={`/users/${selectedUser.id}`}>Profile</Link>
      <Link to={`/users/${user.id}`}>Profile</Link>
    </div>
    <Searcher/>
    </div>
  )
  */

};
export default Home;
