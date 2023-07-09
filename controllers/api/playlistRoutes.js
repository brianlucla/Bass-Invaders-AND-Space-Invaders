const router = require("express").Router();
const { Playlist, Song } = require("../../models");

router.get("/", async (req, res) => {
  // find all from playlist
  try {

  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  // create playlist
  try {

  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", async (req, res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/favorites", async (req, res) => {
  // find all
  try {
    const favoritesData = await Playlist.findAll({
      raw: true,
      where: { favorite: true },
      include: [Song],
    });
    const favorites = favoritesData.map((favorite) => {
        favorite.get({plain:true});
    });
    res.render('favorites', { favorites });
  } catch (error) {
    res.status(500).json(error);
  }
});


router.get("/history", async (req, res) => {
  try {
    const playlistData = await Playlist.findAll({
      raw: true,
      include: [Song],
    });
    const songs = playlistData.map((song) =>{
        song.get({plain:true});
    });
    res.render('history', { songs }); 
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
