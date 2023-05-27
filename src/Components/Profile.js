import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCurrentUserProfile } from '../../server/api/spotify';

const Profile = () => {

    const { auth, users } = useSelector(state => state);

    const user = users.find(user => user.spotifyId === auth.id);

    if(!user){
        return null;
    }

    const spotUsername = auth.display_name;
    const spotEmail = auth.email;
    const image = auth.images[0].url;
    
    return(
        <div>
            <h1>Profile - { spotUsername }</h1>
            <h1>{ spotEmail }</h1>
            <img src={ image }/>
            <Link to='/'>GO BACK</Link>
        </div>
    )
}

export default Profile;