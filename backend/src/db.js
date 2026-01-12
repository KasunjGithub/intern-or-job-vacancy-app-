import mongoose from "mongoose";

export async function connectDB(mongoUri) {
  if (!mongoUri) {
    throw new Error("Missing MONGO_URI. Set it in backend/config.local.json or environment.");
  }
  await mongoose.connect(mongoUri);
  console.log("MongoDB connected");
}
