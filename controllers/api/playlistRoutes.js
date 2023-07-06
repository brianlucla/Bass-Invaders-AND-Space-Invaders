const router = require('express').Router();
const { Playlist, Song } = require('../../models');

router.get('/', async (req, res) => {
    // find one from playlist
    try {
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post('/', async (req, res) => {
    // create playlist
    try {
    } catch (error) {}
});

router.put('/', async (req, res) => {});

router.get('/favorites', async (req, res) => {
    // find all
    try {
        const favoritesData = await Playlist.findAll({
            raw: true,
            where: { favorite: true },
            include: [Song],
        });
    } catch (error) {}
});

router.delete('/favorites', async (req, res) => {
    // destroy
    try {
    } catch (error) {}
});

router.get('/history', async (req, res) => {
    try {
        const playlistData = await Playlist.findAll({
            raw: true,
            include: [Song],
        });
    } catch (error) {}
});
