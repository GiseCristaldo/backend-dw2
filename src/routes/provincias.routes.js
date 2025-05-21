import { Router } from 'express';
import { Provincia } from  '../models/index.js';

const router = Router();

// obtener todas las provincias

router.get('/', async (req, res) => {
    try {
        const provincias = await Provincia.findAll();
        res.json(provincias);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener las provincias'});
    }
})

router.get('/:id', async (req, res) => {
    try {
        const provincia = await Provincia.findByPk(req.params.id);
        if(!provincia) { 
            return res.status(404).json({error: 'Error provincia no encontrada'});   
        }  
          res.json(provincia);
    } catch (error) {
        res.status(500).json({error: 'Error al obtener la provincia'});
    }
})

// crear una provincia 
router.post('/', async (req, res) => {
    try {
        const crearProvincia =await Provincia.create(req.body);
        res.status(201).json(crearProvincia);
    }
    catch (error) {
        res.status(400).json({error: 'Error al crear la provincia'});
    }
})

//acrualizar una provincia

router.put('/:id', async (req, res) => {
    try {
        const actualizarProvincia = await Provincia.findByPk(req.params.id);
        if (!actualizarProvincia){ 
            return res.status(404).json( { error: 'Error al actualizar los datos de la provincia'});
        }
         res.json(actualizarProvincia);
    
    } catch (error){
        res.status(400).json({ error: 'Error al actualizar la provincia'});
    }

})

// eliminar una provincia

router.delete( '/:id', async (req, res) => {
    try {
        const eliminarProvincia = await Provincia.destroy ( { where: {id: req.params.id}});
        if (!eliminarProvincia){
            return res.status(404).json({ error: 'Error no se pudo eliminar la provincia'});
        }
        res.json (eliminarProvincia);
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar la provincia'});
    }
})

export default router;