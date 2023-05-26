const express = require('express');
const app = express.Router();
const { User } = require('../db');

app.get('/', async(req, res, next) => {
    try{
        res.send(await User.findAll());
    }
    catch(err){
        next(err);
    }
})

app.post('/', async(req, res, next) => {
    try{
        console.log('hello');
      const user = await User.create(req.body);
      res.send(user);
    }
    catch(err) {
      next(err);
    }
  })

module.exports = app;