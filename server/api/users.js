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

app.get('/:id', async(req, res, next) => {
  try{
    res.send(await User.findByPk(req.params.id));
  }
  catch(err){
    next(err);
  }
})

app.post('/', async(req, res, next) => {
    try{
      res.send(await User.create(req.body));
    }
    catch(err) {
      next(err);
    }
  })

module.exports = app;