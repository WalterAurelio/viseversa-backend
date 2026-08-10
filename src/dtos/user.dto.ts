import type { IUserDocument } from '../models/User';
import IUser from '../interfaces/IUser';

export class UserProfileDto implements Partial<IUser> {
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  fotoPerfil?: string;
  ubicacion?: string;
  createdAt: Date;

  constructor(data: IUserDocument) {
    this.nombre = data.nombre;
    this.apellido = data.apellido;
    this.nombreUsuario = data.nombreUsuario;
    this.fotoPerfil = data.fotoPerfil;
    this.ubicacion = data.ubicacion;
    this.createdAt = data.createdAt;
  }
}
