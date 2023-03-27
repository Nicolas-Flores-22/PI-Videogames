// Acá importamos las types
import { GET_GAMES, GET_GAME_BY_ID, GET_GENRES, ADD_GAME, GET_GAME_BY_NAME, ORDER_GAME_BY_ABC, ACTUALIZAR_ESTADO_GAMES, ORDER_GAME_BY_CREATED, ORDER_GAME_BY_RATING, ORDER_GAME_BY_GENRE, CLEAN_DETAIL, DELETE_GAME } from './types';

import axios from 'axios';

export const getGames = () => {
    return async function (dispatch) {
        const allgames = await axios.get('http://localhost:3001/videogames/games')
            // .then(response => alert(response.data))
            .catch(error => alert(error.response.data))

        const games = allgames.data;
        dispatch({
            type: GET_GAMES,
            payload: games
        });
    }
};

export const getGame = (id) => {
    return async function (dispatch) {
        const gameData = await axios.get(`http://localhost:3001/videogames/games/${id}`)
            // .then(response => alert(response.data))
            .catch(error => alert(error.response.data))
        const game = gameData.data;

        dispatch({
            type: GET_GAME_BY_ID,
            payload: game
        });
    }
};

export const getGameByName = (name) => {
    return async function (dispatch) {
        const gameData = await axios.get(`http://localhost:3001/videogames/games/name?name=${name}`)
            // .then(response => alert(response.data))
            .catch(error => alert(error.response.data))
        const game = gameData.data;

        dispatch({
            type: GET_GAME_BY_NAME,
            payload: game
        })
    }
};

export const getGenres = () => {
    return async function (dispatch) {
        const genreData = await axios.get('http://localhost:3001/videogames/genres')
            // .then(response => alert(response.data))
            .catch(error => alert(error.response.data))

        const genres = genreData.data;
        dispatch({
            type: GET_GENRES,
            payload: genres
        });
    }
};

export const postGame = (game) => {
    return async () => {
        await axios.post('http://localhost:3001/videogames/games', game)
            .then(response => alert(response.data))
            .catch(error => alert(error.response.data))
    };
};

export const addGame = () => {

    return async function (dispatch) {
        const allgames = await axios.get('http://localhost:3001/videogames/games');
        const actualizarGame = allgames.data;

        dispatch({
            type: ADD_GAME,
            payload: actualizarGame
        })
    }
};

export const orderGameByABC = (tipo) => {
    return async function (dispatch) {
        const allgames = await axios.get('http://localhost:3001/videogames/games');
        const gameOrder = allgames.data;
        let newArray;
        if (tipo === "Ascendente") {
            newArray = gameOrder.sort((a, b) => {
                let nameA = a.name.toUpperCase(); // convertir a mayúsculas para ignorar mayúsculas y minúsculas
                let nameB = b.name.toUpperCase(); // convertir a mayúsculas para ignorar mayúsculas y minúsculas

                if (nameA > nameB) return 1;
                if (nameA < nameB) return -1;
                return 0;
            });
        } else {
            newArray = gameOrder.sort((a, b) => {
                let nameA = a.name.toUpperCase(); // convertir a mayúsculas para ignorar mayúsculas y minúsculas
                let nameB = b.name.toUpperCase();
                if (nameA < nameB) return 1;
                if (nameA > nameB) return -1;
                return 0;
            });
        }
        dispatch({
            type: ORDER_GAME_BY_ABC,
            payload: newArray
        })
    };
};

export const actualizarGames = () => {
    return {
        type: ACTUALIZAR_ESTADO_GAMES,
    }
};

export const orderGamebyCreated = (tipo) => {
    return async function (dispatch) {
        const allgames = await axios.get('http://localhost:3001/videogames/games');
        const games = allgames.data;

        let gamesFiltered;
        if (tipo === 'Created') {
            gamesFiltered = games.filter(game => game.created === true)
            if (gamesFiltered.length === 0) {
                return alert('No se encontraron videogames creados')
            }
        } else {
            gamesFiltered = games.filter(game => game.created === false)
        }


        dispatch({
            type: ORDER_GAME_BY_CREATED,
            payload: gamesFiltered
        })
    }
};

export const orderGameByRating = (tipo) => {
    return async function (dispatch) {
        const allgames = await axios.get('http://localhost:3001/videogames/games');
        const games = allgames.data;

        let gamesFilterRating;
        if (tipo === 'Ascendente') {
            gamesFilterRating = games.sort((a, b) => a.rating - b.rating);
        } else {
            gamesFilterRating = games.sort((a, b) => b.rating - a.rating);
        }

        dispatch({
            type: ORDER_GAME_BY_RATING,
            payload: gamesFilterRating
        })
    }
};

export const orderGameByGenre = (tipo) => {
    return async function (dispatch) {
        const allgames = await axios.get('http://localhost:3001/videogames/games');
        const games = allgames.data;

        // let gameFilterGenre = games.forEach(game => game.genres.name === tipo)

        const gameFilterGenre = games.filter(game =>
            game.genres.some(genre => genre.name === tipo)
        );

        if (gameFilterGenre.length === 0) {
            return alert('No se encontraron videogames con el género seleccionado.')
        }

        dispatch({
            type: ORDER_GAME_BY_GENRE,
            payload: gameFilterGenre
        })
    }
};

export const cleanDetail = () => {
    return {
        type: CLEAN_DETAIL
    }
};

export const deleteGameCreated = (id) => {
    return async function () {
        await axios.delete(`http://localhost:3001/videogames/games/${id}`)
            .then(response => alert(response.data))
            .catch(error => alert(error.response.data))
    }
}

export const deleteGame = (id) => {
    return{
        type: DELETE_GAME,
        payload: id
    }
};




