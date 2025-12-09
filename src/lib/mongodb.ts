import mongoose from "mongoose";

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB Connected");
  } catch (err) {
    console.log("MongoDB Error:", err);
  }
};
