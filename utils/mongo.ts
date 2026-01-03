import mongoose from 'mongoose';

export const connectMongo = async () => {
  try {
    const uri = process.env.MONGO_URI as string;
    if (!uri) {
      throw new Error('MONGO_URI not defined');
    }

    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed', err);
    process.exit(1);
  }
};
