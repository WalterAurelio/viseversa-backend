import mongoose, { Document, Schema } from "mongoose";
import IProduct from "../interfaces/Product";
import { categories } from "../types/Category";
import { genders } from "../types/Gender";
import { numericSizes, letterSizes } from "../types/Size";
import { colors } from "../types/Colour";
import { conditions } from "../types/Condition";

export interface ProductDocument extends Omit<IProduct, "id" | "userId">, Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
}

const productSchema = new Schema<ProductDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "El ID del usuario es requerido"]
    },
    title: {
      type: String,
      required: [true, "El título es requerido"],
      trim: true,
      minlength: [3, "El título debe tener al menos 3 caracteres"],
      maxlength: [100, "El título no puede exceder 100 caracteres"]
    },
    description: {
      type: String,
      required: [true, "La descripción es requerida"],
      trim: true,
      minlength: [10, "La descripción debe tener al menos 10 caracteres"],
      maxlength: [1000, "La descripción no puede exceder 1000 caracteres"]
    },
    images: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      enum: categories,
      required: [true, "La categoría es requerida"],
      trim: true
    },
    gender: {
      type: String,
      enum: genders,
      required: [true, "El género es requerido"],
      trim: true
    },
    size: {
      type: String,
      enum: [...numericSizes, ...letterSizes],
      required: [true, "El talle es requerido"],
      trim: true
    },
    color: {
      type: String,
      enum: colors,
      required: [true, "El color es requerido"],
      trim: true
    },
    brand: {
      type: String,
      required: [true, "La marca es requerida"],
      trim: true
    },
    condition: {
      type: String,
      enum: conditions,
      required: [true, "La condición es requerida"],
      trim: true
    },
    inExchangeOf: {
      type: String,
      required: [true, "El producto a cambio es requerido"],
      trim: true
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Product = mongoose.model<ProductDocument>("Product", productSchema);

export default Product;
