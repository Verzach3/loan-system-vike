import { nanoid } from "nanoid";
import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";
import { eq } from "drizzle-orm";
import { onCheckRole, onCheckUser } from "../middleware";
import {
	userTable,
	resourceRequestsTable,
	classroomRequestsTable,
} from "@/database/schema";

export const onShowRequest = async () => {
	const { db, session } = getContext<TelefuncContext>();

	if (!session) {
		return { error: "Unauthorized", status: 401 };
	}

	try {
		const resourceQuery = await db
			.select({
				id: resourceRequestsTable.id,
				userId: userTable.id,
				name: userTable.name,
				email: userTable.email,
				requestStartDate: resourceRequestsTable.requestStartDate,
				requestEndDate: resourceRequestsTable.requestEndDate,
				status: resourceRequestsTable.status,
				role: userTable.role,
				resourceId: resourceRequestsTable.resourceId,
			})
			.from(userTable)
			.innerJoin(
				resourceRequestsTable,
				eq(userTable.id, resourceRequestsTable.userId),
			)
			.where(eq(userTable.id, session.user.id));

		const classroomQuery = await db
			.select({
				id: classroomRequestsTable.id,
				userId: userTable.id,
				name: userTable.name,
				email: userTable.email,
				requestStartDate: classroomRequestsTable.requestStartDate,
				requestEndDate: classroomRequestsTable.requestEndDate,
				status: classroomRequestsTable.status,
				role: userTable.role,
				classroomId: classroomRequestsTable.classroomId,
			})
			.from(userTable)
			.innerJoin(
				classroomRequestsTable,
				eq(userTable.id, classroomRequestsTable.userId),
			)
			.where(eq(userTable.id, session.user.id));

		return {
			data: {
				resourceQuery,
				classroomQuery,
			},
			status: 200,
		};
	} catch (error) {
		return { error, status: 500 };
	}
};
