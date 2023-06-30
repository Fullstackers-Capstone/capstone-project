const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, BOOLEAN } = conn.Sequelize;

const Playlist = conn.define('playlist', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  prompt:{
    type: TEXT
    },
  name: {
    type: STRING
  },
  isDiscoverable: {
    type: BOOLEAN,
    defaultValue: true
  },
  spotId:{
    type: STRING
  },
  userSpotId:{
    type: STRING
  }
});

module.exports = Playlist;