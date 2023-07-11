const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/index.js");

class Song extends Model {}

Song.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    song_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    artist: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    youtube_url: {
      type:DataTypes.STRING,
      allowNull:true,
    },
    playlist_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "playlist",
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "song",
    freezeTableName:true,
  }
);

module.exports = Song;