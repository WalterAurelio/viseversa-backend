import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  usuarioId: mongoose.Types.ObjectId;
  titulo: string;
  descripcion: string;
  imagenes?: string[];
  estaActivo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const productSchema = new Schema<IProduct>(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El ID del usuario es requerido'],
    },
    titulo: {
      type: String,
      required: [true, 'El título del producto es requerido'],
      trim: true,
      minlength: [3, 'El título debe tener al menos 3 caracteres'],
      maxlength: [100, 'El título no puede exceder 100 caracteres'],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
      minlength: [10, 'La descripción debe tener al menos 10 caracteres'],
      maxlength: [1000, 'La descripción no puede exceder 1000 caracteres'],
    },
    imagenes: {
      type: [String],
      default: [],
    },
    estaActivo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para optimizar búsquedas
productSchema.index({ usuarioId: 1 });
productSchema.index({ estaActivo: 1 });

const Product = mongoose.model<IProduct>('Product', productSchema);

export default Product;
