const router = require('express').Router();
const { Playlist, Song } = require('../models');

router.get("/", async (req, res) => {
  try {
    const playlistData = await Playlist.findAll({
      where:{ userId: req.session.userId },
      include: [Song],
    });
    res.json(playlistData);
    // const playlists = playlistData.map((playlist) => {
    //   playlist.get({ plain: true });
    // });
    // res.render("history", { playlist });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;