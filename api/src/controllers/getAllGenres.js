const { Genre } = require('../db.js')

// Creamos la función de getAllGenres donde retorna un arreglo de objetos, 
// donde cada objeto es un género con su información
// Esta función devuelve los géneros de la base de datos
// const getAllGenres = async () => {
//     try {
//         const allGenres = await Genre.findAll();
//         return allGenres;
//     } catch (error) {
//         return { error: error.message };
//     }
// };

const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env;
const URL_API = `https://api.rawg.io/api/genres?key=${API_KEY}`;

// Esta función devuelve los géneros de la API
const getAllGenres = async () => {

    // const infoDB = await Genre.findAll();

    // if (!infoDB.length) {
    //     const { results } = (await axios(URL_API)).data;

    //     const allGenres = results.map(genre => ({ name: genre.name }));

    //     await Genre.bulkCreate(allGenres);

    //     return allGenres;
    // }

    // // console.log('Soy el log de getAllGenres', allGenres.length);
    // return infoDB.map(genre => ({ name: genre.name }));

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
