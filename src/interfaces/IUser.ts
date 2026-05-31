interface IUser {
  id: string;
  nombreUsuario: string;
  fotoPerfil?: string;
  nombres: string;
  apellidos: string;
  email: string;
  contraseña: string;
  puntacion: number;
  ubicacion?: string;
}

export default IUser;
