const express = require('express');
const router = express.Router();
module.exports = router;
const { getAllSuperheroes, getSuperhero, saveFavorite, getFavorites, deleteFavorite } = require('../controllers/heroController');
let writeQueue = Promise.resolve();
const {validateFavorite} = require('../validators/favoriteValidator');

function enqueueWrite(operation){
    const result = writeQueue.then(() => operation());
    writeQueue = result.catch(() => {});
    return result;
}

router.get('/superheroes', async (req, res) => {
    const superheroes = await getAllSuperheroes();
    res.status(200).json(superheroes);
})

router.get('/superheroes/:id', async (req, res) => {
    const superhero = await getSuperhero(req.params.id)
    if(superhero == null)
        return res.status(404).json({message: 'Superhero not found'});
    res.status(200).json(superhero);
})

router.post('/favorites',validateFavorite, async (req, res) => {
    return enqueueWrite(async () => {
        if (await saveFavorite(req.body.id, req.body.note) === false) {
            return res.status(409).json({message: 'Favorite already exists'});
        }
        res.status(201).json({message: 'Favorite saved'});
    });
})

router.get('/favorites', async (req, res) => {
    const favorites = await getFavorites()
    res.status(200).json(favorites);
})

router.delete('/favorites/:id', async (req, res) => {
    return enqueueWrite(async () => {
        if (await deleteFavorite(req.params.id) === false) {
            return res.status(404).json({message: 'Favorite not found'});
        }
        res.sendStatus(204);
    });
})
