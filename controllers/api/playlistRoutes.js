const router = require("express").Router();
const { Playlist, Song } = require("../../models");
const withAuth = require('../../helpers/auth');

router.post("/", withAuth, async (req, res) => {
  // create playlist
  try {
    const playlistData = await Playlist.create({
      userId: req.session.userId,
    });
    //response
    res.json(playlistData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/", withAuth, async (req, res) => {
  try {
    const playlistData = await Playlist.update(
      { favorite: true },
      {
        where: {
          id: req.body.id,
        },
      }
    );
    res.json(playlistData);
    //response
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
    const playlistData = await Playlist.destroy({
      where: {
        id: req.body.id,
      },
    });
    //response
    res.json(playlistData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// router.get("/favorites", async (req, res) => {
//   // find all
//   try {
//     const favoritesData = await Playlist.findAll({
//       raw: true,
//       where: { favorite: true },
//       include: [Song],
//     });
//     const favorites = favoritesData.map((favorite) => {
//         favorite.get({plain:true});
//     });
//     res.render('favorites', { favorites });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get("/history", async (req, res) => {
//   try {
//     const playlistData = await Playlist.findAll({
//       raw: true,
//       include: [Song],
//     });
//     const songs = playlistData.map((song) =>{
//         song.get({plain:true});
//     });
//     res.render('history', { songs });
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

module.exports = router;
