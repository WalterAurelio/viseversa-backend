import mongoose, { Schema, Document } from 'mongoose';
import { PRODUCT } from '../utils/productValidation';

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
      minlength: [PRODUCT.TITLE.MIN_LENGTH, PRODUCT.TITLE.MIN_LENGTH_MESSAGE],
      maxlength: [PRODUCT.TITLE.MAX_LENGTH, PRODUCT.TITLE.MAX_LENGTH_MESSAGE],
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
      minlength: [PRODUCT.DESCRIPTION.MIN_LENGTH, PRODUCT.DESCRIPTION.MIN_LENGTH_MESSAGE],
      maxlength: [PRODUCT.DESCRIPTION.MAX_LENGTH, PRODUCT.DESCRIPTION.MAX_LENGTH_MESSAGE],
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
