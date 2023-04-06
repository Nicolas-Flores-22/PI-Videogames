import style from './Detail.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getGame, cleanDetail, deleteGame, deleteGameCreated } from "../../redux/actions/actions";
import Loading from '../Loading/Loading'


const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getGame(id))
            .then(() => setLoading(false))
            .catch(() => setLoading(false))
        return () => {
            setLoading(true);
            dispatch(cleanDetail())
        };
    }, [id]);

    const game = useSelector(state => state.detailGame);

    const handleBack = () => {
        setLoading(true);
        // navigate(-1);
        navigate('/home');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    const onClose = async (id) => {
        if (window.confirm('Are you sure you want to delete the videogame?')) {
            setLoading(true); // mostrar el componente Loading

            await dispatch(deleteGameCreated(id));
            await dispatch(deleteGame(id));

            setLoading(false); // ocultar el componente Loading
            navigate('/home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <div className={style.container}>

            {
                loading ? (
                    <Loading />
                ) : (
                    <div className={style.containerDetail}>
                        <div className={style.containerDatosCard}>
                            <div className={style.containerDetailCard}>
                                {/* <h2>Id</h2> */}
                                <h2>{game?.id}</h2>
                                <hr />
                                <h1>{game?.name}</h1>
                                <hr />
                                <h3>Description </h3>
                                <p>{game?.description}</p>
                                <hr />
                                <h3>Launch date </h3>
                                <p>{game?.released}</p>
                                <hr />
                                <h3>Rating </h3>
                                <p>{game?.rating}</p>
                                <hr />
                                <h3>Platforms </h3>
                                <p>{game?.platforms}</p>
                                <hr />
                                <h3>Genres </h3>
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
                )
            }

        </div>
    );
};

export default Detail;