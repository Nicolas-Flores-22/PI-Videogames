import style from './Detail.module.css';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getGame, cleanDetail, deleteGame, deleteGameCreated } from "../../redux/actions/actions";


const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGame(id));
        return () => dispatch(cleanDetail());
    }, [id]);

    const game = useSelector(state => state.detailGame);

    const handleBack = () => {
        // navigate(-1);
        navigate('/home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onClose = (id) => {
        if (window.confirm('¿Estás seguro de eliminar el videogame?')) {
            dispatch(deleteGameCreated(id));
            dispatch(deleteGame(id));
            navigate('/home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={style.containerDetail}>

            <div className={style.containerDatosCard}>
                <div className={style.containerDetailCard}>
                    {/* <h2>Id</h2> */}
                    <h2>{game?.id}</h2>
                    <hr />
                    <h1>{game?.name}</h1>
                    <hr />
                    <h3>Descripción </h3>
                    <p>{game?.description}</p>
                    <hr />
                    <h3>Fecha Lanzamiento </h3>
                    <p>{game?.released}</p>
                    <hr />
                    <h3>Rating </h3>
                    <p>{game?.rating}</p>
                    <hr />
                    <h3>Plataformas </h3>
                    <p>{game?.platforms}</p>
                    <hr />
                    <h3>Géneros </h3>
                    <p>{game?.genres && game.genres.map(gn => gn.name).join('  |  ')}</p>
                </div>

                <div className={style.imagenDetailCard}>
                    <img src={game?.image} alt={game?.image} />
                </div>
            </div>
            
            <div className={style.containerBotones}>
                <button className={style.botonBack} onClick={handleBack}>
                    BACK
                </button>
                {game.created && <button className={style.botonDelete} onClick={() => onClose(game.id)}>DELETE GAME</button>}
            </div>

        </div>
    );
};

export default Detail;