import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  contenido: {
    type: String,
    required: true
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  grupo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Group'
  },
  destinatario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  fechaEnvio: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Message', messageSchema);