const {Router} = require('express');
const {validationResult, check} = require('express-validator');
const Productora = require('../models/Productora');

const router = Router();

router.get('/', async function(req, res){
    try{

        const productoras = await Productora.find();
        res.send(productoras);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error');
    }
});

router.post('/', 
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
        check('slogan', 'invalid.slogan').not().isEmpty(),
        check('descripcion', 'invalid.descripcion').not().isEmpty(),
    ],
    async function(req, res){
        try {

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            const existeProductora = await Productora.findOne({ nombre: req.body.nombre });
            if(existeProductora){
                return res.status(400).send('Ya existe la productora');
            }

            let productora = new Productora();

            productora.nombre = req.body.nombre;        
            productora.estado = req.body.estado;   
            productora.slogan = req.body.slogan;  
            productora.descripcion = req.body.descripcion;   
            productora.fechaCreacion = new Date();
            productora.fechaActualizacion = new Date();
            
            productora = await productora.save();

            res.send(productora);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

router.put('/:productoraId',
    [
        check('nombre', 'invalid.nombre').not().isEmpty(),
        check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo']),
        check('slogan', 'invalid.slogan').not().isEmpty(),
        check('descripcion', 'invalid.descripcion').not().isEmpty(),
    ],
    async function(req, res){
        try {
            
            let productora = await Productora.findById(req.params.productoraId);
            if(!productora){
                return res.status(400).send('Productora no existe');
            }

            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ messages: errors.array() });
            }

            const existeProductora = await Productora.findOne({ nombre: req.body.nombre, _id: { $ne: productora._id } });
            if(existeProductora){
                return res.status(400).send('Ya existe la productora');
            }

            productora.nombre = req.body.nombre;
            productora.estado = req.body.estado;
            productora.slogan = req.body.slogan;  
            productora.descripcion = req.body.descripcion;   
            productora.fechaActualizacion = new Date();            

            productora = await productora.save();

            res.send(productora);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error');
        }
    }
);

module.exports = router;