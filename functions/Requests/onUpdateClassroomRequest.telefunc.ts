import { getContext } from "telefunc";
import { onCheckRole } from "../middleware/onCheckRole.server";
import type { TelefuncContext } from "@/types";
import {
	type classroomRequestInsert,
	classroomRequestsTable,
} from "@/database/schema";
import { eq } from "drizzle-orm";

export const onUpdateClassroomRequest = async (request: classroomRequestInsert) => {
	const { db, session } = getContext<TelefuncContext>();

	if (!session || !session.user) {
		return {
			status: 401,
			body: "Unauthorized",
			error: true,
		};
	}

	if (!request) {
		return {
			status: 400,
			body: "Bad Request",
			error: true,
		};
	}

	try {
		const { status, ...data } = request;

		await db
			.update(classroomRequestsTable)
			.set({ status })
			.where(eq(classroomRequestsTable.userId, session.user.id))
			.returning({ updateId: classroomRequestsTable.userId });

		return {
			status: 200,
			body: "Classroom Request Updated",
			error: false,
		};
	} catch (error) {
		return {
			status: 500,
			body: "Internal Server Error",
			error: true,
		};
	}
};
