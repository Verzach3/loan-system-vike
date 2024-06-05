import "dotenv/config";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	schema: "./database/schema.ts",
	out: "./drizzle",
	dialect: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
	dbCredentials: {
		url: process.env.POSTGRES_URL ?? '',
	},
});
