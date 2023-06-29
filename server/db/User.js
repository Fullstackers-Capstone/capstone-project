const conn = require('./conn');
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN, INTEGER } = conn.Sequelize;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const JWT = process.env.JWT;


const User = conn.define('user', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4
  },
  spotifyId: {
    type: STRING,
    unique: true
  },
  // display_name: {
  //   type: STRING,
  // },
  // email: {
  //   type: STRING,
  //   validate: {
  //     isEmail: true
  //   },
  // },
  // image: {
  //   type: STRING,
  // },
  playlistCount: {
    type: INTEGER,
    defaultValue: 0
  },
  discoverPlaylists: {
    type: BOOLEAN,
    defaultValue: true
  },
  proUser: {
    type: BOOLEAN,
    defaultValue: false
  }
});



User.addHook('beforeSave', async(user)=> {
  if(user.changed('password')){
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function(token){
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

User.findBySpotifyId = async function(id){
  try {
    const user = await this.findOne({
      where: {
        spotifyId: id
      }
    });

    if(user){
      return user;
    }
    throw 'user not found';
  }
  catch(ex){
    const error = new Error('bad credentials');
    error.status = 401;
    throw error;
  }
}

User.prototype.generateToken = function(){
  return jwt.sign({ id: this.id }, JWT);
};

User.authenticate = async function({ username, password }){
  const user = await this.findOne({
    where: {
      username
    }
  });
  if(user && await bcrypt.compare(password, user.password)){
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error('bad credentials');
  error.status = 401;
  throw error;
}

//6/1 MAURICIO

User.prototype.getPlaylist =  async function(){
  const getPlaylist = await conn.models.playlist.findAll({
    where: {
      userId: this.id
    }
  })
  return getPlaylist
}

module.exports = User;