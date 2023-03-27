import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = (props) => {
    return (
        <div className={style.card}>

            <Link className={style.cardLinkDetail} to={`/detail/${props.id}`}>
                <div className={style.cardNombre}>
                    <h2>{props.name}</h2>
                </div>

                <img src={props.image} alt={props.image} />

                <div className={style.cardGenres}>
                    <p>{props.genres}</p>
                </div>
            </Link>

        </div>
    );
};

export default Card;