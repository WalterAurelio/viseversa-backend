import type { IUserDocument } from '../models/User';
import IUser from '../interfaces/IUser';

export class UserDto implements IUser {
  id: string;
  nombreUsuario: string;
  fotoPerfil?: string;
  nombres: string;
  apellidos: string;
  email: string;
  contraseña: string;
  puntacion: number;
  ubicacion?: string;

  constructor(data: IUserDocument) {
    this.id = data._id.toString();
    this.nombreUsuario = data.nombreUsuario;
    this.fotoPerfil = data.fotoPerfil;
    this.nombres = data.nombres;
    this.apellidos = data.apellidos;
    this.email = data.email;
    this.contraseña = data.contraseña;
    this.puntacion = data.puntacion;
    this.ubicacion = data.ubicacion;
  }
}
