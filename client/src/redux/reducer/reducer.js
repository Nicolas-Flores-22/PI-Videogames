// Importamos las actions types
import { GET_GAMES, GET_GAME_BY_ID, GET_GENRES, ADD_GAME, GET_GAME_BY_NAME, ORDER_GAME_BY_ABC, ORDER_GAME_BY_CREATED, ORDER_GAME_BY_RATING, ORDER_GAME_BY_GENRE, CLEAN_DETAIL, DELETE_GAME, STANDBY_LOAD, LOAD_DONE } from "../actions/types";

const initialState = {
    games: [],
    allGames: [],
    detailGame: [],
    genres: [],
    isLoading: true,
};

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_GAMES:
            return {
                ...state,
                games: action.payload,
                allGames: action.payload
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
            state.allGames.push(action.payload);
            return {
                ...state,
                games: [...state.allGames]
            }

        case GET_GAME_BY_NAME:
            return {
                ...state,
                allGames: action.payload
            }

        case ORDER_GAME_BY_ABC:
            let gameFilter = [...state.allGames];

            if (action.payload === 'Ascendente') {
                gameFilter.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                })
            } else {
                gameFilter.sort((a, b) => {
                    if (a.name < b.name) return 1;
                    if (a.name > b.name) return -1;
                    return 0;
                })
            }

            return {
                ...state,
                allGames: gameFilter
            }

        case ORDER_GAME_BY_CREATED:
            let gameCreated = [...state.games];

            if (action.payload === 'Created') {
                gameCreated = [...state.games].filter(game => game.created === true)
                if (gameCreated.length === 0) {
                    gameCreated = [...state.allGames];
                    alert('No created videogames found')
                }
            } 

            if (action.payload === 'NoCreated') {
                gameCreated = [...state.games].filter(game => game.created === false)
            }

            return {
                ...state,
                allGames: gameCreated
            }

        case ORDER_GAME_BY_RATING:
            let gameRating = [...state.allGames];

            if (action.payload === 'Ascendente') {
                gameRating.sort((a, b) => a.rating - b.rating);
            } else {
                gameRating.sort((a, b) => b.rating - a.rating);
            }

            if(action.payload === undefined || action.payload === '') gameRating = [...state.allGames];

            return {
                ...state,
                allGames: gameRating
            }

        case ORDER_GAME_BY_GENRE:
            let gameGenre = action.payload === 'all' 
            ? [...state.games] 
            : [...state.games].filter((game) => game.genres.map(genre => genre.name).includes(action.payload))
            
            if (gameGenre.length === 0) {
                gameGenre = [...state.games];
                alert('No videogames found with the selected genre.')

            }

            return {
                ...state,
                allGames: gameGenre
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
                allGames: filteredGame
            }

        case STANDBY_LOAD:
            return {
                ...state,
                isLoading: true,
            }

        case LOAD_DONE:
            return {
                ...state,
                isLoading: false,
            }

        default:
            return { ...state };
    }
};

export default rootReducer;