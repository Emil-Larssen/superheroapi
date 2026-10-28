const heroModel = require('../models/heroModel')

function getAllSuperheroes() {
    return heroModel.getAllSuperheroes();
}

function getSuperhero(id) {
    return heroModel.getSuperhero(id)
}

function saveFavorite(id, note){
    return heroModel.saveFavorite(id, note);
}

function getFavorites(){
    return heroModel.getFavorites();
}

function deleteFavorite(id){
    return heroModel.deleteFavorite(id)
}

module.exports = { getAllSuperheroes, getSuperhero, saveFavorite, getFavorites, deleteFavorite }