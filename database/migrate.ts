import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

export const migrationClient = postgres(process.env.POSTGRES_URL ?? '');
await migrate(drizzle(migrationClient), { migrationsFolder: "./drizzle" });

await migrationClient.end();