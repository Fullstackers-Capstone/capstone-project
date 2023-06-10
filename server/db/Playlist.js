const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, JSON, BOOLEAN, ARRAY } = conn.Sequelize;

const Playlist = conn.define('playlist', {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  prompt: {
    type: TEXT
  },
  tracks: {
    type: ARRAY(STRING),
    // allowNull: false,
    // validate: {
    //   notEmpty: true,
    // },
  },
  image: {
    type: STRING,
    allowNull: true,  // Allow null if image is optional
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
