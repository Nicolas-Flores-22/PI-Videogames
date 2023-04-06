// Acá importamos las types
import { GET_GAMES, GET_GAME_BY_ID, GET_GENRES, ADD_GAME, GET_GAME_BY_NAME, ORDER_GAME_BY_ABC, ORDER_GAME_BY_CREATED, ORDER_GAME_BY_RATING, ORDER_GAME_BY_GENRE, CLEAN_DETAIL, DELETE_GAME, STANDBY_LOAD, LOAD_DONE } from './types';

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

export const addGame = (game) => {
    return {
        type: ADD_GAME,
        payload: game
    }
};

export const orderGameByABC = (tipo) => {
    return {
        type: ORDER_GAME_BY_ABC,
        payload: tipo
    }
};

export const orderGamebyCreated = (tipo) => {
    return {
        type: ORDER_GAME_BY_CREATED,
        payload: tipo
    }
};

export const orderGameByRating = (tipo) => {
    return {
        type: ORDER_GAME_BY_RATING,
        payload: tipo
    }
};

export const orderGameByGenre = (tipo) => {
    return {
        type: ORDER_GAME_BY_GENRE,
        payload: tipo
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
    return {
        type: DELETE_GAME,
        payload: id
    }
};

export const loading = () => {
    return {
        type: STANDBY_LOAD,
        payload: false,
    }
};

export const loaded = () => {
    return {
        type: LOAD_DONE,
        payload: true,
    }
};


