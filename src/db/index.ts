import mongoose from 'mongoose';

const dbConnect = async () => {
  try {
    // @ts-ignore
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Connected to MongoDB ${connection.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
