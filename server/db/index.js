const conn = require('./conn');
const User = require('./User');
const Playlist = require('./Playlist');
const Prompt = require('./Prompt');

Playlist.belongsTo(User); // sets up the foreign key for UserId
Prompt.belongsTo(User);
User.hasMany(Playlist);
User.hasMany(Prompt);

const syncAndSeed = async()=> {
  await conn.sync({force: true});
};

module.exports = {
  syncAndSeed,
  User,
  Playlist,
  Prompt
};