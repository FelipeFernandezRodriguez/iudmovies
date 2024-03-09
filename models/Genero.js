/**
 * Esquema de Mongoose para el modelo Genero.
 */

const { Schema, model } = require('mongoose');

const GeneroSchema = Schema({
    nombre: {
        type: String,
        required: true,
        unique: true,
    },
    estado: {
        type: String,
        required: true,
        enum: [
            'Activo', 'Inactivo'
        ]
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

// Exporta el modelo Genero
module.exports = model('Genero', GeneroSchema);