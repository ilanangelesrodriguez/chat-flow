import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['activo', 'desconectado', 'en línea'],
    default: 'desconectado'
  },
  avatar: String,
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('User', userSchema);