const User = require('./User.js');
const Playlist = require('./Playlist.js');
const Song = require('./Song.js');

Playlist.hasMany(Song, {
  foreignKey:'playlist_id',
  onDelete:'CASCADE',
});

// Song.belongsToMany(Playlist,{
//   foreignKey:'playlist_id',
//   onDelete: 'SET NULL',
// });

module.exports = { User, Playlist, Song }
