import dotenv from 'dotenv';
import { connectDB } from '../config/database';
import User from '../models/User';

dotenv.config();

const users = [
  {
    nombreUsuario: 'jgarcia',
    nombres: 'Juan',
    apellidos: 'García',
    email: 'juan.garcia@example.com',
    contraseña: 'Password123',
    fotoPerfil: 'https://i.pravatar.cc/150?img=1',
    puntacion: 12,
    ubicacion: 'Madrid, España',
  },
  {
    nombreUsuario: 'mlopez',
    nombres: 'María',
    apellidos: 'López',
    email: 'maria.lopez@example.com',
    contraseña: 'SecurePass456',
    fotoPerfil: 'https://i.pravatar.cc/150?img=2',
    puntacion: 18,
    ubicacion: 'Barcelona, España',
  },
  {
    nombreUsuario: 'cfernandez',
    nombres: 'Carlos',
    apellidos: 'Fernández',
    email: 'carlos.fernandez@example.com',
    contraseña: 'MiClave789',
    fotoPerfil: 'https://i.pravatar.cc/150?img=3',
    puntacion: 22,
    ubicacion: 'Sevilla, España',
  },
  {
    nombreUsuario: 'avalencia',
    nombres: 'Ana',
    apellidos: 'Valencia',
    email: 'ana.valencia@example.com',
    contraseña: 'ClaveSegura321',
    fotoPerfil: 'https://i.pravatar.cc/150?img=4',
    puntacion: 8,
    ubicacion: 'Valencia, España',
  },
  {
    nombreUsuario: 'dtorres',
    nombres: 'Diego',
    apellidos: 'Torres',
    email: 'diego.torres@example.com',
    contraseña: 'Pass1234',
    fotoPerfil: 'https://i.pravatar.cc/150?img=5',
    puntacion: 15,
    ubicacion: 'Bilbao, España',
  },
];

const seedUsers = async (): Promise<void> => {
  try {
    await connectDB();
    await User.deleteMany({ email: { $in: users.map((user) => user.email) } });
    const createdUsers = await User.insertMany(users);
    console.log(`✅ Seed de usuarios completado: ${createdUsers.length} usuarios creados.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al generar el seed de usuarios:', error);
    process.exit(1);
  }
};

seedUsers();
