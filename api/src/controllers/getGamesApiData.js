const axios = require('axios');

const getGamesApiData = async (url, videoGames = []) => {

    
    if (videoGames.length === 100) return videoGames;

    const { next, results } = (await axios(url)).data;

    results.forEach(vg => {
        if (videoGames.length < 100) videoGames.push({
            id: vg.id,
            name: vg.name,
            description: vg.description,
            image: vg.background_image,
            released: vg.released, // Fecha de publicación
            rating: vg.rating,
            platforms: vg.platforms.map(game => game.platform.name).join('  |  '),
            genres: vg.genres,
            // genres: vg.genres.map(vg => vg.name), //hacemos un map para poder obtner un arreglo con los names de cada genre
            created: false,
        });
    });

    return getGamesApiData(next, videoGames);
};

module.exports = { getGamesApiData };