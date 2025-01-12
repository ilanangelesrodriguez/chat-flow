import express from 'express';
import connectDB from "./src/config/connection.js";
import cors from 'cors';
import dotenv from 'dotenv';
// Rutas
import authRoutes from './src/routes/auth.js';
import groupRoutes from './src/routes/groups.js';
import messageRoutes from './src/routes/messages.js';

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
app.get('/', (req, res) => {
  res.send('Hola Mundo!')
  
})
// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/groups', groupRoutes);
app.use('/api/messages', messageRoutes);
