const axios = require("axios");


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

module.exports = { getAllSuperheroes };
