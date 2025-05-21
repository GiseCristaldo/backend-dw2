import { Router } from 'express';
import { Camion } from '../models/index.js';

const router = Router();

// Obtener todos los camiones
router.get('/', async (req, res) => {
    try {
        const camiones = await Camion.findAll();
        res.json(camiones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener camiones' });
    }
});

// Obtener un camión por ID
router.get('/:id', async (req, res) => {
    try {
        const camion = await Camion.findByPk(req.params.id);
        if (!camion) return res.status(404).json({ error: 'Camión no encontrado' });
        res.json(camion);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener camión' });
    }
});

// Crear un camión
router.post('/', async (req, res) => {
    try {
         const data = req.body;

    if (Array.isArray(data)) {
      const nuevos = await Camion.bulkCreate(data);
      return res.status(201).json(nuevos);
    }
        const nuevo = await Camion.create(data);
        res.status(201).json(nuevo);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear camión' });
    }
});

// Actualizar un camión
router.put('/:id', async (req, res) => {
    try {
        const camion = await Camion.findByPk(req.params.id);
        if (!camion) return res.status(404).json({ error: 'Camión no encontrado' });
        const actualizado = await camion.update(req.body);
        res.json(actualizado);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar camión' });
    }
});

// Eliminar un camión
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Camion.destroy({ where: { id: req.params.id } });
        if (!eliminado) return res.status(404).json({ error: 'Camión no encontrado' });
        res.json({ message: 'Camión eliminado correctamente' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar camión' });
    }
});

export default router;