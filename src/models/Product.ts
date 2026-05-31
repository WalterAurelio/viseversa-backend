import mongoose, { Schema, Document, Types } from 'mongoose';
import { PRODUCT } from '../utils/validation';
import IProduct from '../interfaces/IProduct';

export interface IProductDocument extends Omit<IProduct, 'id' | 'usuarioId' | 'comentarios'>, Document {
  _id: Types.ObjectId;
  usuarioId: Types.ObjectId;
  comentarios: Types.ObjectId[];
}

const productSchema = new Schema<IProductDocument>(
  {
    usuarioId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'El ID del usuario es requerido']
    },
    titulo: {
      type: String,
      required: [true, 'El título del producto es requerido'],
      trim: true,
      minlength: [PRODUCT.TITLE.MIN_LENGTH, PRODUCT.TITLE.MIN_LENGTH_MESSAGE],
      maxlength: [PRODUCT.TITLE.MAX_LENGTH, PRODUCT.TITLE.MAX_LENGTH_MESSAGE]
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
      minlength: [PRODUCT.DESCRIPTION.MIN_LENGTH, PRODUCT.DESCRIPTION.MIN_LENGTH_MESSAGE],
      maxlength: [PRODUCT.DESCRIPTION.MAX_LENGTH, PRODUCT.DESCRIPTION.MAX_LENGTH_MESSAGE]
    },
    imagenes: {
      type: [String],
      default: []
    },
    estaActivo: {
      type: Boolean,
      default: true
    },
    comentarios: {
      type: [Schema.Types.ObjectId],
      ref: 'Comment',
      default: []
    }
  },
  {
    timestamps: true
  }
);

// Índices para optimizar búsquedas
productSchema.index({ usuarioId: 1 });
productSchema.index({ estaActivo: 1 });
productSchema.index({ comentarios: 1 });

const Product = mongoose.model<IProductDocument>('Product', productSchema);

export default Product;
