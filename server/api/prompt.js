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

