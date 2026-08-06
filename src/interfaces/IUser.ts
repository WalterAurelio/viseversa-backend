interface IUser {
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
}

export default IUser;
