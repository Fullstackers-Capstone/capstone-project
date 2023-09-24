# Serenade &nbsp; <img src="https://img.shields.io/badge/Spotify-1DB954?style=for-the-badge&logo=spotify&logoColor=white" /> &nbsp; <img src="https://img.shields.io/badge/Open%20AI-black?style=for-the-badge&logo=openai&logoColor=white" />

A web app that integrates openAI's DaVinci speech model & Spotify's API to interpret user prompts and turn them into creative Spotify playlists.

Users can provide any descriptor or reference to generate a Spotify playlist that's immediately ready for use in-app, along with the ability to customize their results and discover playlists from other users.
</br>
</br>

### Installation

```
npm i
npm run start:dev
```

Create a file named 'env.js' in your root directory with the following parameters:
```
process.env.client_id='[YOUR SPOTIFY DEV DASHBOARD CLIENT ID]'
process.env.client_secret='[YOUR SPOTIFY DEV DASHBOARD CLIENT SECRET]'
process.env.redirect_uri='[YOUR SPOTIFY DEV DASHBOARD REDIRECT URI]'
process.env.frontend_uri='[YOUR SPOTIFY DEV DASHBOARD FRONT-END URI]'
process.env.OPEN_AI_KEY = '[YOUR OPEN AI API KEY]'
process.env.stripe_test = '[YOUR STRIPE API KEY]'
```
If you don't have a Spotify API key, go to https://developer.spotify.com/ to create an account and generate the above parameters.

Go to https://openai.com/product to create an Open AI API key.

Go to https://stripe.com/docs/development to create a Stripe API key.

</br>

### Technology Stack

<p display='inline'>
  <img src="https://img.shields.io/badge/JavaScript-grey?style=for-the-badge&logo=javascript" />
  <img src="https://img.shields.io/badge/React.js-00509f?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Redux.js-764ABC?style=for-the-badge&logo=redux" />
  <img src="https://img.shields.io/badge/Node.js-005800?style=for-the-badge&logo=nodedotjs" />
  <img src="https://img.shields.io/badge/Express.js-black?style=for-the-badge&logo=express" />
  <img src="https://img.shields.io/badge/PostgreSQL-e3e3e3?style=for-the-badge&logo=postgresql" />
  <img src="https://img.shields.io/badge/Sequelize-0081d5?style=for-the-badge&logo=sequelize" />
  <img src="https://img.shields.io/badge/React%20Router-00509f?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Spotify%20API-black?style=for-the-badge&logo=spotify" />
  <img src="https://img.shields.io/badge/Open%20AI%20API-black?style=for-the-badge&logo=openai" />
  <img src="https://img.shields.io/badge/HTML-dfaa86?style=for-the-badge&logo=html5" />
  <img src="https://img.shields.io/badge/Vanilla%20CSS-f5d301?style=for-the-badge&logo=css3" />
  <img src="https://img.shields.io/badge/Material%20UI-e3e3e3?style=for-the-badge&logo=mui" />
</p>
