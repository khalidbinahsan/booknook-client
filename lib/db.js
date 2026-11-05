import dns from "node:dns";
import { MongoClient } from "mongodb";

// On some Windows setups Node's DNS resolver cannot look up the SRV record
// behind "mongodb+srv://" URIs (querySrv ECONNREFUSED). Using public DNS
// servers fixes it locally; production hosts resolve SRV records fine.
if (process.env.NODE_ENV !== "production" || process.env.USE_PUBLIC_DNS === "true") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

// Reuse one MongoClient across hot reloads in development and across
// serverless invocations in production.
const globalForMongo = globalThis;

if (!globalForMongo._booknookMongoClient) {
  globalForMongo._booknookMongoClient = new MongoClient(
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017"
  );
}

export const mongoClient = globalForMongo._booknookMongoClient;
export const db = mongoClient.db(process.env.DB_NAME || "booknook");
