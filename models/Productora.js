/**
 * Esquema de Mongoose para el modelo Productora.
 */

const { Schema, model } = require('mongoose');

const ProductoraSchema = Schema({
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
    slogan: {
        type: String,
        required: true,
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

// Exporta el modelo Productora
module.exports = model('Productora', ProductoraSchema);