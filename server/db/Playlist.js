const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, JSON, BOOLEAN } = conn.Sequelize;

const Playlist = conn.define("playlist", {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  title: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: TEXT,
    allowNull: true, 
  },
  tracks: {
    type: JSON,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  image: {
    type: STRING,
    allowNull: true,  // Allow null if image is optional
  },
  discover: {
    type: BOOLEAN,
    allowNull: true,  // Allow null if discover is optional
  },
});

module.exports = Playlist;
