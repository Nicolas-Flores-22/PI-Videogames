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
        errors.name = 'El nombre no puede estar vacío.';
    } else {
        if (form.name.length < 2) {
            errors.name = 'El nombre debe ser mayor a 1 caracter.';
        } else if (specialCharsRegex.test(form.name)) {
            errors.name = 'El nombre no puede contener caracteres especiales.';
        } else if (!spacesRegex.test(form.name)) {
            errors.name = 'El nombre no puede tener espacios vacíos al comienzo o al final.';
        }
    }

    //VALIDANDO DESCRIPTION
    if (!form.description) {
        errors.description = 'La descripción no puede estar vacía.';
    } else {
        if (form.description.length < 5) {
            errors.description = 'La descripción no puede ser muy corta.';
        } else if (specialCharsRegex.test(form.description)) {
            errors.description = 'La descripción no puede contener caracteres especiales.';
        } else if (!spacesRegex.test(form.description)) {
            errors.description = 'La descripción no puede tener espacios vacíos al comienzo o al final.';
        }
    }

    //VALIDANDO PLATFORM
    if (!form.platforms || form.platforms.length === 0) {
        errors.platforms = 'Debe ingresar al menos una plataforma.';
    } else {
        for (let i = 0; i < form.platforms.length; i++) {
            const platform = form.platforms[i];
            if (platform.length < 2) {
                errors.platforms = 'Cada plataforma debe tener al menos 2 caracteres.';
                break;
            } else if (specialCharsRegex.test(platform)) {
                errors.platforms = 'Las plataformas no pueden contener caracteres especiales.';
                break;
            } else if (!spacesRegex.test(platform)) {
                errors.platforms = 'Las plataformas no pueden tener espacios vacíos al comienzo o al final.';
                break;
            }
        }
    }

    //VALIDANDO IMAGE
    if (!form.image) {
        errors.image = 'La imagen no puede estar vacía.';
    } else {
        const isValidUrl = urlRegex.test(form.image);
        if (!isValidUrl) {
            errors.image = 'Por favor ingrese una URL de imagen válida.';
        }
    }

    //VALIDANDO RELEASED
    if (!form.released) {
        errors.released = 'La fecha de publicación no puede estar vacía.';
    } else {
        if (!dateRegex.test(form.released)) {
            errors.released = 'Formato de fecha inválido';
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
                errors.released = 'Fecha inválida.'
            }
        }
    }

    //VALIDANDO RATING
    if (!form.rating) {
        errors.rating = 'El valoración no puede estar vacía.'
    } else if (!Number.isInteger(Number(form.rating))) {
        errors.rating = 'La calificación debe ser un número entero.';
    } else if (Number(form.rating) < 1) {
        errors.rating = 'La calificación no puede ser menor que 1.';
    } else if (Number(form.rating) > 5) {
        errors.rating = 'La calificación no puede ser mayor que 5.';
    }

    //VALIDANDO GENRES
    if (!form.genreId.length) {
        errors.genreId = 'Puede seleecionar uno o varios géneros (combinando las teclas "Ctrl + clic").'
    }

    return errors;
};

export default validate;