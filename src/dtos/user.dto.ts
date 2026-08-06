import type { IUserDocument } from '../models/User';
import IUser from '../interfaces/IUser';

export class UserDto implements IUser {
  id: string;
  nombreUsuario: string;
  fotoPerfil?: string;
  nombre: string;
  apellido: string;
  email: string;
  // contraseña: string;
  // puntacion: number;
  ubicacion?: string;
  firebaseUid: string;

  constructor(data: IUserDocument) {
    this.id = data._id.toString();
    this.nombreUsuario = data.nombreUsuario;
    this.fotoPerfil = data.fotoPerfil;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.email = data.email;
    // this.contraseña = data.contraseña;
    // this.puntacion = data.puntacion;
    this.ubicacion = data.ubicacion;
    this.firebaseUid = data.firebaseUid;
  }
}
