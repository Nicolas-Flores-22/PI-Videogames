const { Videogame } = require('../db.js')

const postGames = async (name, description, platforms, image, released, rating, genreId) => {


    if (!name || !description || !platforms || !image || !released || !rating) throw new Error('Mandatory data is missing.');

    const newGame = await Videogame.create({ name, description, platforms, image, released, rating });
    // console.log(newGame);
    // console.log('Prototipo del nuevo videogame', newGame.__proto__);

    newGame.addGenres(genreId);
    return newGame;
};

module.exports = { postGames };