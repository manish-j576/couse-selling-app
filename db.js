import mongoose from "mongoose";

let isConnected = false; // Singleton flag

export async function connectDB() {
  if (isConnected) {
    console.log("DB already connected (singleton)");
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    isConnected = conn.connections[0].readyState === 1;
    console.log("MongoDB connected (singleton):", conn.connection.host);
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
