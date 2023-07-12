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
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    favorite: {
    favorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    song_array: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("song_array").split(";");
      },
      set(val) {
        this.setDataValue("song_array", val.join(";"));
      },
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