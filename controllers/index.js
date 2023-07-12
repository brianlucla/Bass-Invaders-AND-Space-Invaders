const router = require('express').Router();

const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes.js');
const favoriteRoutes = require('./favoriteRoutes.js');

router.use('/', viewRoutes);
router.use('/api', apiRoutes);
router.use("/favorites", favoriteRoutes);

module.exports = router;
