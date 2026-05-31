import mongoose, { Schema, Document } from 'mongoose';
import IUser from '../interfaces/IUser';
import { USER } from '../utils/validation';

export interface IUserDocument extends Omit<IUser, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUserDocument>(
  {
    nombreUsuario: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
      unique: true,
      trim: true,
      minlength: [USER.NOMBRE_USUARIO.MIN_LENGTH, USER.NOMBRE_USUARIO.MIN_LENGTH_MESSAGE],
      maxlength: [USER.NOMBRE_USUARIO.MAX_LENGTH, USER.NOMBRE_USUARIO.MAX_LENGTH_MESSAGE]
    },
    fotoPerfil: {
      type: String,
      default: null
    },
    nombres: {
      type: String,
      required: [true, 'Los nombres son requeridos'],
      trim: true
    },
    apellidos: {
      type: String,
      required: [true, 'Los apellidos son requeridos'],
      trim: true
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      unique: true,
      lowercase: true,
      match: [USER.EMAIL.REGEX, USER.EMAIL.INVALID_MESSAGE]
    },
    contraseña: {
      type: String,
      required: [true, 'La contraseña es requerida'],
      minlength: [USER.CONTRASEÑA.MIN_LENGTH, USER.CONTRASEÑA.MIN_LENGTH_MESSAGE]
    },
    puntacion: {
      type: Number,
      default: 0,
      min: [USER.PUNTACION.MIN_VALUE, USER.PUNTACION.MIN_VALUE_MESSAGE]
    },
    ubicacion: {
      type: String,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// Índices para optimizar búsquedas
// userSchema.index({ email: 1 });
// userSchema.index({ nombreUsuario: 1 });

const User = mongoose.model<IUserDocument>('User', userSchema);

export default User;
