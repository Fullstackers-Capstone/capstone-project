// const express = require('express');
// const app = express.Router();
// const { isLoggedIn } = require('./middleware');
// const { Op } = require('sequelize');

// const { Prompt, User } = require('../db');

// module.exports = app;


// app.get('/', async(req, res, next) => {
//     try{
//         res.send(await Prompt.findAll());
//     }
//     catch(err){
//         next(err);
//     }
// })

// app.post('/', async( req, res, next) => {    
//     try{
//       console.log(req.headers);
//       const user = await User.findBySpotifyId(req.headers.spotifyid);

//       const prompt = await Prompt.create({userPrompt: req.body.prompt, userId: user.id});


//       await prompt.askChatGPT()
//       res.send(prompt);
//     }
//     catch(ex){
//       next(ex);
//     }
// });

// app.post('/json', async (req, res, next) => {
//   try {
//     console.log(req.headers);
//     const user = await User.findBySpotifyId(req.headers.spotifyid);
//     const userPrompt = `You are an assistant that only responds in JSON. 
//     Create a list of ${req.body.length} unique songs similar to the following 
//     playlist: "${req.body.spotifyData}". Remember you only respond in JSON do not respond in the playlist format.  Include "id", "title", "artist", "album" 
//     in your response.  An example response is: "
//     [
//       {
//           "id": 1,
//           "title": "Hey Jude",
//           "artist": "The Beatles",
//           "album": "The Beatles (White Album)",
//           "duration": "4:56"
//       }
//     ]". You must respond only in JSON.`;

//     const prompt = await Prompt.create({
//       userPrompt: userPrompt,
//       userId: user.id,
//     });

//     await prompt.askChatGPT();
//     prompt.response = req.body.spotifyData;
//     await prompt.save();

//     res.send(prompt);
//   } catch (ex) {
//     next(ex);
//   }
// });


//   app.get('/',  async(req, res, next)=> {
//     try {
//       res.send(Prompt.findAllBySpotifyId(req.headers.spotifyid));
//     }
//     catch(ex){
//       next(ex);
//     }
//   }); 
  
  
//   app.delete('/', isLoggedIn, async(req, res, next)=> {
//       try {
//         const prompt = await Prompt.findById(req.prompt.id); 
//         await prompt.destroy();
  
//         res.send(200);
//       }
//       catch(ex){
//         next(ex);
//       }
//     });

// module.exports = app;

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
      //console.log(req.headers);
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
    //here we are creating the response using the prompt, and the response is the recommended songs
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

