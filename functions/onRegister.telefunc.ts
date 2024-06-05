import { hash } from "@node-rs/argon2";
import { generateIdFromEntropySize } from "lucia";
import { getContext } from "telefunc";
import { z } from "zod";
import type { TelefuncContext } from "../types";
import { userTable } from "../database/schema";
import { eq } from "drizzle-orm";

export async function onRegister({
	email,
	password,
	name,
}: { email: string; password: string; name: string }) {
	const { lucia, db, aditionalCookies, aditionalHeaders } =
		getContext<TelefuncContext>();
	// validate the input
	const input = registerSchema.parse({ email, password, name });

	//check if the user exists
	const user = (
		await db.select().from(userTable).where(eq(userTable.email, input.email))
	)[0];

	if (user) {
		return {
			status: 400,
			body: {
				message: "User already exists",
			},
		};
	}

	const passwordHash = await hash(input.password, {
		memoryCost: 19456,
		timeCost: 2,
		outputLen: 32,
		parallelism: 1,
	});

	const userId = generateIdFromEntropySize(10);

	await db.insert(userTable).values({
		id: userId,
		email: input.email,
		name: input.name,
		password: passwordHash,
	});

	const session = await lucia.createSession(userId, {});
	const sessionCookie = lucia.createSessionCookie(session.id);
	aditionalCookies[sessionCookie.name] = `${sessionCookie.name}=${
		sessionCookie.value
	} ; Path=. ; ${sessionCookie.attributes.toString()}`;

	return {
		status: 200,
		body: {
			message: "User created",
		},
	};
}

const registerSchema = z.object({
	email: z.string().email(),
	name: z.string(),
	password: z.string(),
});
