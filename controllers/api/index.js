const router = require('express').Router();

const userRoutes = require('./userRoutes.js');
const playlistRoutes = require('./playlistRoutes.js');

router.use('/users', userRoutes);
router.use('/playlist', playlistRoutes);

module.exports = router;
