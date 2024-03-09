const {Router} = require('express');
const {validationResult, check} = require('express-validator');
const Tipo = require('../models/Tipo');

const router = Router();

router.get('/', async function(req, res){
    try{

        const tipos = await Tipo.find();
        res.send(tipos);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', 
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('descripcion', 'invalid.descripcion').not().isEmpty(),
    ],
    async function(req, res){
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            const existeTipo = await Tipo.findOne({ nombre: req.body.nombre });
            if(existeTipo){
                return res.status(400).send('Ya existe el tipo');
            }

            let tipo = new Tipo();

            tipo.nombre = req.body.nombre;    
            tipo.descripcion = req.body.descripcion;        
            tipo.fechaCreacion = new Date();
            tipo.fechaActualizacion = new Date();            

            tipo = await tipo.save();

            res.send(tipo);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

router.put('/:tipoId',
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('descripcion', 'invalid.descripcion').not().isEmpty(),
    ],
    async function(req, res){
        try {
            
            let tipo = await Tipo.findById(req.params.tipoId);
            if(!tipo){
                return res.status(400).send('Tipo no existe');
            }

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            const existeTipo = await Tipo.findOne({ nombre: req.body.nombre, _id: { $ne: tipo._id } });
            if(existeTipo){
                return res.status(400).send('Ya existe el tipo');
            }

            tipo.nombre = req.body.nombre;
            tipo.descripcion = req.body.descripcion;
            tipo.fechaActualizacion = new Date();

            tipo = await tipo.save();

            res.send(tipo);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

module.exports = router;