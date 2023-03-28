const { Router } = require('express');

// Importamos los controllers
const { getAllGenres } = require('../controllers/getAllGenres.js');

const genresRouter = Router();

// Hacemos la petición GET a la ruta /genres
genresRouter.get('/', async (request, response) => {
    try {
        const allGenres = await getAllGenres();
        
        if(!allGenres) throw new Error('Hubo un problema al obtener las categorías.')

        response.status(200).json(allGenres);
    } catch (error) {
        response.status(404).send(error.message);
    }
});

module.exports = { genresRouter };