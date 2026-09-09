import mongoose, { Document, Schema } from "mongoose";
import IUser from "../interfaces/IUser";

export interface IUserDocument extends Omit<IUser, "id">, Document {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new Schema<IUserDocument>(
  {
    firebaseUid: {
      type: String,
      required: [true, "El UID de Firebase es requerido"],
      trim: true
    },
    username: {
      type: String,
      required: [true, "El nombre de usuario es requerido"],
      trim: true,
      minlength: [3, "El nombre de usuario debe tener al menos 3 caracteres"],
      maxlength: [30, "El nombre de usuario no puede exceder 30 caracteres"]
    },
    profilePicture: {
      type: String,
      trim: true
    },
    name: {
      type: String,
      required: [true, "El nombre es requerido"],
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [50, "El nombre no puede exceder 50 caracteres"]
    },
    lastName: {
      type: String,
      required: [true, "El apellido es requerido"],
      trim: true,
      minlength: [2, "El apellido debe tener al menos 2 caracteres"],
      maxlength: [50, "El apellido no puede exceder 50 caracteres"]
    },
    email: {
      type: String,
      required: [true, "El correo electrónico es requerido"],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "El correo electrónico no es válido"]
    },
    location: {
      type: String,
      trim: true
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model<IUserDocument>("User", userSchema);

export default User;
