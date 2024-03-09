/**
 * Esquema de Mongoose para el modelo Tipo.
 */

const { Schema, model } = require('mongoose');

const TipoSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },    
    descripcion: {
        type: String,
        required: true,
    },
    fechaCreacion: {
        type: Date,
        required: true,
    },
    fechaActualizacion: {
        type: Date,
        required: true,
    }
});

// Exporta el modelo Tipo
module.exports = model('Tipo', TipoSchema);