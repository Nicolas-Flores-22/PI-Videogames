import style from './Form.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actualizarGames, addGame, postGame } from "../../redux/actions/actions";

// importamos nuestro archivo validate
import validate from './validation';

const Form = () => {
    const dispatch = useDispatch();

    const genres = useSelector((state) => state.genres);
    const games = useSelector((state) => state.games);

    const optionsGenres = Array.isArray(genres)
        ? genres.map((genre) => ({
            value: parseInt(genre.id),
            label: genre.name,
        }))
        : [];

    const [form, setForm] = useState({
        name: '',
        description: '',
        platforms: [],
        image: '',
        released: '',
        rating: '',
        genreId: [],
    });

    const [errors, setErrors] = useState({
        name: '',
        description: '',
        platforms: '',
        image: '',
        released: '',
        rating: '',
        genreId: '',
    });

    const changeHandler = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setForm({
            ...form,
            [property]: value
        });

        setErrors(
            validate({
                ...form,
                [property]: value
            })
        );

    };

    const changeHandlerPlatforms = (event) => {
        const value = event.target.value;
        const platformsArray = value.split(',').map(platform => platform.trim());
        setForm({
            ...form,
            platforms: platformsArray
        });
    };

    const changeHandlerGenres = (event) => {

        const selectedOptions = Array.from(event.target.selectedOptions)

        //Convertimos el array de string en un array de números con el parseInt
        // ["1", "2", "3"] => [1, 2, 3]
        const selectedValues = selectedOptions.map(option => parseInt(option.value))

        setForm({
            ...form,
            genreId: selectedValues
        })

        setErrors(
            validate({
                ...form,
                genreId: selectedValues
            })
        );
    };

    const submitHandler = (event) => {
        event.preventDefault();

        const createGame = dispatch(postGame(form));
        if (createGame) {
            dispatch(addGame());

            // Limpiamos los campos del formulario
            setForm({
                name: "",
                description: "",
                platforms: [],
                image: "",
                released: "",
                rating: "",
                genreId: [],
            });
            
            return ()=> dispatch(actualizarGames());
        }
    };

    // useEffect(() => {
    //     dispatch(actualizarGames())
    // }, [dispatch, games])

    return (
        <div className={style.containerForm}>

            <h1>CREATE VIDEOGAME</h1>

            <form onSubmit={submitHandler}>

                <label>Name </label>
                <input
                    type="text"
                    value={form.name}
                    onChange={changeHandler}
                    name='name'
                    autoComplete="off"
                    placeholder="Ingrese nombre"
                />
                <p>{errors.name ? errors.name : ''}</p>

                <label>Description </label>
                <textarea
                    type="text"
                    value={form.description}
                    onChange={changeHandler}
                    name='description'
                    autoComplete="off"
                    placeholder="Ingrese una descripción..."
                />
                <p>{errors.description ? errors.description : ''}</p>

                <label>Platforms </label>
                <input
                    type="text"
                    value={form.platforms.join(', ')}
                    onChange={changeHandlerPlatforms}
                    name='platforms'
                    autoComplete="off"
                    placeholder="Separe con comas las plataformas."
                />
                <p>{errors.platforms ? errors.platforms : ''}</p>

                <label>Image URL </label>
                <input
                    type="text"
                    value={form.image}
                    onChange={changeHandler}
                    name='image'
                    autoComplete="off"
                    placeholder="Ingrese una URL de imagen"
                />
                <p>{errors.image ? errors.image : ''}</p>

                <label>Launch Date </label>
                <input
                    type="text"
                    value={form.released}
                    onChange={changeHandler}
                    name='released'
                    autoComplete="off"
                    placeholder="Ingrese fecha: yyyy-mm-dd"
                />
                <p>{errors.released ? errors.released : ''}</p>

                <label>Rating </label>
                <input
                    type="text"
                    value={form.rating}
                    onChange={changeHandler}
                    name='rating'
                    autoComplete="off"
                    placeholder="Ingrese un número"
                />
                <p>{errors.rating ? errors.rating : ''}</p>

                <label>Genres </label>
                <select
                    defaultValue={form.genreId}
                    onChange={changeHandlerGenres}
                    name="genreId"
                    multiple
                // size={optionsGenres.length} //Para que muestre todos los géneros en una lista
                >
                    {optionsGenres.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                <p>{errors.genreId ? errors.genreId : ''}</p>

                <button type="submit">CREATE</button>

            </form>
        </div>
    );
};

export default Form;