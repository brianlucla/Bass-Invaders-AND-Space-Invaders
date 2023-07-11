const User = require('./User.js');
const Playlist = require('./Playlist.js');
const Song = require('./Song.js');

Playlist.hasMany(Song, {
  foreignKey:'playlist_id',
  onDelete:'CASCADE',
});

Playlist.belongsTo(User, {
  foreignKey:'userId',
  onDelete:"CASCADE",
});

module.exports = { User, Playlist, Song };
