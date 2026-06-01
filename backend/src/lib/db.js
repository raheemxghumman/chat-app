import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

export const connectDB = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    console.log("Attempting to connect to MongoDB...");
    try {
      const conn = await mongoose.connect(uri, { serverSelectionTimeoutMS: 4000 });
      console.log(`MongoDB connected (Remote): ${conn.connection.host}`);
    } catch (err) {
      console.log("Remote MongoDB connection failed or timed out. Starting in-memory MongoDB server as fallback...");
      const mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      console.log(`In-memory MongoDB started at: ${mongoUri}`);
      const conn = await mongoose.connect(mongoUri);
      console.log(`MongoDB connected (In-Memory): ${conn.connection.host}`);
    }
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
};

