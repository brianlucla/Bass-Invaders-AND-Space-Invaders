const router = require("express").Router();
const { User, Playlist, Song } = require("../models");

router.get("/", async (req, res) => {
  // find all
  console.log("hello");
  try {
    const favoritesData = await Playlist.findAll({
      where: { 
        favorite: true, 
        userId: req.session.userId, 
      },
      include: [Song],
    });
    console.log("User Id: ", req.session.userId);
    console.log("Favorites: ", favoritesData);
    res.json(favoritesData);
    // const favorites = favoritesData.map((favorite) => {
    //   favorite.get({ plain: true });
    // });
    // res.render("favorites", { favorites });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
