// src/lib/mongodb.ts
import mongoose from "mongoose";

function getMongoUri() {
  const mongoUri = process.env.MONGODB_URI;
  if (!mongoUri) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }
  return mongoUri;
}

declare global {
  // allow caching across hot-reloads in dev
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
    const mongoUri = getMongoUri();
    cached!.promise = mongoose
      .connect(mongoUri, { autoIndex: false })
      .then((m) => m.connection)
      .catch((err) => {
        cached!.promise = null;
        throw err;
      });
  }
  cached!.conn = await cached!.promise;
  return cached!.conn;
}
