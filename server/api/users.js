const express = require('express');
const app = express.Router();
const { User } = require('../db');

app.get('/', async(req, res, next) => {
  try{
      const users = await User.findAll();
      console.log('list of users', users)
      
      res.send(users);
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
    const user = await User.findOne({
      where: {
        email: req.body.email
      }
    });
    if(user){
      res.send(user);
    } else {
      res.send(await User.create(req.body));
    }

  }
  catch(err) {
    next(err);
  }
})

app.put('/upgradeToPro', async( req, res, next) => {    
  try{
    const user = await User.findBySpotifyId(req.body.spotifyId);
    user.proUser = true;
    await user.save();

    res.send(user);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/:id', async(req, res, next) => {
  try{
    const user = await User.findByPk(req.params.id);
    res.status(201).send(await user.update(req.body));
  }
  catch(err){
    next(err);
  }
})

module.exports = app;