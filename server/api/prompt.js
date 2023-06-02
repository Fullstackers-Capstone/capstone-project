const express = require('express');
const app = express.Router();
const { isLoggedIn } = require('./middleware');
const { Op } = require('sequelize');

const { Prompt, User } = require('../db');

module.exports = app;


app.get('/', async(req, res, next) => {
    try{
        res.send(await Prompt.findAll());
    }
    catch(err){
        next(err);
    }
})

app.post('/', async( req, res, next) => {    
    try{
      console.log(req.headers);
      const user = await User.findBySpotifyId(req.headers.spotifyid);

      const prompt = await Prompt.create({userPrompt: req.body.prompt, userId: user.id});


      await prompt.askChatGPT()
      res.send(prompt);
    }
    catch(ex){
      next(ex);
    }
});

app.post('/json', async( req, res, next) => {    
  try{
    console.log(req.headers);
    const user = await User.findBySpotifyId(req.headers.spotifyid);

    const userPrompt = `You are an assistant that only responds in JSON. 
    Create a list of ${req.body.length} unique songs similar to the following 
    playlist: "${req.body.spotifyData}". Include "id", "title", "artist", "album" 
    in your response. An example response is: "
    [
      {
          "id": 1,
          "title": "Hey Jude",
          "artist": "The Beatles",
          "album": "The Beatles (White Album)",
          "duration": "4:56"
      }
    ]".`

    const prompt = await Prompt.create({userPrompt: userPrompt, userId: user.id});


    await prompt.askChatGPT()
    res.send(prompt);
  }
  catch(ex){
    next(ex);
  }
});


  app.get('/',  async(req, res, next)=> {
    try {
      res.send(Prompt.findAllBySpotifyId(req.headers.spotifyid));
    }
    catch(ex){
      next(ex);
    }
  }); 
  
  
  
  app.delete('/', isLoggedIn, async(req, res, next)=> {
      try {
        const prompt = await Prompt.findById(req.prompt.id); 
        await prompt.destroy();
  
        res.send(200);
      }
      catch(ex){
        next(ex);
      }
    });

module.exports = app;

