import { getContext } from "telefunc";
import type { TelefuncContext } from "../types";
import { z } from "zod";
import { userTable } from "../database/schema";
import { eq } from "drizzle-orm";
import { verify } from "@node-rs/argon2";
export async function onLogin({
	email,
	password,
}: { email: string; password: string }) {
	const { lucia, db, aditionalCookies, aditionalHeaders} = getContext<TelefuncContext>();
	// validate the input
	const input = loginSchema.parse({ email, password });

	// check if the user exists
	const user = (
		await db.select().from(userTable).where(eq(userTable.email, input.email))
	)[0];

	if (!user) {
		return {
			status: 401,
			body: {
				message: "Invalid email or password",
			},
		};
	}

	// check if the password is correct
	const validPassword = await verify(user.password, password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	if (!validPassword) {
		return {
			status: 401,
			body: {
				message: "Invalid email or password",
			},
		};
	}

	const session = await lucia.createSession(user.id, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
  aditionalCookies[sessionCookie.name] = `${sessionCookie.name}=${sessionCookie.value} ; Path=. ; ${sessionCookie.attributes.toString()}`;

	return {
		status: 200,
		body: {
			message: "Login successful",
		},
	};
}

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string(),
});
