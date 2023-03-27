// import style from './Home.module.css';
import SearchBar from "../SearchBar/SearchBar.jsx";
import CardsContainer from "../CardsContainer/CardsContainer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGenres } from "../../redux/actions/actions";

const Home = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getGenres())
    }, [dispatch]);

    return (
        <div>
            <div>
                <SearchBar />
            </div>

            <div>
                <CardsContainer />
            </div>
        </div>
    );
};

export default Home;