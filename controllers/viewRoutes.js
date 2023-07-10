const router = require('express').Router()
const { Playlist, Song } = require('../models')


router.get('/', async (req, res) => {
  // render playlist to page
  try {
    const playlistData = Playlist.findOne({
      where:{
        id:req.body.id,
      },
      include:[Song],
    });
  } catch (error) {
    
  }
});



module.exports = router
