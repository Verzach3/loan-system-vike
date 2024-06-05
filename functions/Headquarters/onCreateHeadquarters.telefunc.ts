import { headquarterTable, type HeadquarterInsert } from "@/database/schema";
import type { TelefuncContext } from "@/types";
import { getContext } from "telefunc";
import { nanoid } from "nanoid";

export async function onCreateHeadquarters(headquarter: HeadquarterInsert) {
	const { db, session } = getContext<TelefuncContext>();
	if (!session) {
		return {
			status: 401,
			body: "Unauthorized",
		};
	}

	await db.insert(headquarterTable).values({
		id: nanoid(),
		...headquarter,
	});

	return {
		status: 201,
		body: "Headquarters created",
	};
}
