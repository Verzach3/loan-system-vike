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
