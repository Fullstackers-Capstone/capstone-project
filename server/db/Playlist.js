const conn = require("./conn");
const { STRING, UUID, UUIDV4, TEXT, JSON } = conn.Sequelize;

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
});

module.exports = Playlist;
