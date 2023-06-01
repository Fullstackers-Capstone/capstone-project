import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateUser, fetchUsers, fetchSpotUser } from '../store';
import Switch from '@mui/material/Switch';

const Profile = () => {

    const { auth, users, playlists } = useSelector(state => state);
    const [discover, setDiscover] = useState(null);
    const [selectedUser, setSelectedUser] = useState([]);

    const dispatch = useDispatch();

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
