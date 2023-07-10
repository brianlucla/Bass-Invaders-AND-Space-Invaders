const router = require('express').Router();
const { Playlist, Song } = require('../models');

router.get("/favorites", async (req, res) => {
  // find all
  try {
    const favoritesData = await Playlist.findAll({
      raw: true,
      where: { favorite: true },
      include: [Song],
    });
    const favorites = favoritesData.map((favorite) => {
      favorite.get({ plain: true });
    });
    res.render("favorites", { favorites });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;