import type { db } from "@/database/db"
import type { User, Session } from "lucia";
// IMPORTANT!
declare module "lucia" {
	interface Register {
		Lucia: typeof lucia;
	}
}

declare module "hono" {
	interface ContextVariableMap {
		session: { user: User | null ; session: Session| null } | null;
	}
}


declare global {
	namespace Vike {
		interface PageContext {
			lucia: Lucia;
			db: typeof db;
			session: { session: Session; user: { id: string } } | null;
		}
	}
}