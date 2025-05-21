// src/routes/camionCamionero.routes.js
import { Router } from 'express';
import CamionCamionero from '../models/CamionCamionero.js';

const router = Router();

// Asignar un camionero a un camión
router.post('/', async (req, res) => {
    try {
        const asignacion = await CamionCamionero.create(req.body);
        res.status(201).json(asignacion);
    } catch (error) {
        res.status(400).json({ error: 'Error al asignar camionero al camión' });
    }
});

export default router;
