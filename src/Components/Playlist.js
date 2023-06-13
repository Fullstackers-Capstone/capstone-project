import React from 'react';
import { useSelector } from 'react-redux';

const Playlist = () => {
    const { auth, playlists } = useSelector(state => state);

    if(!auth){
        return null;
    }

    return (
        <div className="playlist">
            <img className="playlist-art" src="https://images.unsplash.com/photo-1659259540528-0240ad70e92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NjAwNjE4MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" alt="Playlist Art" />
            <div>
                <h3 className="playlist-name">Playlist Name Placeholder</h3>
                <div className="user-info">
                    <img className="user-profile-pic" src={auth.image} alt="User Profile" />
                    <div className="user-name">{auth.display_name}</div>
                </div>
            </div>
            {
                playlists.map(_playlist => {
                    const json = JSON.parse(_playlist.playlistJSON);
                    return <div><a href={json.external_urls.spotify}>See on spotify  </a> </div>
                })
            }
        </div>
    );
}

export default Playlist;



// const Playlist = ({ playlist }) => {
//     const { auth } = useSelector(state => state);

//     if(!playlist || !auth){
//         return null;
//     }

//     return (
//         <div className="playlist">
//             <img className="playlist-art" src="https://images.unsplash.com/photo-1659259540528-0240ad70e92a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY4NjAwNjE4MA&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1080" alt="Playlist Art" />
//             <div className="playlist-info">
//                 <div className="playlist-name">{playlist.name}</div>
//                 <div className="user-name">{auth.display_name}</div>
//                 <img className="user-profile-pic" src={auth.image} alt="User Profile" />
//             </div>
//         </div>
//     );
// }

// export default Playlist;
