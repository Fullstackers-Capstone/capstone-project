import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateUser, fetchUsers, fetchSpotUser } from '../store';

const Profile = () => {

    const { auth, users, playlists } = useSelector(state => state);
    const { id } = useParams();

    const [discover, setDiscover] = useState('');

    const dispatch = useDispatch();

    const user = users.find(user => user.id === id);

    useEffect(() => {
        if(user){
            setDiscover(user.discoverPlaylists);
        }
    }, [])

    useEffect(() => {
        dispatch(updateUser({id, discoverPlaylists: discover}));   
    }, [discover])


    const discoverToggle = () => {
        setDiscover((current) => !current);
    }

    if(!user){
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
            <h1><span className='prof-title'>Discover Playlists?</span> { user.discoverPlaylists.toString() } <button onClick={ () => discoverToggle() }>{(discover === true) ? 'Toggle off' : 'Toggle on'}</button></h1>
            <img src={ image }/>
        
        </div>
    )
}

export default Profile;