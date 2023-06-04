const express = require('express');
const app = express.Router();
const { Playlist, User } = require('../db');

app.get('/', async (req, res, next) => {
    try{
        res.send(await Playlist.findAll());
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

module.exports = app;




/* Pre 6/2 MT updates

const express = require('express');
const app = express.Router();
const { Playlist, User } = require('../db');

app.get('/', async (req, res, next) => {
    try{
        res.send(await Playlist.findAll());
    }
    catch(err){
        next(err);
    }
})

// 6/1 MT
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

module.exports = app;


*/