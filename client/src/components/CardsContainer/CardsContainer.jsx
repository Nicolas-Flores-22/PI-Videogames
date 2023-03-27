import style from './CardsContainer.module.css';
import Card from '../Card/Card'
import { useSelector } from 'react-redux';
import { useState } from 'react';

const CardsContainer = () => {


    const games = useSelector(state => state.games);

    // Creamos un estado que controle la página actual que se está mostrando y actualizar su valor cada vez que se haga clic en el botón de "Siguiente" o "Anterior"
    const [currentPage, setCurrentPage] = useState(1);

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
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Manejamos el evento para ir a la página siguiente y además hacemos que en la página se scrollee hasta los primeros elementos de la página siguiente
    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className={style.cardsContainer}>
            <div className={style.botonesPaginado}>
                {currentPage > 1 && (
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                )}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : ""}>Next</button>
            </div>

            <div className={style.containerCards}>
                {
                    gamesToShow.map((game) => {
                        return <Card
                            key={game.id}
                            id={game.id}
                            name={game.name}
                            image={game.image}
                            genres={game.genres.map(gn => gn.name).join('  |  ')}
                        />
                    })
                }
            </div>
            <div className={style.botonesPaginado}>
                {currentPage > 1 && (
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                )}
                <button onClick={handleNextPage} disabled={currentPage === totalPages} className={currentPage === totalPages ? "disabled" : ""}>Next</button>
            </div>
        </div>
    );
};

export default CardsContainer;