import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../server/api/spotify';
import { createUser } from '../store'
import Searcher from './Searcher';
const Home = () => {

  const { users, auth } = useSelector(state => state);
  const [selectedUser, setSelectedUser] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = users.find(user => user.spotifyId === auth.id);
    if(user){
        setSelectedUser(user);
    } else {
      const email = auth.email;
      const spotifyId = auth.id;
      dispatch(createUser({ email, spotifyId }));
    }
    }, [users])

  // const user = users.find(user => user.spotifyId === auth.id);

  // useEffect(() => {
  //     if(!user){
  //       const email = auth.email;
  //       const spotifyId = auth.id
  //       dispatch(createUser({ email, spotifyId }))   
  //       }
  // }, [auth])

  if(!selectedUser){
    return null;
  }

  return(
    <div className='App'>
    <div className="logout-container">
      <button className="StyledLogoutButton" onClick={logout}>Log Out</button>
      <Link to={`/users/${selectedUser.id}`}>Profile</Link>
    </div>
    <Searcher/>
    </div>
  )
};
export default Home;



/*

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../store'
import Searcher from './Searcher';

const Home = () => {

  const { users, auth } = useSelector(state => state);

  const dispatch = useDispatch();

  const user = users.find(user => user.spotifyId === auth.id);

  useEffect(() => {
      if(!user){
        const email = auth.email;
        const spotifyId = auth.id
        dispatch(createUser({ email, spotifyId }))   
        }
  }, [user])

  if(!user){
      return null;
  }

  return(
    <div>
    <Searcher/>
    </div>
  )

};
export default Home;

*/
