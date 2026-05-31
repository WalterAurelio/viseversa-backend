import dotenv from 'dotenv';
dotenv.config();
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/viseversa';

export const connectDB = async (): Promise<void> => {
  if (!MONGODB_URI) {
    throw new Error('La variable de entorno MONGODB_URI no está definida');
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    console.log('✅ Conectado a MongoDB');
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
};
