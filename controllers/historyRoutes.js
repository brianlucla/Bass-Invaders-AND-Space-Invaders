const router = require('express').Router();
const { Playlist, Song } = require('../models');

router.get("/history", async (req, res) => {
  try {
    const playlistData = await Playlist.findAll({
      raw: true,
      include: [Song],
    });
    const playlists = playlistData.map((playlist) => {
      playlist.get({ plain: true });
    });
    res.render("history", { playlist });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;