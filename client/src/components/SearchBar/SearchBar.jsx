import style from './SearchBar.module.css';

// import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameByName, getGames, orderGameByABC, orderGamebyCreated, orderGameByGenre, orderGameByRating } from "../../redux/actions/actions";

const SearchBar = () => {

    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres)

    const [orderABC, setOrderABC] = useState("");
    const [orderRating, setOrderRating] = useState("");
    const [orderGenre, setOrderGenre] = useState("");
    const [orderCreated, setOrderCreated] = useState("");

    // FILTRADO DE VIDEJUEGOS
    const handleOrderABC = (event) => {
        setOrderABC(event.target.value)
    };

    const handleOrderRating = (event) => {
        setOrderRating(event.target.value)
    };

    const handleOrderGenre = (event) => {
        setOrderGenre(event.target.value)
    };

    const handleOrderCreated = (event) => {
        setOrderCreated(event.target.value)
    };

    useEffect(() => {
        if (!orderABC)
            dispatch(getGames());

        if (orderABC)
            dispatch(orderGameByABC(orderABC));
    }, [orderABC])

    useEffect(() => {
        if (!orderRating)
            dispatch(getGames());

        if (orderRating)
            dispatch(orderGameByRating(orderRating));
    }, [orderRating])

    useEffect(() => {
        if (!orderGenre)
            dispatch(getGames());

        if (orderGenre)
            dispatch(orderGameByGenre(orderGenre));
    }, [orderGenre])

    useEffect(() => {
        if (!orderCreated)
            dispatch(getGames());

        if (orderCreated)
            dispatch(orderGamebyCreated(orderCreated))
    }, [orderCreated])


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
            dispatch(getGameByName(game));
            setGame('');
        } else {
            alert('El nombre del juego no puede estar vacío');
        }
    };

    return (
        <div className={style.searchBarContainer}>
            <div className={style.filterSelect}>
                {/*FILTER GAMES*/}
                <select onChange={handleOrderABC} value={orderABC}>
                    <option value="">Order By ABC</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select onChange={handleOrderRating} value={orderRating}>
                    <option value="">Order Rating By</option>
                    <option value="Ascendente">Ascendente</option>
                    <option value="Descendente">Descendente</option>
                </select>

                <select onChange={handleOrderGenre} value={orderGenre}>
                    <option value="">Order Genre By</option>
                    {/*Hacemos un mapeado de cada uno de los genres que vienen del estado global*/}
                    {genres.map(genre => (
                        <option key={genre.id} value={genre.name}>{genre.name}</option>
                    ))}
                </select>

                <select onChange={handleOrderCreated} value={orderCreated}>
                    <option value="">Order By</option>
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
                <button onClick={() => onSearch(game)}>Buscar</button>
            </div>
        </div>
    );
};

export default SearchBar;