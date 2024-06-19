import { getContext } from "telefunc";
import type { TelefuncContext } from "../types";
import { z } from "zod";
import { userTable } from "../database/schema";
import { eq } from "drizzle-orm";
import { verify } from "@node-rs/argon2";
export async function onLogout() {
	const { lucia, db, aditionalCookies, aditionalHeaders } =
		getContext<TelefuncContext>();

	const sessionCookie = lucia.createBlankSessionCookie();
	aditionalCookies[sessionCookie.name] = `${sessionCookie.name}=${
		sessionCookie.value
	} ; Path=. ; ${sessionCookie.attributes.toString()}`;

	return {
		status: 200,
		body: {
			message: "Sesión iniciada con exito",
		},
	};
}
