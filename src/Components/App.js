import React, { useState, useEffect } from 'react';
import { BsSpotify } from 'react-icons/bs';

const App = ()=> {
  const [token, setToken] = useState("")
  const redirectUri = "http://localhost:3000"
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

const spotifyLogout = () => {
  window.localStorage.removeItem("token")
  window.location = redirectUri
};

  return (
    <div className="App">
      <header className="App-header">
      <h1>Serenade<BsSpotify /></h1>
                {token ? 
                <div>
                  <h1>Hey</h1>
                  <button onClick={spotifyLogout}>Log Out</button>
                </div>
                : <a href={`https://accounts.spotify.com/authorize?client_id=${window.client_id}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}`}>Log In</a>}
      </header>
    </div>
  );
};

export default App;
