const {Router} = require('express');
const Media = require('../models/Media');
const { validarMedia } = require('../helpers/validar-media');
const Genero = require('../models/Genero');
const Director = require('../models/Director');
const Productora = require('../models/Productora');
const Tipo = require('../models/Tipo');

const router = Router();

router.get('/', async function(req, res){
    try{

        const media = await Media.find().populate([
            {
            path: 'genero', select: 'nombre estado'
            },
            {
            path: 'director', select: 'nombre estado'
            },
            {
            path: 'productora', select: 'nombre estado'
            },            
            {
            path: 'tipo', select: 'nombre'
            },
        ]);

        res.send(media);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar media');
    }
});

router.post('/', async function(req, res){
        try {

            const validaciones = validarMedia(req);
            if(validaciones.length > 0){
                return res.status(400).send(validaciones);
            }

            const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial });
            if(existeMediaPorSerial){
                return res.status(400).send('Ya existe el serial para otra media');
            }

            const existeMediaUrl = await Media.findOne({ url: req.body.url });
            if(existeMediaUrl){
                return res.status(400).send('Ya existe la URL para otra media');
            }

            const existeFoto = await Media.findOne({ foto: req.body.foto });
            if(existeFoto){
                return res.status(400).send('Ya existe la foto para otra media');
            }

            const generoEstado = await Genero.findById(req.body.genero._id);            
            if(generoEstado.estado !== 'Activo'){
                return res.status(400).send('El género no está activo');
            }

            const directorEstado = await Director.findById(req.body.director._id);            
            if(directorEstado.estado !== 'Activo'){
                return res.status(400).send('El director no está activo');
            }

            const productoraEstado = await Productora.findById(req.body.productora._id);            
            if(productoraEstado.estado !== 'Activo'){
                return res.status(400).send('La productora no está activa');
            }

            let media = new Media();

            media.serial = req.body.serial;
            media.titulo = req.body.titulo;
            media.sinopsis = req.body.sinopsis;
            media.url = req.body.url;
            media.foto = req.body.foto;
            media.fechaEstreno = req.body.fechaEstreno;
            media.genero = req.body.genero._id;
            media.director = req.body.director._id;
            media.productora = req.body.productora._id;
            media.tipo = req.body.tipo._id;
            media.fechaCreacion =new Date();
            media.fechaActualizacion =new Date();

            media = await media.save();

            res.send(media);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrio un error al crear media');
        }
    }
);

router.put('/:mediaId', async function(req, res){
        try {
            
            let media = await Media.findById(req.params.mediaId);
            if(!media){
                return res.status(400).send('Media no existe');
            }

            const validaciones = validarMedia(req);
            if(validaciones.length > 0){
                return res.status(400).send(validaciones);
            }

            const existeMediaPorSerial = await Media.findOne({ serial: req.body.serial, _id: { $ne: media._id } });
            if(existeMediaPorSerial){
                return res.status(400).send('Ya existe el serial para otra media');
            }

            const existeMediaUrl = await Media.findOne({ url: req.body.url, _id: { $ne: media._id } });
            if(existeMediaUrl){
                return res.status(400).send('Ya existe la URL para otra media');
            }            
          
            const generoEstado = await Genero.findById(req.body.genero._id);            
            if(generoEstado.estado !== 'Activo'){
                return res.status(400).send('El género no está activo');
            }

            const directorEstado = await Director.findById(req.body.director._id);            
            if(directorEstado.estado !== 'Activo'){
                return res.status(400).send('El director no está activo');
            }

            const productoraEstado = await Productora.findById(req.body.productora._id);            
            if(productoraEstado.estado !== 'Activo'){
                return res.status(400).send('La productora no está activa');
            }
            
            media.serial = req.body.serial;
            media.titulo = req.body.titulo;
            media.sinopsis = req.body.sinopsis;
            media.url = req.body.url;
            media.foto = req.body.foto;
            media.fechaEstreno = req.body.fechaEstreno;
            media.genero = req.body.genero._id;
            media.director = req.body.director._id;
            media.productora = req.body.productora._id;
            media.tipo = req.body.tipo._id;
            media.fechaActualizacion =new Date();

            media = await media.save();

            res.send(media);

        } catch (error) {
            console.log(error);
            res.status(500).send('Ocurrió un error al consultar media');
        }
    }
);

router.get('/:mediaId', async function(req, res){
    try{

        const media = await Media.findById(req.params.mediaId);
        if(!media){
            return res.status(400).send('Media no existe');
        }

        res.send(media);

    } catch(error){
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar media');
    }
});

module.exports = router;