const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame, Genre } = require('../db.js')
const { Op } = require('sequelize');

//const URL_API = `https://api.rawg.io/api/games?search=${name}?key=${API_KEY}`

const getGamesByName = async (name) => {
    //Convertimos el name a minúsculas
    const nameFilter = name.toLowerCase();

    // Buscamos en la base de datos los juegos que contengan la palabra recibida
    const gamesFromDB = await Videogame.findAll({
        where: { name: { [Op.iLike]: `%${nameFilter}%` } },
        attributes: ['id', 'name', 'description', 'platforms', 'image', 'released', 'rating', 'created'],
        include: [{
            model: Genre,
            attributes: ['name'], // Para que solo me traiga el atributo name del modelo género
            through: { attributes: [] } // Para no traer la tabla intermediaria de los modelos Videogame y Genre
        }],
    });

    // Busca en la API los juegos que contengan la palabra recibida
    const response = await axios(`https://api.rawg.io/api/games?search=${nameFilter}&key=${API_KEY}`);

    const gamesFromAPI = response.data.results.map(game => ({
        ...game,
        id: game.id,
        name: game.name.toLowerCase(),
        image: game.background_image,
        genres: game.genres,
    }))

    // unimos los elementes de cada array tanto de gamesFromDB como de gamesFromAPI en el array games
    const games = [...gamesFromDB, ...gamesFromAPI];

    // Retorna los primeros 15 juegos que contengan el nombre ingresado
    return games.slice(0, 15);
};

module.exports = { getGamesByName }