import '../firebase/app';
import { getAuth } from 'firebase-admin/auth';
import users from '../json/users.json';
import products from '../json/products.json';
import User from '../models/User';
import Product from '../models/Product';
import { connectDB } from '../config/database';

const auth = getAuth();

const seedUsers = async () => {
  if (!process.env.FIREBASE_AUTH_EMULATOR_HOST) {
    throw new Error('FIREBASE_AUTH_EMULATOR_HOST no está configurado. Asegúrate de que el emulador de Firebase Authentication esté en funcionamiento.');
  }

  // Eliminar todos los usuarios en la base de datos
  await User.deleteMany({});
  console.log('✅ Usuarios eliminados de la base de datos');

  // Eliminar todos los usuarios en Firebase Authentication
  const usersArr = await auth.listUsers();
  const uids = usersArr.users.map(user => user.uid);
  if (uids.length > 0) {
    await auth.deleteUsers(uids);
    console.log('✅ Usuarios eliminados de Firebase Authentication');
  } else {
    console.log('✅ No hay usuarios para eliminar en Firebase Authentication');
  }

  // Crear nuevos usuarios en Firebase Authentication y en la base de datos
  for (const user of users) {
    const firebaseUser = await auth.createUser({
      email: user.email,
      password: user.contraseña
    });

    await User.create({
      _id: user.id,
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      nombreUsuario: user.nombreUsuario,
      fotoPerfil: user.fotoPerfil,
      ubicacion: user.ubicacion,
      firebaseUid: firebaseUser.uid
    });
  }
  console.log('✅ Usuarios creados en Firebase Authentication y en la base de datos');
};
const seedProducts = async () => {
  await Product.deleteMany({ _id: { $in: products.map((prod) => prod._id) } });
  const createdProducts = await Product.insertMany(products);
  console.log(`✅ Seed de productos completado: ${createdProducts.length} productos creados.`);
}

const seedDatabase = async () => {
  try {
    await connectDB();
    await seedUsers();
    await seedProducts();
    console.log('✅ Base de datos sembrada correctamente');
    process.exit(0); // Salir del proceso después de sembrar la base de datos
  } catch (error) {
    console.error('❌ Error al sembrar la base de datos:', error);
    process.exit(1); // Salir del proceso con un código de error
  }
};

seedDatabase();
