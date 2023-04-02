import style from './CardsContainer.module.css';
import Card from '../Card/Card'
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import Loading from '../Loading/Loading';
import { getGenres } from '../../redux/actions/actions';

const CardsContainer = () => {

    const games = useSelector(state => state.allGames);

    useEffect(() => getGenres())

    // Creamos un estado que controle la página actual que se está mostrando y actualizar su valor cada vez que se haga clic en el botón de "Siguiente" o "Anterior"
    const [currentPage, setCurrentPage] = useState(1);

    // Creamos un estado que mantendrá la página actual seleccionada
    const [selectedPage, setSelectedPage] = useState(1);

    // Creamos un estado para indicar si se está cargando o no la página
    const [loading, setLoading] = useState(false);

    // Declaramos la variable donde le indicamos cuántos games tendrá por página
    const gamesPerPage = 15;

    // Aquí calculamos el total de páginas y con el método Math.ceil hacemos que si la división no es exacta se debe redondear
    const totalPages = Math.ceil(games.length / gamesPerPage);

    // Calculamos los índices del primer y último elemento de la página actual

    // El índice del último elemento(indexOfLastGame) de la página actual es igual al número de página actual(currentPage) multiplicado por la cantidad de juegos por página(gamesPerPage)
    const indexOfLastGame = currentPage * gamesPerPage;

    // El índice del primer elemento(indexOfFirstGame) de la página actual es igual al índice del último elemento de la página actual(indexOfLastGame) menos la cantidad de juegos por página(gamesPerPage) 
    const indexOfFirstGame = indexOfLastGame - gamesPerPage;

    // en gamesToShow guardamos un array con los juegos que se encuentran entre los índices del primer elemento y del último elemento
    const gamesToShow = games.slice(indexOfFirstGame, indexOfLastGame);

    // Manejamos el evento para ir a la página anterior
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setLoading(true); // Indicamos que se está cargando la siguiente página
            setCurrentPage(currentPage - 1);
            setSelectedPage(currentPage - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    // Manejamos el evento para ir a la página siguiente y además hacemos que en la página se scrollee hasta los primeros elementos de la página siguiente
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setLoading(true); // Indicamos que se está cargando la siguiente página
            setCurrentPage(currentPage + 1);
            setSelectedPage(currentPage + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    useEffect(() => {
        // En este efect simulamos un tiempo de carga de 2 segundos para mostrar el componente Loading
        const timeout = setTimeout(() => {
            setLoading(false); // Indicamos que la siguiente página ya se ha cargado
        }, 2000);

        return () => clearTimeout(timeout); // Limpiamos el timeout si el componente se desmonta antes de que se complete el tiempo de carga
    }, [currentPage]);

    const handlePageClick = (page) => {
        setLoading(true);
        setCurrentPage(page);
        setSelectedPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Creamos un array de botones de página 
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        pageButtons.push(
            <button
                key={i}
                onClick={() => handlePageClick(i)}
                className={selectedPage === i ? style.selectedPageButton : ""}
            >
                {i}
            </button>
        );
    }

    // Comprobamos si gamesToShow existe antes de intentar llamar al método `map`
    if (!gamesToShow) {
        return null;
    }

    return (
        <div className={style.cardsContainer}>
            <div className={style.botonesPaginado}>
                {currentPage > 1 && (
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                )}
                {pageButtons}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : ""}>Next</button>
            </div>

            <div className={style.containerCards}>
                {/* Comprobamos si gamesToShow existe antes de intentar llamar al método `map` */}
                {
                    gamesToShow && gamesToShow.map((game) => {
                        return <Card
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            image={game.image}
                            genres={game.genres?.map(gn => gn.name).join('  |  ')}
                        />
                    })
                }
            </div>
            <div className={style.botonesPaginado}>
                {currentPage > 1 && (
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                )}
                {pageButtons}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : ""}>Next</button>
            </div>
            {loading && <Loading />}
        </div>
    );
};

export default CardsContainer;