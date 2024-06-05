import type { Lucia, Session } from "lucia";
import type { db } from "./database/db";

export type TelefuncContext = {
	lucia: Lucia;
	db: typeof db;
	aditionalHeaders: Record<string, string>;
	aditionalCookies: Record<string, string>;
	session: { session: Session; user: { id: string } } | null;
};
