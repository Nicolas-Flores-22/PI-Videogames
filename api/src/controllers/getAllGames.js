const { Videogame } = require('../db.js')
const { Genre } = require('../db.js')
// require('dotenv').config();
const { API_KEY } = process.env;
const { getGamesApiData } = require('./getGamesApiData')

const URL_API = `https://api.rawg.io/api/games?key=${API_KEY}`;

// Creamos la función de getAllGames donde retorna un arreglo de objetos, donde cada objeto es un videojuego con su información incluyendo los géneros asociados
const getAllGames = async () => {

    // Buscamos en la base de datos todos los videojuegos
    const gamesDB = await Videogame.findAll({
        // include: [{ model: Genre }]
        attributes: ['id', 'name', 'description', 'platforms', 'image', 'released', 'rating', 'created'],
        include: [{
            model: Genre,
            attributes: ['name'], // Para que solo me traiga el atributo name del modelo género
            through: { attributes: [] } // Para no traer la tabla intermediaria de los modelos Videogame y Genre
        }],
    });

    // Buscamos en la api los 100 primeros videojuegos
    const gamesApi = await getGamesApiData(URL_API);
    // console.log('estoy en getAllGames', gamesApi);
    const gamesFiltered = [...gamesDB, ...gamesApi];

    if (gamesFiltered.length === 0) throw new Error('There is no registered video game');

    // Retornamos solo 100 videojuegos que incluye los de la base de datos y también los de la api
    // Para eso hacemos un slice en gamesFiltered para que solo retorne 100 nada más
    return gamesFiltered.slice(0, 100);
};

// Exportamos la función para que sea utilizada por quien la requiera
module.exports = { getAllGames };