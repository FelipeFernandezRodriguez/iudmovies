/**
 * Valida los campos requeridos en un objeto `req.body`.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @returns {Array} - Un array de mensajes de validación.
 */

const validarMedia = (req) => {

    const validaciones = [];

    if(!req.body.serial){
        validaciones.push('Serial es requerido');
    }

    if(!req.body.titulo){
        validaciones.push('Titulo es requerido');
    }

    if(!req.body.sinopsis){
        validaciones.push('Sinopsis es requerido');
    }

    if(!req.body.url){
        validaciones.push('URL es requerido');
    }

    if(!req.body.foto){
        validaciones.push('Foto es requerido');
    }    

    if(!req.body.fechaEstreno){
        validaciones.push('Fecha Estreno es requerido');
    }

    if(!req.body.genero){
        validaciones.push('Genero es requerido');
    }

    if(!req.body.director){
        validaciones.push('Director es requerido');
    }

    if(!req.body.productora){
        validaciones.push('Productora es requerido');
    }    

    if(!req.body.tipo){
        validaciones.push('Tipo es requerido');
    }
    
    return validaciones;

}

module.exports = { validarMedia, }