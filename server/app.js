const express = require('express');
const app = express();
app.engine('html', require('ejs').renderFile);
const path = require('path');
const querystring = require('querystring');
const axios = require('axios');
const port = 8888;
const client_id= process.env.client_id;
const client_secret = process.env.client_secret;
const redirect_uri = process.env.redirect_uri;
const frontend_uri = process.env.frontend_uri;
const { User } = require('./db');
module.exports = app;
app.use(express.json({limit: '50mb'}));

app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.use('/static', express.static(path.join(__dirname, '../static')));
app.use('/api/users', require('./api/users'));
app.use('/api/auth', require('./api/auth'));
//6/1 MT added playlists
app.use('/api/playlists', require('./api/playlists'));
app.use('/api/prompt', require('./api/prompt'))
app.get('/', (req, res) => {
    res.render(
      path.join(__dirname, '../static/index.html'),
      { client_id : process.env.client_id });
});

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};
  
  const stateKey = 'spotify_auth_state';
  
  app.get('/login', (req, res) => {
    const state = generateRandomString(16);
    //what is this for? look into it
    res.cookie(stateKey, state);
  
    const scope = [
      'user-read-private',
      'user-read-email',
      'user-top-read'
    ].join(" ")
  
    const queryParams = querystring.stringify({
      client_id: client_id,
      response_type: 'code',
      redirect_uri: redirect_uri,
      state: state,
      scope: scope,
    });
  
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
  });

  app.get('/callback', async (req, res) => {
    const code = req.query.code || null;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
    })
      .then(async response => {
        if (response.status === 200) {
          const { access_token, refresh_token, expires_in } = response.data;
  
          const queryParams = querystring.stringify({
            access_token,
            refresh_token,
            expires_in
          });

          const spotifyAxios = axios.create({
            baseURL: 'https://api.spotify.com/v1',
            timeout: 5000,
            headers: {
              'Authorization': `Bearer ${access_token}`,
              'Content-Type': 'application/json'
              //'Authorization': 'token <your-token-here> -- https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token'
            }
          });

          const spotUserData = await spotifyAxios.get('/me');

          const user = await User.findOne({
            where: {
              spotifyId: spotUserData.data.id
            }
          });
          
          if(!user){
            await User.create({email: spotUserData.data.email, spotifyId: spotUserData.data.id, display_name: spotUserData.data.display_name, followerCount: spotUserData.data.followers.total, image: spotUserData.data.images[0].url });

          } else {

            if(spotUserData.data !== user){
              await user.update({
                display_name: spotUserData.data.display_name, 
                email: spotUserData.data.email, followerCount: spotUserData.data.followers.total, 
                image: spotUserData.data.images[0].url || null})
            }

          }

          // console.log(spotUserData);

          //redirect to react app
          res.redirect(`${frontend_uri}/?${queryParams}`);
        } else {
          //send an error, redirect to error query
          res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`);
        }
      })
      .catch(error => {
        res.send(error);
      });
  });

  app.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;
  
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
    })
      .then(response => {
        res.send(response.data);
      })
      .catch(error => {
        res.send(error);
      });
  });
app.listen(port, () => {
    console.log(`listening on port ${port}`)
})