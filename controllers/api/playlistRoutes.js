const router = require("express").Router();
const { Playlist, Song } = require("../../models");

router.get("/", async (req, res) => {
  // find one from playlist
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
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/favorites", async (req, res) => {
  // destroy
  try {

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
    // res.render('handleName', songs); 
  } catch (error) {
    res.status(500).json(error);
  }
});
