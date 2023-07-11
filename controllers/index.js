const router = require('express').Router();

const apiRoutes = require('./api');
const viewRoutes = require('./viewRoutes.js');
const favoriteRoutes = require('./favoriteRoutes.js');
const historyRoutes = require('./historyRoutes.js');


router.use('/', viewRoutes);
router.use('/api', apiRoutes);
router.use("/favorites", favoriteRoutes);
router.use("/history", historyRoutes);

module.exports = router;
