import style from './SearchBar.module.css';

// import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameByName, getGames, getGenres, orderGameByABC, orderGamebyCreated, orderGameByGenre, orderGameByRating } from "../../redux/actions/actions";
import Loading from '../Loading/Loading';

const SearchBar = () => {

    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres);

    const [loading, setLoading] = useState(false);

    // Estado para manejar el habilitado del botón "Search"
    const [disabled, setDisabled] = useState(true);

    // FILTRADO DE VIDEJUEGOS
    const handleOrderGenre = (event) => {
        setLoading(true);
        dispatch(orderGameByGenre(event.target.value));
        setLoading(false);
    };

    const handleOrderABC = (event) => {
        setLoading(true);
        dispatch(orderGameByABC(event.target.value));
        setLoading(false);
    };

    const handleOrderRating = (event) => {
        setLoading(true);
        dispatch(orderGameByRating(event.target.value));
        setLoading(false);
    };

    const handleOrderCreated = (event) => {
        setLoading(true);
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
            alert('El nombre del juego no puede estar vacío');
        }
    };

    const onAllGames = () => {
        setLoading(true);
        dispatch(getGenres());
        dispatch(getGames()).then(() => setLoading(false));
    };

    useEffect(() => {
        setDisabled(game.length === 0);
    }, [game]);

    return (
        <div className={style.searchBarContainer}>
            <div className={style.filterSelect}>
                {/*FILTER GAMES*/}
                <select onChange={handleOrderGenre} >
                    <option value="all">Order Genre By</option>
                    {/*Hacemos un mapeado de cada uno de los genres que vienen del estado global*/}
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>

                <select onChange={handleOrderABC} >
                    <option>Order By ABC</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select onChange={handleOrderRating} >
                    <option >Order Rating By</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select onChange={handleOrderCreated} >
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
                    placeholder="Ingrese nombre a buscar..."
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