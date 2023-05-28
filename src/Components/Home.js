import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createUser } from '../store'
import Searcher from './Searcher';

const Home = () => {

  const { users, auth } = useSelector(state => state);
  const [selectedUser, setSelectedUser] = useState([]);

  const dispatch = useDispatch();

  const user = users.find(user => user.spotifyId === auth.id);

  useEffect(() => {
      if(!auth){
        const email = auth.email;
        const spotifyId = auth.id
        dispatch(createUser({ email, spotifyId }))   
      }
  }, [auth])

  /* 5.28 Ryan's code

  // const user = users.find(user => user.spotifyId === auth.id);

  // useEffect(() => {
  //     if(!user){
  //       const email = auth.email;
  //       const spotifyId = auth.id
  //       dispatch(createUser({ email, spotifyId }))   
  //       }
  // }, [auth])

  useEffect(() => {
    const user = users.find(user => user.spotifyId === auth.id);
    if(user){
        setSelectedUser(user);
    } else {
      const email = auth.email;
      const spotifyId = auth.id;
      dispatch(createUser({ email, spotifyId }));
    }},[users])

     if(!selectedUser){
      return null;

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
  }
  */

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
