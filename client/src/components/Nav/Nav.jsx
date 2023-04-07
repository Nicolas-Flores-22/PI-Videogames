import style from './Nav.module.css';
import { Link, useLocation } from "react-router-dom";
import nintendo from '../../assets/nintendo.png'
import playstation from '../../assets/playstation.png'
import xbox from '../../assets/xbox.png'
import gamer from '../../assets/gamer.png'
import { useState, useEffect } from 'react';

const Nav = () => {
    const location = useLocation();
    const [activeButton, setActiveButton] = useState("");
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        switch (location.pathname) {
            case "/home":
                setActiveButton("HOME");
                break;
            case "/about":
                setActiveButton("ABOUT");
                break;
            case "/create":
                setActiveButton("CREATE");
                break;
            default:
                setActiveButton("");
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const renderButtons = () => (
        <>
            <Link to="/">
                <button>LOGOUT</button>
            </Link>
            <Link to="/about">
                <button
                    className={activeButton === "ABOUT" ? style.activeButton : ""}
                >
                    ABOUT
                </button>
            </Link>
            <Link to="/home">
                <button
                    className={activeButton === "HOME" ? style.activeButton : ""}
                >
                    HOME
                </button>
            </Link>
            <Link to="/create">
                <button
                    className={activeButton === "CREATE" ? style.activeButton : ""}
                >
                    CREATE
                </button>
            </Link>
        </>
    );

    const renderMobileMenu = () => (
        <details className={style.mobileMenu}>
            <summary>MENU</summary>
            {renderButtons()}
        </details>
    );

    return (
        <div className={style.navContainer}>
            <div className={style.navBotones}>
                {isMobile ? renderMobileMenu() : renderButtons()}
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