import express from 'express';
import { Camionero } from '../models/index.js'; // Importamos el modelo Camionero


const router = express.Router(); 

router.get('/', async (req, res)=> {
    try {
        const camioneros = await Camionero.findAll();
        res.json(camioneros);
    } catch (error){
        res.status(500).json({ error: 'Error al obtener camioneros'});
    }
});

// Ruta para obtener un camionero por ID

router.get('/id', async (req, res) =>{
    try {
        const camioneros = await Camionero.findByPk(req.params.id);
        if (!camioneros){
            return res.status(404).json ({error: 'Camionero no encontrado'});
        }
        res.json(camioneros);
    } catch (error){
        res.status(500).json ({ error: 'Error al obtener camionero'});
    }
});

// Ruta para obtener los camiones de un camionero específico

router.get('/:id/camiones', async (req, res) => {
    try {
        const camioneros = await Camionero.findByPk(req.params.id);
        if(!camioneros){
            return res.status(404).json ({ error: 'Camionero no encontrado'});
        }

        //obtener los camiones 
        const camiones = await Camion.findAll({
            where : {
                idCamionero: req.params.id
            }
        });
        response.json(camiones);
    } catch (error){
        res.status(500).json( { error: 'Error al obtener camiones del camionero'});
    }
});

// Crear un nuevo camionero
router.post('/', async (req, res) => {
    try {
        const nuevo = await Camionero.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear camionero' });
    }
});

export default router;
