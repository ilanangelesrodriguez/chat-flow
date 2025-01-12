import mongoose from 'mongoose';

const groupSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: String,
  creador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  },
  miembros: [{
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rol: {
      type: String,
      enum: ['admin', 'miembro'],
      default: 'miembro'
    },
    fechaIngreso: {
      type: Date,
      default: Date.now
    }
  }]
});

export default mongoose.model('Group', groupSchema);