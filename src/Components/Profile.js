import React from 'react';

import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Profile = () => {

    const { auth } = useSelector(state => state);

    const spotUsername = auth.display_name;
    const spotEmail = auth.email;

    if(!auth){
        return null;
    }
    
    return(
        <div>
            <h1>Profile - {spotUsername}</h1>
            <h1>{spotEmail}</h1>
            <Link to='/'>GO BACK</Link>
        </div>
    )
}

export default Profile;