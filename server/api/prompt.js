const express = require('express');
const app = express.Router();
const { Prompt } = require('../db');
const { isLoggedIn } = require('./middleware');
const { Configuration, OpenAIApi } = require('openai');
const { Op } = require('sequelize');

module.exports = app;

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY,
});



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
       const prompt = 'hi';
        console.log(req.body, req.query, req.headers);

    //     const openai = new OpenAIApi(configuration);

    //     const response = await openai.createChatCompletion({
    //         model: 'gpt-3.5-turbo',
    //         messages: [{ role: "user", content: `${prompt}`}],

    //         max_tokens: 500,
    //         temperature: 0.8,
    //         top_p: 1.0,
    //         frequency_penalty: 0.0,
    //         presence_penalty: 0.0,
            
    //     })
    //     return res.status(200).json({
    //         success: true,
    //         data: response.data.choices[0].message.content
    //     })
    }
    catch(error){
        return res.status(400).json({
            success: false,
            error: error.response
            ? error.response.data
            : 'An error occurred on the server.'
        })
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

