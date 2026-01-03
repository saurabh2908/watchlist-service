import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

before(async function() {
  this.timeout(30000);
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI environment variable not set');
    }
    
    await mongoose.connect(mongoUri);
    console.log('✓ MongoDB connected for tests');
    
    await mongoose.connection.dropDatabase();
    console.log('✓ Database cleared before tests');
  } catch (err) {
    console.error('✗ Failed to connect MongoDB for tests:', err);
    process.exit(1);
  }
});

afterEach(async function() {
  this.timeout(10000);
  try {
   
    await mongoose.connection.dropDatabase();
    console.log('✓ Test data cleaned up');
  } catch (err) {
    console.error('✗ Error cleaning up test data:', err);
  }
});

after(async function() {
  this.timeout(10000);
  try {
    
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
    console.log('✓ MongoDB disconnected after tests');
  } catch (err) {
    console.error('✗ Error disconnecting MongoDB:', err);
  }
});
