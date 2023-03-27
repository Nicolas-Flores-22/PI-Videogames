const { Router } = require('express');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { gamesRouter } = require('./gamesRouter')
const { genresRouter } = require('./genresRouter')

const routes = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// Hacemos las rutas para games y genres respectivamente
routes.use('/games', gamesRouter);
routes.use('/genres', genresRouter);


module.exports = { routes };
