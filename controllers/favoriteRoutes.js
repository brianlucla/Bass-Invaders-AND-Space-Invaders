const router = require("express").Router();
const { User, Playlist, Song } = require("../models");
const withAuth = require('../helpers/auth');

router.get("/", withAuth, async (req, res) => {
  // find all
  
  try {
    const favoritesData = await Playlist.findAll({
      where: { 
        favorite: true, 
        userId: req.session.userId, 
      },
      include: [Song],
    });
    const favorites = favoritesData.map((favorite) => {
      favorite.get({ plain: true });
    });
    res.render("favorites", {
      layout:"favoritesPage",
      favorites
    });
  } catch (error) {
    res.status(500).json(error);
  }
});

// maybe delete route

module.exports = router;
