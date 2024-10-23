import mongoose from "mongoose";

async function connection() {
  try {
    await mongoose.connect(
      "mongodb+srv://ginawang1021:GinaDatabases1001@cluster0.m43if.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("connected to mongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1); // stop app if connection fails
  }
}

export default connection;
