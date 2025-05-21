import express from 'express';
import { Camionero, Camion } from '../models/index.js'; // Importamos el modelo Camionero


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

router.get('/:id', async (req, res) =>{
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
        const camioneros = await Camionero.findByPk(req.params.id, {
            include: Camion
        });
        // Verificamos si el camionero existe
        if(!camioneros){
            return res.status(404).json ({ error: 'Camionero no encontrado'});
        }

        //obtener los camiones 
        const camiones = await Camion.findAll({
            where : {
                idCamionero: req.params.id
            }
        });
        res.json(camiones);
    } catch (error){
        res.status(500).json( { error: 'Error al obtener camiones del camionero'});
    }
});

// Crear un nuevo camionero
router.post('/', async (req, res) => {
    try {
        const data = req.body;

        if (Array.isArray(data)) {
          const nuevos = await Camionero.bulkCreate(data);
          return res.status(201).json(nuevos);
        }
        const nuevo = await Camionero.create(req.body);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear camionero' });
    }
});

// ...existing code...

// Actualizar un camionero
router.put('/:id', async (req, res) => {
    try {
        const camionero = await Camionero.findByPk(req.params.id);
        if (!camionero) {
            return res.status(404).json({ error: 'Camionero no encontrado' });
        }
        const actualizado = await camionero.update(req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar camionero' });
    }
});

// Eliminar un camionero
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Camionero.destroy({ where: { id: req.params.id } });
        if (!eliminado) {
            return res.status(404).json({ error: 'Camionero no encontrado' });
        }
        res.json({ message: 'Camionero eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar camionero' });
    }
});

export default router;
