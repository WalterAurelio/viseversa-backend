import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  nombreUsuario: string;
  fotoPerfil?: string;
  nombres: string;
  apellidos: string;
  email: string;
  contraseña: string;
  puntacion: number;
  ubicacion?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    nombreUsuario: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
      unique: true,
      trim: true,
      minlength: [3, 'El nombre de usuario debe tener al menos 3 caracteres'],
      maxlength: [30, 'El nombre de usuario no puede exceder 30 caracteres'],
    },
    fotoPerfil: {
      type: String,
      default: null,
    },
    nombres: {
      type: String,
      required: [true, 'Los nombres son requeridos'],
      trim: true,
    },
    apellidos: {
      type: String,
      required: [true, 'Los apellidos son requeridos'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Por favor proporciona un email válido'],
    },
    contraseña: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
    },
    puntacion: {
      type: Number,
      default: 0,
      min: [0, 'La puntuación no puede ser negativa'],
    },
    ubicacion: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Índices para optimizar búsquedas
// userSchema.index({ email: 1 });
// userSchema.index({ nombreUsuario: 1 });

const User = mongoose.model<IUser>('User', userSchema);

export default User;
