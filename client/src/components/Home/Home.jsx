// import style from './Home.module.css';
import SearchBar from "../SearchBar/SearchBar.jsx";
import CardsContainer from "../CardsContainer/CardsContainer";
import Loading from '../Loading/Loading'
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getGames, getGenres } from "../../redux/actions/actions";

const Home = () => {

    const dispatch = useDispatch();
    // const load = useSelector(state => state.isLoading)
    const [load, setLoad] = useState(true);

    dispatch(getGames())
    
    useEffect(() => {
        dispatch(getGenres()).then(() => dispatch(setLoad(false)));
        // dispatch(loaded())
    }, [dispatch]);

    return (
        <div>
            {
                load ? <Loading /> :
                    <>
                        <div>
                            <SearchBar />
                        </div>

                        <div>
                            <CardsContainer />
                        </div>
                    </>
            }
        </div>
    );
};

export default Home;