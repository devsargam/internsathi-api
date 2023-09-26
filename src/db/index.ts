import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    if (!process.env.MONGO_URL) throw new Error('Missing MONGO_URL env variable');
    const connection = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to MongoDB ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
