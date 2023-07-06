const router = require('express').Router();

const userRoutes = require('./userRoutes');
const playlistRoutes = require('./viewRoutes');

const playlistRoutes = router.use('/users', userRoutes);

module.exports = router;
