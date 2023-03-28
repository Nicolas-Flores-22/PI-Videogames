import style from './SearchBar.module.css';

// import axios from "axios";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGameByName, getGames, orderGameByABC, orderGamebyCreated, orderGameByGenre, orderGameByRating } from "../../redux/actions/actions";
import Loading from '../Loading/Loading';

const SearchBar = () => {

    const dispatch = useDispatch();

    const genres = useSelector(state => state.genres);

    const [loading, setLoading] = useState(false);

    // Estado para manejar el habilitado del botón "Search"
    const [disabled, setDisabled] = useState(true);

    const [orderABC, setOrderABC] = useState("");
    const [orderRating, setOrderRating] = useState("");
    const [orderGenre, setOrderGenre] = useState("");
    const [orderCreated, setOrderCreated] = useState("");

    // FILTRADO DE VIDEJUEGOS
    const handleOrderABC = (event) => {
        setLoading(true);
        setOrderABC(event.target.value)
    };

    const handleOrderRating = (event) => {
        setLoading(true);
        setOrderRating(event.target.value)
    };

    const handleOrderGenre = (event) => {
        setLoading(true);
        setOrderGenre(event.target.value)
    };

    const handleOrderCreated = (event) => {
        setLoading(true);
        setOrderCreated(event.target.value)
    };

    useEffect(() => {
        if (!orderABC)
            dispatch(getGames()).then(() => setLoading(false));

        if (orderABC)
            dispatch(orderGameByABC(orderABC)).then(() => setLoading(false));
    }, [orderABC])

    useEffect(() => {
        if (!orderRating)
            dispatch(getGames()).then(() => setLoading(false));;

        if (orderRating)
            dispatch(orderGameByRating(orderRating)).then(() => setLoading(false));
    }, [orderRating])

    useEffect(() => {
        if (!orderGenre)
            dispatch(getGames()).then(() => setLoading(false));;

        if (orderGenre)
            dispatch(orderGameByGenre(orderGenre)).then(() => setLoading(false));
    }, [orderGenre])

    useEffect(() => {
        if (!orderCreated)
            dispatch(getGames()).then(() => setLoading(false));;

        if (orderCreated)
            dispatch(orderGamebyCreated(orderCreated)).then(() => setLoading(false));
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
        dispatch(getGames()).then(() => setLoading(false));
    };

    useEffect(() => {
        setDisabled(game.length === 0);
    }, [game]);

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

                {/* {loading ? <div className={style.loader}></div> : false} */}

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