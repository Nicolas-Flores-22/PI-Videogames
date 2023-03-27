const axios = require('axios');
const { Genre } = require('../db.js')
require('dotenv').config();
const { API_KEY } = process.env;
const URL_API = `https://api.rawg.io/api/genres?key=${API_KEY}`;

const saveGenresApiData = async () => {

    // Traemos el results de la api
    const { results } = (await axios(URL_API)).data;

    // Hacemos un map y solo traemos el nombre de cada género
    const allGenres = results.map(genre => ({ name: genre.name }));

    // el bulkCreate => permite pasarle un array de objetos y los crea todos juntos en la Base de Datos
    await Genre.bulkCreate(allGenres);

    return allGenres;
};

module.exports = { saveGenresApiData }