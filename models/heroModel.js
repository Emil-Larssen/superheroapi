const axios = require("axios");
const favorites = [];


async function getAllSuperheroes() {
    const response = await axios.get('https://akabab.github.io/superhero-api/api/all.json');
    let superheroes = response.data;
    superheroes = superheroes.map(hero => ({
        id: hero.id,
        name: hero.name,
        fullName: hero.biography.fullName,
        strength: hero.powerstats.strength,
        image: hero.images.md
    }))
    return superheroes;
}

async function getSuperhero(id) {
    const response = await axios.get('https://akabab.github.io/superhero-api/api/all.json');
    return response.data.find(hero => hero.id === Number(id));
}

async function saveFavorite(id, note) {
    if (favoriteExists(id)) {
        return false
    }
    return favorites.push(await createFavorite(id, note));
}

function createFavorite(id, note) {
        return {id, note}
}

async function getFavorites() {
    return favorites;
}

async function deleteFavorite(id) {
    const index = favorites.findIndex(favorite => favorite.id === Number(id));
    if (!favoriteExists(id)) {
        return false;
    }
    return favorites.splice(index, 1);
}

function favoriteExists(id) {
    return favorites.some(favorite => favorite.id === Number(id));
}

module.exports = { getAllSuperheroes, getSuperhero, saveFavorite, getFavorites, deleteFavorite };
