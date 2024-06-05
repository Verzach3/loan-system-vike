import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import { sessionTable, userTable } from './schema';
import * as schema from './schema';

const queryClient = postgres(process.env.POSTGRES_URL ?? "");
export const db = drizzle(queryClient, { schema });

export const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);