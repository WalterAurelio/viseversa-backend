import type { IUserDocument } from '../models/User';
import IUser from '../interfaces/IUser';

export class UserDto implements IUser {
  id: string;
  email: string;
  // contraseña: string;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  fotoPerfil?: string;
  ubicacion?: string;
  firebaseUid: string;

  constructor(data: IUserDocument) {
    this.id = data._id.toString();
    this.email = data.email;
    // this.contraseña = data.contraseña;
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.nombreUsuario = data.nombreUsuario;
    this.fotoPerfil = data.fotoPerfil;
    this.ubicacion = data.ubicacion;
    this.firebaseUid = data.firebaseUid;
  }
}
