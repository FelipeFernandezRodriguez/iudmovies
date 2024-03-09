/**
 * Esquema de Mongoose para el modelo Director.
 */
const { Schema, model } = require('mongoose');

const DirectorSchema = Schema({
    nombre: {
        type: String,
        required: true, // not null
    },
    estado: {
        type: String,
        required: true,
        enum: [
            'Activo', 'Inactivo'
        ]
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

// Exporta el modelo Director
module.exports = model('Director', DirectorSchema);