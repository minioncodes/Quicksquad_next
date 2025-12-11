// src/lib/mongodb.ts
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGODB_URI!;
if (!MONGO_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in production");
}

declare global {
  // allow caching across hot-reloads in dev
  // eslint-disable-next-line no-var
  var _mongo: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null } | undefined;
}

let cached = global._mongo;
if (!cached) {
  cached = global._mongo = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached!.conn) {
    return cached!.conn;
  }
  if (!cached!.promise) {
    cached!.promise = mongoose.connect(MONGO_URI, { autoIndex: false }).then((m) => m.connection);
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
