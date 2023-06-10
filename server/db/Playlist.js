const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, JSON, BOOLEAN, ARRAY } = conn.Sequelize;

const Playlist = conn.define('playlist', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  prompt: {
    type: TEXT
  },
  isDiscoverable: {
    type: BOOLEAN,
    defaultValue: true
  },
  spotId:{
    type: STRING
  },
});

module.exports = Playlist;
