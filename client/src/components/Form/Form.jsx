import style from './Form.module.css';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addGame, postGame } from "../../redux/actions/actions";
import { useNavigate } from "react-router-dom";

// importamos nuestro archivo validate
import validate from './validation';
import Loading from '../Loading/Loading';

const Form = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const genres = useSelector((state) => state.genres);

    const [loading, setLoading] = useState(false);


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
        // utilizamos una como separador con el split(). Luego utilizamos un map para ejecutar la función
        // trim() y esta función elimina cualquier espacio en blano tanto al principio como al final de cada
        // plataforma infresada en el input
        const platformsArray = value.split(',').map(platform => platform.trim());
        // console.log(platformsArray)
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

    // Estado para manejar si los campos están completos o no
    const [disabled, setDisabled] = useState(true);

    // Función que verifique si los campos del formulario están vacíos
    const checkFields = () => {
        if (
            form.name === "" ||
            form.description === "" ||
            form.platforms.length === 0 ||
            form.image === "" ||
            form.released === "" ||
            form.rating === "" ||
            form.genreId.length === 0
        ) {
            return true;
        }
        return false;
    };

    useEffect(() => {
        setDisabled(checkFields());
    }, [form]);

    const submitHandler = (event) => {
        event.preventDefault();

        setLoading(true); // Muestra el componente Loading
        setTimeout(async () => {
            const createGame = dispatch(postGame(form));
            if (createGame) {
                dispatch(addGame(createGame));
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

                setLoading(false); // Oculta el componente Loading
                await navigate("/home"); // Espera a que el estado y la navegación se completen
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        }, 1000); // Espera 1 segundo antes de enviar el formulario
    };

    return (
        <>
            {
                loading ?
                    (<Loading />) : (
                        <>

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
                                        placeholder="Please enter the name"
                                    />
                                    <p>{errors.name ? errors.name : ''}</p>

                                    <label>Description </label>
                                    <textarea
                                        type="text"
                                        value={form.description}
                                        onChange={changeHandler}
                                        name='description'
                                        autoComplete="off"
                                        placeholder="Please enter a description..."
                                    />
                                    <p>{errors.description ? errors.description : ''}</p>

                                    <label>Platforms </label>
                                    <input
                                        type="text"
                                        value={form.platforms.join(', ')}
                                        onChange={changeHandlerPlatforms}
                                        name='platforms'
                                        autoComplete="off"
                                        placeholder="Separate platforms with commas."
                                    />
                                    <p>{errors.platforms ? errors.platforms : ''}</p>

                                    <label>Image URL </label>
                                    <input
                                        type="text"
                                        value={form.image}
                                        onChange={changeHandler}
                                        name='image'
                                        autoComplete="off"
                                        placeholder="Enter a URL for the image"
                                    />
                                    <p>{errors.image ? errors.image : ''}</p>

                                    <label>Launch Date </label>
                                    <input
                                        type="text"
                                        value={form.released}
                                        onChange={changeHandler}
                                        name='released'
                                        autoComplete="off"
                                        placeholder="Enter the date: yyyy-mm-dd"
                                    />
                                    <p>{errors.released ? errors.released : ''}</p>

                                    <label>Rating </label>
                                    <input
                                        type="text"
                                        value={form.rating}
                                        onChange={changeHandler}
                                        name='rating'
                                        autoComplete="off"
                                        placeholder="Please enter a number"
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

                                    <button type="submit" disabled={disabled}>CREATE</button>

                                </form>

                            </div>
                        </>
                    )
            }
        </>
    );
};

export default Form;