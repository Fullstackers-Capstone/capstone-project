import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateUser, fetchUsers, fetchSpotUser } from '../store';
import Switch from '@mui/material/Switch';

const Profile = () => {
  const { auth, users, playlists } = useSelector((state) => state);
  const [discover, setDiscover] = useState("");

/* 5.28 Ryan's code
  const [discover, setDiscover] = useState(null);
*/

  const [selectedUser, setSelectedUser] = useState([]);

  const dispatch = useDispatch();

  const user = users.find((user) => user.spotifyId === auth.id);

  useEffect(() => {
    if (user) {
        setDiscover(user.discoverPlaylists);
    }
  }, [user]);

  useEffect(() => {
    if (user && discover !== user.discoverPlaylists) {
      dispatch(updateUser({ id: user.id, discoverPlaylists: discover }));
    }
  }, [discover, dispatch, user]);

  const discoverToggle = () => {
    setDiscover((current) => !current);
  };

  if (!user) {
    return null;
  }

  /* 5.28 Ryan's code
useEffect(() => {
        const user = users.find(user => user.spotifyId === auth.id);
        if(user){
            setSelectedUser(user);
            setDiscover(user.discoverPlaylists)
        } 
    }, [users])

    useEffect(() => {
        if(selectedUser){
        dispatch(updateUser({id: selectedUser.id, discoverPlaylists: discover}));   
        }
    }, [discover])

    const discoverToggle = () => {
        setDiscover((current) => !current);
    }

    if(!selectedUser){
        return null;
    }
*/


  if (!playlists) {
    return null;
  }

  if (!auth) {
    return null;
  }

  const spotUsername = auth.display_name;
  const spotEmail = auth.email;
  const image = auth.images[0].url;
  const followerCount = auth.followers.total;

  return (
    <div>
      <h1>
        <span className="prof-title">Profile</span>: ({spotUsername.toUpperCase()})
      </h1>
      <h1>
        <span className="prof-title">Email</span>: {spotEmail}
      </h1>
      <h1>
        <span className="prof-title">Follower Count</span>: {followerCount}
      </h1>
      <h1>
        <span className="prof-title">Playlist Count</span>: {playlists.length}
      </h1>
      <h1>
        <span className='prof-title'>Discover Playlists?</span> 
        <Switch checked={discover} onClick={() => discoverToggle()}/>
    </h1>
      <img src={image} alt="User profile" />
    </div>
  );
};

/* 5.28 MT code 

      <h1>
        <span className="prof-title">Discover Playlists?</span>{' '}
        {user.discoverPlaylists.toString()}{' '}
        <button onClick={discoverToggle}>{discover ? 'Toggle off' : 'Toggle on'}</button>
      </h1>

*/

export default Profile;


/*
import React, { useState, useEffect, useRef } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateUser, fetchUsers, fetchSpotUser } from '../store';

import Switch from '@mui/material/Switch';

const Profile = () => {

    const { auth, users, playlists } = useSelector(state => state);

    const [discover, setDiscover] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);

    const dispatch = useDispatch();

    const user = users.find(user => user.spotifyId === auth.id);
    
    useEffect(() => {
        const user = users.find(user => user.spotifyId === auth.id);
        if(user){
            setDiscover(user.discoverPlaylists);
        }
    }, [user])

    const isFirstRender = useRef(true);

    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
          }

        if (user) {
          dispatch(updateUser({ id: user.id, discoverPlaylists: discover }));
        }
      }, [discover, dispatch, user]);

    const discoverToggle = () => {
        setDiscover((current) => !current);
    }

    if(!selectedUser){
        return null;
    }

    if(!playlists){
        return null;
    }

    if(!auth){
        return null;
    }

    const spotUsername = auth.display_name;
    const spotEmail = auth.email;
    const image = auth.images[0].url;
    const followerCount  = auth.followers.total;

    return(
        <div>
            <h1><span className='prof-title'>Profile</span>: ({ spotUsername.toUpperCase() })</h1>
            <h1><span className='prof-title'>Email</span>: { spotEmail }</h1>
            <h1><span className='prof-title'>Follower Count</span>: { followerCount }</h1>
            <h1><span className='prof-title'>Playlist Count</span>: { playlists.length }</h1>
            <h1><span className='prof-title'>Discover Playlists?</span> 
            <Switch checked={discover} onClick={() => discoverToggle()}/></h1>
            <img src={ image }/>
        </div>
    )
}
export default Profile;
*/