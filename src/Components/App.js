import React, { useState, useEffect } from 'react';
import { BsSpotify } from 'react-icons/bs';

const App = ()=> {
  const [token, setToken] = useState("")

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
  const API_KEY = "90cf07e1add84bc8a5376ebbf4fa784c"
  const redirectUri = "http://localhost:3000"
  const scopes = ['playlist-modify-public'];
  const url = `https://accounts.spotify.com/authorize?client_id=${API_KEY}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  //const url = `https://accounts.spotify.com/authorize?client_id=${process.env.API_KEY}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`;
  window.location = url;
};

const spotifyLogout = () => {
  window.localStorage.removeItem("token")
  window.location = "http://localhost:3000"
};

  return (
    <div className="App">
      <header className="App-header">
      <h1>Spotify AI <BsSpotify /></h1>
                {token ? 
                <div>
                  <h1>Hey</h1>
                  <button onClick={spotifyLogout}>Log Out</button>
                </div>
                : <button onClick={spotifyLogin}>Login To Start</button>  }
      </header>
    </div>
  );
};

export default App;
