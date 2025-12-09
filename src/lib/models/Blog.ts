import { Schema, model, models } from "mongoose";

const BlogSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  date: { type: String, required: true },
  image: { type: String, required: true }
});

export const Blog = models.Blog || model("Blog", BlogSchema);
