import express from 'express';
import { Server } from 'socket.io';
import connectDB from "./src/config/connection.js";
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';

// Rutas
import authRoutes from './src/routes/auth.js';
import groupRoutes from './src/routes/groups.js';
import messageRoutes from './src/routes/messages.js';

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Actualiza esto en producción
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB()
    .then(async () => {
        server.listen(PORT, () => {
        console.log(`Servidor corriendo en el puerto ${PORT}`);
        });
      })
    .catch(() => {
        process.exit(1); // Salir del proceso con fallo
    });

app.get('/', (req, res) => {
  res.send('Hola Mundo!')
})

app.listen(port, () => {
  console.log(`Aplicación escuchando en el puerto ${port}`);
});


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);

// Manejo de conexión de Socket.IO
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');

  // Unirse a una sala de chat (grupo)
  socket.on('join-group', (groupId) => {
    socket.join(groupId);
    console.log(`Usuario se unió al grupo: ${groupId}`);
  });

  // Salir de una sala de chat
  socket.on('leave-group', (groupId) => {
    socket.leave(groupId);
    console.log(`Usuario salió del grupo: ${groupId}`);
  });

  // Manejar nuevos mensajes
  socket.on('send-message', (data) => {
    const { groupId, message } = data;
    // Transmitir a todos en el grupo excepto al remitente
    socket.to(groupId).emit('new-message', message);
  });

  // Manejar mensajes privados
  socket.on('private-message', (data) => {
    const { toUserId, message } = data;
    socket.to(toUserId).emit('new-private-message', message);
  });

  // Manejar estado de escritura
  socket.on('typing', (data) => {
    const { groupId, userId, userName } = data;
    socket.to(groupId).emit('user-typing', { userId, userName });
  });

  // Manejar desconexión de usuario
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

