const express = require('express');
const app = express.Router();
const spotifyService = require('./spotifyService');
const { Playlist, User } = require('../db');

app.post('/', async (req, res, next) => {
  try {
    const { userId, name, description } = req.body;
    if (!userId || !name || !description) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    const playlist = await spotifyService.createPlaylist(userId, name, description);

    const createdPlaylist = await Playlist.create(playlist);

    res.send(createdPlaylist);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

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