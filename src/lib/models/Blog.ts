// src/lib/models/Blog.ts
import mongoose, { Document, Model } from "mongoose";

export interface IBlog extends Document {
  title: string;
  slug: string;
  image?: string;
  date?: string;
  category?: string;
  content: string; // HTML or markdown
  createdAt?: Date;
  updatedAt?: Date;
}

const BlogSchema = new mongoose.Schema<IBlog>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  image: { type: String },
  date: { type: String },
  category: { type: String },
  content: { type: String, required: true },
}, { timestamps: true });

// Prevent model overwrite in dev
export const Blog: Model<IBlog> = mongoose.models.Blog || mongoose.model<IBlog>("Blog", BlogSchema);
