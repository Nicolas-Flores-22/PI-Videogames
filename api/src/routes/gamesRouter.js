const { Router } = require('express');

// Importamos los controllers 
const { getAllGames } = require('../controllers/getAllGames.js');
const { getGameById } = require('../controllers/getGameById.js');
const { postGames } = require('../controllers/postGames.js');
const { getGamesByName } = require('../controllers/getGamesByName.js');
const { deleteGameById } = require('../controllers/deteleGameById.js');

const gamesRouter = Router();

// Hacemos la petición GET a la ruta /games
gamesRouter.get('/', async (request, response) => {
    try {
        const allGames = await getAllGames();
        
        return response.status(200).json(allGames);
    } catch (error) {
        return response.status(404).json({ error: error.message });
    }
});

// Hacemos la petición GET a la ruta /games?name=name
gamesRouter.get('/name', async (request, response) => {
    const games = await getGamesByName(request.query.name);
    try {
        if (games.length === 0) throw new Error(`No results were found with the name entered: '${request.query.name}'`);

        if (games.error) return response.status(404).json(games);
        return response.status(200).json(games);
    } catch (error) {
        return response.status(404).send(error.message);
    }
})

// Hacemos la petición GET a la ruta /games/:id
gamesRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    try {
        const videogame = await getGameById(id);

        return response.status(200).json(videogame);
    } catch (error) {
        return response.status(404).send(error.message);
    }
});

// Hacemos la petición POST a la ruta /games
gamesRouter.post('/', async (request, response) => {
    const { name, description, platforms, image, released, rating, genreId } = request.body;

    try {
        const newGame = await postGames(name, description, platforms, image, released, rating, genreId);

        // return response.status(201).json(newGame);
        return response.status(201).send('Videogame successfully created');
    } catch (error) {
        return response.status(404).send(error.message);
    }
});

// Hacemos la petición DELETE a la ruta /games/:id
gamesRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    try {
        if (uuidRegex.test(id)){
            await deleteGameById(id);
        } else {
            throw new Error ('The ID value is incorrect.')
        }

        return response.status(200).send('Videogame successfully removed.');
    } catch (error) {
        return response.status(404).send(error.message)
    }
});

module.exports = { gamesRouter };