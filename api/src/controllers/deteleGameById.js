const { Videogame } = require('../db');

const deleteGameById = async (id) => {
    await Videogame.destroy({
        where: { id }
    });
};

module.exports = { deleteGameById }