const conn = require('./conn');
const User = require('./User');
const Playlist = require('./Playlist');
const Prompt = require('./Prompt');

Playlist.belongsTo(User); // sets up the foreign key for UserId
Prompt.belongsTo(User);
User.hasMany(Playlist);
User.hasMany(Prompt);

const syncAndSeed = async()=> {
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({ username: 'moe', password: '123'}),
    User.create({ username: 'lucy', password: '123' }),
    User.create({ username: 'larry', password: '123' }),
    User.create({ username: 'ethyl', password: '123' }),
  ]);
  return {
    users: {
      moe,
      lucy,
      larry
    }
  };
};
module.exports = {
  syncAndSeed,
  User,
  Playlist,
  Prompt
};
