import express from 'express';
import connectDB from "./src/config/connection.js";
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Rutas
import authRoutes from './src/routes/auth.js';
import groupRoutes from './src/routes/groups.js';
import messageRoutes from './src/routes/messages.js';

dotenv.config();

const app = express();
const server = createServer(app);  // Creamos el servidor HTTP a partir de Express
const io = new Server(server, {
  cors: {
    origin: "*", // Actualiza esto para producción
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);

// Endpoint simple de prueba
app.get('/', (req, res) => {
  res.send('Hola Mundo!');
});

// Socket.IO - Manejo de conexiones y eventos
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Unirse a un grupo de chat
  socket.on('join-group', (groupId) => {
    socket.join(groupId);
    console.log(`Usuario se unió al grupo: ${groupId}`);
  });

  // Salir de un grupo de chat
  socket.on('leave-group', (groupId) => {
    socket.leave(groupId);
    console.log(`Usuario dejó el grupo: ${groupId}`);
  });

  // Manejo de mensajes nuevos
  socket.on('send-message', (data) => {
    const { groupId, message } = data;
    // Enviar el mensaje a todos los miembros del grupo (excepto al remitente)
    socket.to(groupId).emit('new-message', message);
  });

  // Manejo de mensajes privados
  socket.on('private-message', (data) => {
    const { toUserId, message } = data;
    socket.to(toUserId).emit('new-private-message', message);
  });

  // Manejo del estado de "escribiendo"
  socket.on('typing', (data) => {
    const { groupId, userId, userName } = data;
    socket.to(groupId).emit('user-typing', { userId, userName });
  });

  // Manejo de desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
