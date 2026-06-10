import mongoose, { Schema, Document } from 'mongoose';
import IComment from '../interfaces/IComment';

export interface ICommentDocument extends Omit<IComment, 'id' | 'usuarioId' | 'productoId'>, Document {
  _id: mongoose.Types.ObjectId;
  usuarioId: mongoose.Types.ObjectId;
  productoId: mongoose.Types.ObjectId;
}

const commentSchema = new Schema<ICommentDocument>(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El ID del usuario es requerido'],
    },
    productoId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: [true, 'El ID del producto es requerido'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
      minlength: [5, 'La descripción debe tener al menos 5 caracteres'],
      maxlength: [500, 'La descripción no puede exceder 500 caracteres'],
    },
    imagenes: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Índices para optimizar búsquedas
commentSchema.index({ usuarioId: 1 });

const Comment = mongoose.model<ICommentDocument>('Comment', commentSchema);

export default Comment;
