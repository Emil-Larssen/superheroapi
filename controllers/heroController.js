const heroModel = require('../models/heroModel')

function getAllSuperheroes() {
    return heroModel.getAllSuperheroes();
}

module.exports = { getAllSuperheroes }