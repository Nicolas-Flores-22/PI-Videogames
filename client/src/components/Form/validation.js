const validate = (form) => {
    //Regex para validar la fecha
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    //Regex para validar imagen
    const urlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;
    // Regex para validar caracteres especiales
    const specialCharsRegex = /[!@#$%^&*()?":{}|<>]/;
    // Regex para validar los espacios 
    const spacesRegex = /^\S.*\S$/;

    const errors = {};

    //VALIDANDO NAME
    if (!form.name) {
        errors.name = 'The name cannot be empty.';
    } else {
        if (form.name.length < 1 || form.name.length > 50) {
            errors.name = 'The name must be longer than 1 character and shorter than 50 characters.';
        } else if (specialCharsRegex.test(form.name)) {
            errors.name = 'The name cannot contain special characters.';
        } else if (!spacesRegex.test(form.name)) {
            errors.name = 'The name cannot have spaces at the beginning or at the end.';
        }
    }

    //VALIDANDO DESCRIPTION
    if (!form.description) {
        errors.description = 'The description cannot be empty.';
    } else {
        if (form.description.length < 5) {
            errors.description = 'The description cannot be too short.';
        } else if (specialCharsRegex.test(form.description)) {
            errors.description = 'The description cannot contain special characters.';
        } else if (!spacesRegex.test(form.description)) {
            errors.description = 'The description cannot have gaps at the beginning or at the end.';
        }
    }

    //VALIDANDO PLATFORM
    if (!form.platforms || form.platforms.length === 0) {
        errors.platforms = 'You must enter at least one platform.';
    } else {
        for (let i = 0; i < form.platforms.length; i++) {
            const platform = form.platforms[i];
            if (platform.length < 2) {
                errors.platforms = 'Each platform must have at least 2 characters.';
                break;
            } else if (specialCharsRegex.test(platform)) {
                errors.platforms = 'Platforms may not contain special characters.';
                break;
            } else if (!spacesRegex.test(platform)) {
                errors.platforms = 'Platforms may not have empty spaces at the beginning or at the end.';
                break;
            }
        }
    }

    //VALIDANDO IMAGE
    if (!form.image) {
        errors.image = 'The image cannot be empty.';
    } else {
        const isValidUrl = urlRegex.test(form.image);
        if (!isValidUrl) {
            errors.image = 'Please enter a valid image URL.';
        }
    }

    //VALIDANDO RELEASED
    if (!form.released) {
        errors.released = 'The date of publication cannot be empty.';
    } else {
        if (!dateRegex.test(form.released)) {
            errors.released = 'Invalid date format.';
        } else {
            // spliteamos el año, mes y día ingresados por el input
            const parts = form.released.split('-');

            // guardamos el año en la variable year
            const year = parseInt(parts[0]);

            // guardamos el mes en la variable month
            // Se resta 1 al mes porque los meses en JavaScript comienzan en 0
            const month = parseInt(parts[1]) - 1;

            // guardamos el día en day
            const day = parseInt(parts[2]);

            // Creamos una instancia de Date
            const date = new Date(year, month, day);

            // Verificamos si el mes y el día son válidos utilizando los métodos getMonth() y getDate() de Date 
            if (date.getMonth() !== month || date.getDate() !== day) {
                errors.released = 'Invalid date.'
            }
        }
    }

    //VALIDANDO RATING
    if (!form.rating) {
        errors.rating = 'The qualification cannot be empty.'
    } else if (!Number.isInteger(Number(form.rating))) {
        errors.rating = 'The rating must be a whole number.';
    } else if (Number(form.rating) < 1) {
        errors.rating = 'The rating cannot be less than 1.';
    } else if (Number(form.rating) > 5) {
        errors.rating = 'The rating cannot be higher than 5.';
    }

    //VALIDANDO GENRES
    if (!form.genreId.length) {
        errors.genreId = 'You can select one or several genres (by combining the keys "Ctrl + click").'
    }

    return errors;
};

export default validate;