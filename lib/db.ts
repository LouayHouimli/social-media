import { drizzle } from "drizzle-orm/postgres-js";
import postgres, { Sql } from "postgres";
import * as schema from "./schema";

// Debug the environment variable
if (!process.env.DB_URL) {
  throw new Error(
    "DATABASE_URL is not defined. Please set it in your environment."
  );
}

let connection: Sql<{}>;

if (process.env.NODE_ENV === "production") {
  connection = postgres(process.env.DB_URL);
} else {
  let globalConnection = global as typeof globalThis & {
    connection: Sql<{}>;
  };

  if (!globalConnection.connection)
    globalConnection.connection = postgres(process.env.DB_URL);

  connection = globalConnection.connection;
}

export const db = drizzle(connection, {
  schema,
});
