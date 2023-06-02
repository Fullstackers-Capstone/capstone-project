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
      
      console.log(req.body.prompt);
      const prompt = await Prompt.create({userPrompt: req.body.prompt});
    

      await prompt.askChatGPT()
      res.send(prompt);
    }
    catch(ex){
      next(ex);
    }
});


  app.get('/', isLoggedIn, async(req, res, next)=> {
    try {
      res.send(Prompt.findAllByToken(req.user));
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

