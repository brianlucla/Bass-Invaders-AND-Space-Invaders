const router = require('express').Router();
const { Song } = require('../../models');

router.post('/', async(req, res)=>{
  try {
    const songData = await Song.create('/', {
      song_title: req.body.song_title,
      artist: req.body.artist,
      playlist_id:req.body.playlist_id,
    });
    //response
  } catch (error) {
    
  }
});

router.put('/', async(req, res)=>{
  try {
    const songData = await Song.update('/',{
      where:{
        song_title:req.body.song_title,
        artist:req.body.artist,
      }

      youtube_url: req.body.youtube_url,
    });

    //response 
  } catch (error) {
    
  }
});


module.exports = router;