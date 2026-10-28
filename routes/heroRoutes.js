const express = require('express');
const router = express.Router();
module.exports = router;
const { getAllSuperheroes } = require('../controllers/heroController');

router.get('/superheroes', async (req, res) => {
    const superheroes = await getAllSuperheroes();
    res.status(200).json(superheroes);
})

router.get('/superheroes/:id', async (req, res) => {
    //TODO: Implement get one superhero
})

router.post('/favorites', async (req, res) => {
    //TODO: Implement save favorites
})

router.get('/favorites', async (req, res) => {
    //TODO: Implement get favorites
})

router.delete('/favorites/:id', async (req, res) => {
    //TODO: Implement DELETE favorites
})
