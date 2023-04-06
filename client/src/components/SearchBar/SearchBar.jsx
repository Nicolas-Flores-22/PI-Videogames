import style from './SearchBar.module.css';

// import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameByName, getGames, getGenres, orderGameByABC, orderGamebyCreated, orderGameByGenre, orderGameByRating } from "../../redux/actions/actions";
import Loading from '../Loading/Loading';

const SearchBar = ({ handleFilterChange }) => {

    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres);

    // Estado para manejar el Loading
    const [loading, setLoading] = useState(false);

    // Estado para manejar el habilitado del botón "Search"
    const [disabled, setDisabled] = useState(true);

    // Estado para manejar los estados iniciales de cada select
    const [initialState, setInitialState] = useState({
        genre: "all",
        abc: "",
        rating: "",
        created: "",
    });

    const [selectedFilters, setSelectedFilters] = useState(initialState);

    // FILTRADO DE VIDEJUEGOS
    const handleOrderGenre = (event) => {
        setLoading(true);

        setSelectedFilters((prevState) => ({
            ...prevState,
            genre: event.target.value,
        }));

        dispatch(orderGameByGenre(event.target.value));
        setLoading(false);
    };

    const handleOrderABC = (event) => {
        setLoading(true);

        setSelectedFilters((prevState) => ({
            ...prevState,
            abc: event.target.value,
        }));

        dispatch(orderGameByABC(event.target.value));
        setLoading(false);
    };

    const handleOrderRating = (event) => {
        setLoading(true);

        setSelectedFilters((prevState) => ({
            ...prevState,
            rating: event.target.value,
        }));

        dispatch(orderGameByRating(event.target.value));
        setLoading(false);
    };

    const handleOrderCreated = (event) => {
        setLoading(true);

        setSelectedFilters((prevState) => ({
            ...prevState,
            created: event.target.value,
        }));

        dispatch(orderGamebyCreated(event.target.value));
        setLoading(false);
    };

    // BÚSQUEDA POR NOMBRE
    const [game, setGame] = useState('');

    const handleChange = (event) => {
        const inputValue = event.target.value;

        // Comprobamos si el valor ingresado contiene caracteres especiales
        if (/[^a-zA-Z0-9 ]/g.test(inputValue)) {
            // Si contiene caracteres especiales, eliminamos y actualizamos el valor del campo de entrada
            const filteredValue = inputValue.replace(/[^a-zA-Z0-9 ]/g, '');
            setGame(filteredValue);
        } else {
            // Si no contiene caracteres especiales, actualizamos el valor del campo de entrada directamente
            setGame(inputValue);
        }

    };

    const onSearch = (game) => {
        // verificamos si game no está vacío después de eliminar los espacios en blanco del principio y final
        if (game.trim()) {
            setLoading(true);
            dispatch(getGameByName(game))
                .then(() => dispatch(setLoading(false)))
                .catch(() => dispatch(setLoading(false)))
            setGame('');
        } else {
            alert('The name of the game cannot be empty.');
        }
    };

    const onAllGames = () => {
        setLoading(true);
        dispatch(getGenres());

        dispatch(getGames()).finally(() => {
            setLoading(false);
            setSelectedFilters(initialState);
        });
    };

    useEffect(() => {
        setDisabled(game.length === 0);
    }, [game]);

    return (
        <div className={style.searchBarContainer}>
            <div className={style.filterSelect}>
                {/*FILTER GAMES*/}
                <select onChange={handleOrderGenre} value={selectedFilters.genre} >
                    <option value="all">Order Genre By</option>
                    {/*Hacemos un mapeado de cada uno de los genres que vienen del estado global*/}
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>

                <select onChange={handleOrderABC} value={selectedFilters.abc} >
                    <option>Order By ABC</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select onChange={handleOrderRating} value={selectedFilters.rating} >
                    <option >Order Rating By</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select onChange={handleOrderCreated} value={selectedFilters.created} >
                    <option >Order By</option>
                    <option value="Created">Created</option>
                    <option value="NoCreated">Not Created</option>
                </select>
            </div>

            <div className={style.searchGame}>
                {/*SEARCH BY NAME*/}
                <input
                    type="search"
                    value={game}
                    onChange={handleChange}
                    placeholder="Enter name to search for..."
                />

                <button className={style.search} onClick={() => onSearch(game)} disabled={disabled}>
                    Search
                </button>

                <button onClick={() => onAllGames()}>
                    All Games
                </button>

                {loading && <Loading />}

            </div>
        </div>
    );
};

export default SearchBar;