const {Router} = require('express');
const {validationResult, check} = require('express-validator');
const Genero = require('../models/Genero');

const router = Router();

router.get('/', async function(req, res){
    try{

        const generos = await Genero.find();
        res.send(generos);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', 
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
        check('descripcion', 'invalid.descripcion').not().isEmpty(),
    ],
    async function(req, res){
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            const existeGenero = await Genero.findOne({ nombre: req.body.nombre });
            if(existeGenero){
                return res.status(400).send('Ya existe el genero');
            }

            let genero = new Genero();

            genero.nombre = req.body.nombre;    
            genero.estado = req.body.estado;  
            genero.descripcion = req.body.descripcion;        
            genero.fechaCreacion = new Date();
            genero.fechaActualizacion = new Date();            

            genero = await genero.save();

            res.send(genero);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

router.put('/:generoId',
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
        check('descripcion', 'invalid.descripcion').not().isEmpty(),
    ],
    async function(req, res){
        try {
            
            let genero = await Genero.findById(req.params.generoId);
            if(!genero){
                return res.status(400).send('El género no existe');
            }

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            const existeGenero = await Genero.findOne({ nombre: req.body.nombre, _id: { $ne: genero._id } });
            if(existeGenero){
                return res.status(400).send('Ya existe el genero');
            }

            genero.nombre = req.body.nombre;
            genero.estado = req.body.estado;  
            genero.descripcion = req.body.descripcion;
            genero.fechaActualizacion = new Date();

            genero = await genero.save();

            res.send(genero);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

module.exports = router;