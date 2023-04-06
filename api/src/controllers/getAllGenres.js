const { Genre } = require('../db.js')

const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const URL_API = `https://api.rawg.io/api/genres?key=${API_KEY}`;

// Esta función devuelve los géneros de la API
const getAllGenres = async () => {

    // Traemos los géneros de la API
    
    let infoApi = await axios.get(URL_API);
    infoApi = infoApi.data.results;

    // Agregamos los géneros a nuestra base de datos
    infoApi.forEach(async (genre) => 
        await Genre.findOrCreate({
            where: {
                name: genre.name
            }
        })
    );
        
    return await Genre.findAll({
        attributes: ['id','name']
    });

};

module.exports = { getAllGenres };
