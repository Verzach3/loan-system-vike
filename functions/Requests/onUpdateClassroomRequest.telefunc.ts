import { getContext } from "telefunc";
import { onCheckRole } from "../middleware/onCheckRole.server";
import type { TelefuncContext } from "@/types";
import {
	type classroomRequestInsert,
	classroomRequestsTable,
	type resourceRequestInsert,
	resourceRequestsTable,
} from "@/database/schema";
import { eq } from "drizzle-orm";

type RequestInsert = classroomRequestInsert | resourceRequestInsert;

export const onUpdateClassroomRequest = async (request: RequestInsert, requestId: string) => {
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
		const { status, requestStartDate, requestEndDate } = request;

		if ('classroomId' in request) {
			await db
				.update(classroomRequestsTable)
				.set({ status: status, requestStartDate: requestStartDate, requestEndDate: requestEndDate })
				.where(eq(classroomRequestsTable.id, requestId));
		} else if ('resourceId' in request) {
			await db
				.update(resourceRequestsTable)
				.set({ status: status, requestStartDate: requestStartDate, requestEndDate: requestEndDate })
				.where(eq(resourceRequestsTable.id, requestId));
		}

		return {
			status: 200,
			body: "Request Updated",
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
