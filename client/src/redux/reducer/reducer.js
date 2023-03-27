// Importamos las actions types
import { GET_GAMES, GET_GAME_BY_ID, GET_GENRES, ADD_GAME, GET_GAME_BY_NAME, ORDER_GAME_BY_ABC, ACTUALIZAR_ESTADO_GAMES, ORDER_GAME_BY_CREATED, ORDER_GAME_BY_RATING, ORDER_GAME_BY_GENRE, CLEAN_DETAIL, DELETE_GAME } from "../actions/types";

const initialState = {
    games: [],
    // allgames: [],
    detailGame: [],
    genres: [],
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                // allgames: action.payload
            }

        case GET_GAME_BY_ID:
            return {
                ...state,
                detailGame: action.payload
            }

        case GET_GENRES:
            return {
                ...state,
                genres: action.payload
            }

        case ADD_GAME:
            return {
                ...state,
                games: action.payload
            }

        case GET_GAME_BY_NAME:
            return {
                ...state,
                games: action.payload
            }

        case ORDER_GAME_BY_ABC:
            return {
                ...state,
                games: action.payload
            }

        case ACTUALIZAR_ESTADO_GAMES:
            return {
                ...state,
                games: state.games
            }

        case ORDER_GAME_BY_CREATED:
            return {
                ...state,
                games: action.payload
            }

        case ORDER_GAME_BY_RATING:
            return {
                ...state,
                games: action.payload
            }

        case ORDER_GAME_BY_GENRE:
            return {
                ...state,
                games: action.payload
            }

        case CLEAN_DETAIL:
            return {
                ...state,
                detailGame: []
            }

        case DELETE_GAME:
            let filteredGame = state.games.filter(game => game.id !== action.payload)
            return {
                ...state,
                games: filteredGame,
            }

        default:
            return { ...state };
    }
};

export default rootReducer;