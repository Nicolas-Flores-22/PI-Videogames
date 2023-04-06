import style from './Landing.module.css';
import { Link } from 'react-router-dom';

const Landing = () => {

    return (

        <div className={style.container}>
            <div className={style.bienvenida}>
                <div className={style.imagenBienvenida}>
                    <img src="https://assets.morningconsult.com/wp-uploads/2021/11/04162534/211104_Gaming-Series_Story-4_Movie-TV-Adaptation_FI.gif" alt="Imagen-video" className={style.bienvenida} />
                </div>

                <div className={style.titulos}>
                    <h1 className={style.title}>Bienvenido a nuestro sitio de videojuegos</h1>
                    <p className={style.subtitle}>Aquí encontrarás todo lo que necesitas para vivir al máximo tu pasión por los videojuegos</p>
                    <div className={style.actions}>
                        <Link to={'/home'}>
                            <button className={style.button}>
                                <span>
                                    Explorar juegos
                                </span>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>


            <div className={style.details}>
                <div className={style.detail}>
                    <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExODU3MzY5NzcwOGRmN2ZlMjA4MTBiMzYzYTIyNmFiODQ3ZGNmMTBmYSZjdD1n/JcFUHp7b9mnj5a01AN/giphy.gif" alt="Buscar juegos" className={style.detailImage} />
                    <p>Busca tus juegos favoritos por nombre y encuentra nuevas opciones para jugar</p>
                </div>
                <div className={style.detail}>
                    <img src="https://assets.morningconsult.com/wp-uploads/2021/11/04170352/211104_Gaming-Series_Story-3_Subscription-Services_FI.gif" alt="Filtrar juegos" className={style.detailImage} />
                    <p>Utiliza nuestros filtros para encontrar los juegos que mejor se adapten a tus gustos</p>
                </div>
                <div className={style.detail}>
                    <img src="https://i.pinimg.com/originals/46/11/43/461143b9b261963548410ffc9215db21.gif" alt="Crear juego" className={style.detailImage} />
                    <p>Crea tu propio juego y compártelo con otros usuarios</p>
                </div>
            </div>
        </div>
    );
};

export default Landing;