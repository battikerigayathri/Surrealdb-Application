import { Surreal } from "surrealdb";
import dotenv from "dotenv";

dotenv.config();

const db = new Surreal();

export const initDatabase = async () => {
  try {
    await db.connect("http://127.0.0.1:8000/rpc", {
      namespace: process.env.SURREALDB_NAMESPACE || "test",
      database: process.env.SURREALDB_DATABASE || "test",
    });
    await db.signin({
      username: process.env.SURREALDB_USER || "root",
      password: process.env.SURREALDB_PASSWORD || "root",
    });
    await db.use({
      namespace: process.env.SURREALDB_NAMESPACE || "test",
      database: process.env.SURREALDB_DATABASE || "test",
    });
    console.log("Connected to SurrealDB");
  } catch (error) {
    console.error("Failed to connect to SurrealDB:", error);
    process.exit(1);
  }
};
export { db };
