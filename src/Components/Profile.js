import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { updateAuth } from '../store';
import Switch from '@mui/material/Switch';

const Profile = () => {

    const { auth, playlists } = useSelector(state => state);
    const [discover, setDiscover] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if(auth){
            setDiscover(auth.discoverPlaylists);
        } 
    }, [auth])

    useEffect(() => {
        if(auth){
        dispatch(updateAuth({id: auth.id, discoverPlaylists: discover}));   
        }
    }, [discover])


    const discoverToggle = () => {
        setDiscover((current) => !current);
    }

    if(!playlists){
        return null;
    }
    if(!auth){
        return null;
    }
    
    return(
        <div>
            <h1><span className='prof-title'>Profile</span>: ({ auth.display_name.toUpperCase() })</h1>
            <h1><span className='prof-title'>Spotify User ID</span>: ({ auth.spotifyId.toUpperCase() })</h1>
            <h1><span className='prof-title'>Email</span>: { auth.email }</h1>
            <h1><span className='prof-title'>Spotify Follower Count</span>: { auth.followerCount }</h1>
            <h1><span className='prof-title'>Serenade Playlist Count</span>: { auth.playlistCount }</h1>
            <h1><span className='prof-title'>Discover Playlists?</span> 
            <Switch checked={discover} onClick={() => discoverToggle()}/></h1>
            <img src={ auth.image }/>
        </div>
    )
}
export default Profile;
