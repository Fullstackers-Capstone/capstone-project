const express = require('express');
const app = express.Router();
const { Playlist } = require('../db');

app.get('/', async (req, res, next) => {
    try{
        res.send(await Playlist.findAll());
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