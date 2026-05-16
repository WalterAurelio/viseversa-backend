import mongoose, { Schema, Document } from 'mongoose';

export interface IComment extends Document {
  _id: mongoose.Types.ObjectId;
  usuarioId: mongoose.Types.ObjectId;
  descripcion: string;
  imagenes?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El ID del usuario es requerido'],
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

const Comment = mongoose.model<IComment>('Comment', commentSchema);

export default Comment;
