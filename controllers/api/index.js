const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const playlistRoutes = require('./playlistRoutes.js');
const songroutes = require('./songRoutes.js');

router.use('/users', userRoutes);
router.use('/playlist', playlistRoutes);
router.use('/song', songRoutes);

module.exports = router;
