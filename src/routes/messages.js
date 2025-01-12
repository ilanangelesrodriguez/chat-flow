import express from 'express';
import Message from '../models/message.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { contenido, usuario, grupo, destinatario } = req.body;
    
    const message = new Message({
      contenido,
      usuario,
      grupo,
      destinatario
    });

    await message.save();
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/group/:groupId', async (req, res) => {
  try {
    const messages = await Message.find({
      grupo: req.params.groupId
    })
    .populate('usuario', 'nombre')
    .sort({ fechaEnvio: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/direct/:userId1/:userId2', async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { usuario: req.params.userId1, destinatario: req.params.userId2 },
        { usuario: req.params.userId2, destinatario: req.params.userId1 }
      ]
    })
    .populate('usuario', 'nombre')
    .sort({ fechaEnvio: 1 });
    
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;