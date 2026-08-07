interface IUser {
  id: string;
  email: string;
  // contraseña: string;
  nombre: string;
  apellido: string;
  nombreUsuario: string;
  fotoPerfil?: string;
  ubicacion?: string;
  firebaseUid: string;
}

export default IUser;
