import mongoose from "mongoose";

async function connection() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected to mongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop app if connection fails
  }
}

export default connection;
