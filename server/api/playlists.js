const express = require('express');
const app = express.Router();
const { Playlist, User } = require('../db');

app.get('/', async (req, res, next) => {
    try{
        res.send(await Playlist.findAll({
            order: [['createdAt', 'DESC']]
        }));
    }
    catch(err){
        next(err);
    }
})


app.get('/:id', async (req, res, next) => {
    try{
        const id = req.params.id;
        const user = await User.findOne({
            where: {
                spotifyId: id
            }
        })
        res.send(await Playlist.findOne({
            where: {
                userId: user.id
            }
        }))
    }
    catch(err){
        next(err);
    }
})

app.post('/', async(req, res, next) => {
    try{
        res.send(await Playlist.create(req.body));
    }
    catch(err){
        next(err);
    }
})

app.put('/:id', async(req, res, next) => {
    try{
        const playlist = await Playlist.findByPk(req.params.id);
        res.status(201).send(await playlist.update(req.body));
    }
    catch(err){
        next(err);
    }
})

app.delete('/:id', async(req, res, next) => {
    try{

    const playlist = await Playlist.findByPk(req.params.id);

    await playlist.destroy();
    res.sendStatus(204);
    }
    catch(err){
      next(err);
    }
  })

module.exports = app;
