const {Router} = require('express');
const {validationResult, check} = require('express-validator');
const Director = require('../models/Director');

const router = Router();

router.get('/', async function(req, res){
    try{

        const directores = await Director.find();
        res.send(directores);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', 
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    ],
    async function(req, res){
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            let director = new Director();

            director.nombre = req.body.nombre;        
            director.estado = req.body.estado;    
            director.fechaCreacion = new Date();
            director.fechaActualizacion = new Date();
            
            director = await director.save();

            res.send(director);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

router.put('/:directorId',
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
    ],
    async function(req, res){
        try {
            
            let director = await Director.findById(req.params.directorId);
            if(!director){
                return res.status(400).send('Director no existe');
            }

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            director.nombre = req.body.nombre;
            director.estado = req.body.estado;
            director.fechaActualizacion = new Date();            

            director = await director.save();

            res.send(director);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

module.exports = router;