const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const { Videogame } = require('../db.js')
const { Genre } = require('../db.js')

//URL API: `https://api.rawg.io/api/games/${id}?key=${API_KEY}`

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

const getGameById = async (id) => {

    let videogame;

    if (uuidRegex.test(id)) {
        // si el id es un UUID, buscamos en la base de datos
        videogame = await Videogame.findByPk(id, {
            attributes: ['id', 'name', 'description', 'platforms', 'image', 'released', 'rating', 'created'],
            include: [{ 
                model: Genre,
                attributes: ['name'], // Para que solo me traiga el atributo name del modelo género
                through: {attributes: []} // Para no traer la tabla intermediaria de los modelos Videogame y Genre
            }],
        });
    } else {
        // si el id no es un UUID, asumimos que es un número y buscamos en la API
        const response = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
        videogame = {
            id: response.data.id,
            name: response.data.name,
            // description: response.data.description, // con etiquetas de html
            description: response.data.description_raw, // Sin etiquetas de html
            image: response.data.background_image, //o sino background_image_additional
            released: response.data.released, //Fecha de publicación
            rating: response.data.rating,
            platforms: response.data.platforms.map(vg => vg.platform.name).join('  |  '), //hacemos un map para poder obtener un arreglo con los names de cada platform
            genres: response.data.genres,
            // genres: response.data.genres.map(vg => vg.name), //hacemos un map para poder obtner un arreglo con los names de cada genre
            created: false,
        }
    }

    if (!videogame) throw new Error(`There was a problem getting the videogame with the id: ${id}`);

    return videogame;
};

module.exports = { getGameById };