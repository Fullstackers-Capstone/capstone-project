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
      const user = await User.findBySpotifyId(req.headers.spotifyid);
      const prompt = await Prompt.create({userPrompt: req.body.prompt, userId: user.id});


      await prompt.askChatGPT()
      res.send(prompt);
    }
    catch(ex){
      next(ex);
    }
});

app.post('/json', async (req, res, next) => {
  try {
    const user = await User.findBySpotifyId(req.headers.spotifyid);
    const userPrompt = ` You are an assistant that can only responds in JSON.
    Do not respond with any text or response, just JSON. 
    Include "id", "title", "artist", "album" in your response.
     An example response is: [{"id": 1,"title": "Hey Jude","artist": "The Beatles","album": "The Beatles (White Album)","duration": "4:56"}].
      Create a list of ${req.body.length} ${req.body.prompt} "${req.body.spotifyData}". `;

    const namePrompt = `You are an assistant that can only responds in JSON
    Create a unique & cheeky playlist name in under 5 words based on the following prompt: ${req.body.prompt}. An example response is
    '{ "playlistName": "playlist name"}'`
  

    const userInput = req.body.spotifyData

    const prompt = await Prompt.create({
      userPrompt: userPrompt,
      userId: user.id,
      userInput,
    });

    await prompt.askChatGPT();
    await prompt.generateName(namePrompt);
    await prompt.save();

    res.send(prompt);
  } catch (ex) {
    next(ex);
  }
});

app.put('/', async (req, res, next) => {
  try {
   
    const prompt =await Prompt.findByPk(req.body.prompt.id)

    const uriList = req.body.prompt.uriList;   
    prompt.uriList = uriList;
    await prompt.update();


    res.send(prompt);
  } catch (ex) {
    next(ex);
  }
});

app.put('/created', async (req, res, next) => {
  try {
   
    const prompt =await Prompt.findByPk(req.body.prompt.id)
    const isCreated = req.body.prompt.isCreated;   
    prompt.isCreated = isCreated;
    await prompt.update();
    res.send(prompt);
  } catch (ex) {
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

/* BEFORE 6/10 MT UPDATES


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

app.post('/json', async (req, res, next) => {
  try {
    const user = await User.findBySpotifyId(req.headers.spotifyid);
    const userPrompt = ` You are an assistant that can only responds in JSON. 
    Include "id", "title", "artist", "album" in your response. 
     An example response is: "[{"id": 1,"title": "Hey Jude","artist": "The Beatles","album": "The Beatles (White Album)","duration": "4:56"}]".
      Create a list of ${req.body.length} ${req.body.prompt} "${req.body.spotifyData}". `;

    const prompt = await Prompt.create({
      userPrompt: userPrompt,
      userId: user.id,
    });

    await prompt.askChatGPT();
    await prompt.save();

    res.send(prompt);
  } catch (ex) {
    next(ex);
  }
});

app.put('/', async (req, res, next) => {
  try {
   
    const prompt =await Prompt.findByPk(req.body.prompt.id)
    const uriList = req.body.prompt.uriList;   
    prompt.uriList = uriList;
    await prompt.update();


    res.send(prompt);
  } catch (ex) {
    next(ex);
  }
});

app.put('/created', async (req, res, next) => {
  try {
   
    const prompt =await Prompt.findByPk(req.body.prompt.id)
    const isCreated = req.body.prompt.isCreated;   
    prompt.isCreated = isCreated;
    await prompt.update();
    res.send(prompt);
  } catch (ex) {
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

*/
