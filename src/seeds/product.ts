import dotenv from 'dotenv';
import { connectDB } from '../config/database';
import Product from '../models/Product';
import products from '../json/products.json';

dotenv.config();


export const seedProducts = async (): Promise<void> => {
  try {
    await connectDB();
    await Product.deleteMany({ _id: { $in: products.map((prod) => prod._id) } });
    const createdProducts = await Product.insertMany(products);
    console.log(
      `✅ Seed de productos completado: ${createdProducts.length} productos creados.`
    );
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al generar el seed de productos:', error);
    process.exit(1);
  }
};
