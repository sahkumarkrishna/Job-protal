import mongoose, { Connection } from "mongoose";

let isConnected: Connection | null = null;

const connectDB = async (): Promise<Connection | null> => {
  if (isConnected) {
    console.log("MongoDB already connected");
    return isConnected;
  }

  try {
    const res = await mongoose.connect(process.env.MONGODB_URL!);
    isConnected = res.connection;
    console.log("MongoDB connected successfully");
    return isConnected;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return null;
  }
};

export default connectDB;
