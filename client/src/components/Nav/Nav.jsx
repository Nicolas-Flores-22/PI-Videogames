import style from './Nav.module.css';
import { Link } from "react-router-dom";
import nintendo from '../../assets/nintendo.png'
import playstation from '../../assets/playstation.png'
import xbox from '../../assets/xbox.png'
import gamer from '../../assets/gamer.png'

const Nav = () => {
    return (
        <div className={style.navContainer}>
            <div className={style.navBotones}>
                <Link to='/'><button>LOGOUT</button></Link>
                <Link to='/about'><button>ABOUT</button></Link>
                <Link to='/home'><button>HOME</button></Link>
                <Link to='/create'><button>CREATE</button></Link>
            </div>
            <div className={style.navImage}>
                <img src={gamer} alt="gamer-videogame" />
                <img src={nintendo} alt="nintendo-videogame" />
                <img src={playstation} alt="playstation-videogame" />
                <img src={xbox} alt="xbox-videogame" />
            </div>
        </div>
    );
};

export default Nav;