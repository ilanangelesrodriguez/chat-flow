import express from 'express';
import Group from '../models/group.js';

const router = express.Router();

// Crear grupo
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, creador } = req.body;
    
    const group = new Group({
      nombre,
      descripcion,
      creador,
      miembros: [{ usuario: creador, rol: 'admin' }]
    });

    await group.save();
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener grupos del usuario
router.get('/user/:userId', async (req, res) => {
  try {
    const groups = await Group.find({
      'miembros.usuario': req.params.userId
    }).populate('creador', 'nombre');
    
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Agregar miembro al grupo
router.post('/:groupId/members', async (req, res) => {
  try {
    const { userId, rol } = req.body;
    
    const group = await Group.findById(req.params.groupId);
    if (!group) {
      return res.status(404).json({ message: 'Grupo no encontrado' });
    }

    group.miembros.push({ usuario: userId, rol });
    await group.save();
    
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;