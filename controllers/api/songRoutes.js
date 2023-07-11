const router = require('express').Router();
const { Song } = require('../../models');

router.post('/', async(req, res)=>{
  try {
    console.log(req.body)
    const songData = await Song.create({
      song_title: req.body.song_title,
      artist: req.body.artist,
      youtube_url:req.body.youtube_url,
      playlist_id:req.body.playlist_id,
    });
    //response
    res.json(songData);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;