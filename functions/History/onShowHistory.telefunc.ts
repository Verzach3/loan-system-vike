import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";
import {
	resourceRequestsTable,
	classroomRequestsTable,
	userTable,
} from "@/database/schema";
import { onCheckRole } from "../middleware/onCheckRole.server";
import { eq } from "drizzle-orm";
export const onShowHistory = async () => {
	const { db, session } = getContext<TelefuncContext>();

	if (!session) {
		return {
			status: 401,
			message: "Unauthorized",
			error: true,
		};
	}

	try {
		const { authorized } = await onCheckRole(
			db,
			session.user.id,
			["student", "admin", "professor"],
			session,
		);

		if (!authorized) {
			return {
				status: 401,
				message: "Unauthorized",
				error: true,
			};
		}

		const resourceQuery = await db
			.select({
				id: userTable.id,
				name: userTable.name,
				email: userTable.email,
				requestStartDate: resourceRequestsTable.requestStartDate,
				requestEndDate: resourceRequestsTable.requestEndDate,
				status: resourceRequestsTable.status,
			})
			.from(userTable)
			.innerJoin(
				resourceRequestsTable,
				eq(userTable.id, resourceRequestsTable.userId),
			)
			.where(eq(userTable.id, session.user.id));

		const classroomQuery = await db
			.select({
				id: userTable.id,
				name: userTable.name,
				email: userTable.email,
				requestStartDate: classroomRequestsTable.requestStartDate,
				requestEndDate: classroomRequestsTable.requestEndDate,
				status: classroomRequestsTable.status,
			})
			.from(userTable)
			.innerJoin(
				classroomRequestsTable,
				eq(userTable.id, classroomRequestsTable.userId),
			)
			.where(eq(userTable.id, session.user.id));

		return {
			status: 200,
			message: "Success",
			data: {
				resource: resourceQuery.map((item) => ({
					requestType: "Resource",
					...item,
				})),
				classroom: classroomQuery.map((item) => ({
					requestType: "Classroom",
					...item,
				})),
				all: [
					...resourceQuery.map((item) => ({
						requestType: "Resource",
						...item,
					})),
					...classroomQuery.map((item) => ({
						requestType: "Classroom",
						...item,
					})),
				],
			},
			error: false,
		};
	} catch (e) {
		return {
			status: 500,
			message: "Internal Server Error",
			error: true,
		};
	}
};
