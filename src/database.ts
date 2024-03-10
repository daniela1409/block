import mongoose from 'mongoose';

const connectToDatabase = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.URL_MONGODB, {
    });
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error de conexión a MongoDB:', error.message);
  }
};

export default connectToDatabase;
