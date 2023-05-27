import React, { useState, useEffect } from 'react';
import Home from './Home';
import Login from './Login';
import { BsSpotify } from 'react-icons/bs';
import { accessToken, logout } from '/server/api/spotify.js';
import { useDispatch } from 'react-redux';
import { Link, Routes, Route } from 'react-router-dom';
import { fetchUsers, fetchSpotUser } from '../store';
import Profile from './Profile';


const App = () => {

  //set a token and set token from our state
  const [token, setToken] = useState(null);
  const dispatch = useDispatch();
  
  useEffect(() => {
    //set the token once we receive an access token
    setToken(accessToken);    
    dispatch(fetchUsers());
    dispatch(fetchSpotUser());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <h1 className="title">Serenade<BsSpotify/></h1>
      <div className="App">
      {!token && (
        <Login/>
      )
      }
      
      {token && (
        <div>
          <Routes>
            <Route path ='/' element={<Home/>}/>
            <Route path ='/users/:id' element={<Profile/>}/>
          </Routes>
        </div>
      )}
      </div>
      </header>
    </div>
  );
}
export default App;

/*
const App = ()=> {
  const [token, setToken] = useState("");
  const redirectUri = "http://localhost:3000";
  const scopes = ['playlist-modify-public'];

useEffect(() => {
  const hash = window.location.hash
  let token = window.localStorage.getItem("token")
  if (!token && hash) {
      token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", token)
  }
  setToken(token)
}, [])


const spotifyLogin = () => {
  const url = `https://accounts.spotify.com/authorize?client_id=${window.client_id}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  window.location = url;
};

const spotifyLogout = () => {
  window.localStorage.removeItem("token")
  window.location = redirectUri
};

  return (
<div className="App">
  <header className="App-header">
    <h1 className="title">Serenade<BsSpotify/></h1>
    <div className="header-content">
      {token ? (
        <div className="logout-container">
          <button className="StyledLogoutButton" onClick={spotifyLogout}>Log Out</button>
        </div>
      ) : (
        <div className="login-container">
          <button className="StyledLoginButton" onClick={spotifyLogin}>Log In/Register</button>
        </div>
      )}
    </div>
  </header>
</div>
  );
};

export default App;
*/

/* Routes
  <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prompt" element={<Prompt />} />
        <Route path="/create" element={<Create />} />
        <Route path="/playlist:id" element={<Playlist />} />
        <Route path="/singleartist" element={<SingleArtist />} />
        <Route path="/multiartist" element={<MultiArtist />} />
  </Routes>

*/

/* top set up

<div className="App">
  <header className="App-header">
    <h1 className="title">Serenade<BsSpotify /></h1>
      {token ? (
        <div className="logout-container">
          <button className="StyledLogoutButton" onClick={spotifyLogout}>Log Out</button>
        </div>
      ) : (
        <div className="login-container">
          <button className="StyledLoginButton" onClick={spotifyLogin}>Log In/Register</button>
        </div>
      )}
  </header>
</div>


*/
