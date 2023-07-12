const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/index.js');

class Playlist extends Model {}

// random comment

Playlist.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "playlist",
    freezeTableName: true,
  }
);

module.exports = Playlist;