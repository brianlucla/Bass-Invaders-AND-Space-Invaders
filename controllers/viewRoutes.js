const router = require('express').Router()
const { Playlist, Song } = require('../models')


router.get('/', async (req, res) => {

  try {
    // render favorites to page
    res.render("home");
  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router
