import { getContext } from "telefunc";
import { onCheckRole } from "../middleware/onCheckRole.server";
import type { TelefuncContext } from "@/types";
import {
	classroomRequestInsertSchema,
	type classroomRequestInsert,
	classroomRequestsTable,
} from "@/database/schema";
import { nanoid } from "nanoid";

export const onCreateClassroomRequest = async (
	request: classroomRequestInsert,
) => {
	const { db, session } = getContext<TelefuncContext>();

	if (!session || !session.user) {
		return {
			status: 401,
			body: "Unauthorized",
			error: true,
		};
	}

	const id = nanoid();
	const reqwithId = {
		...request,
		id,
		userId: session.user.id,
		status: "pendiente" as const,
	};

	//validate the input
	const result = classroomRequestInsertSchema.safeParse(reqwithId);

	if (!result.success) {
		return {
			error: true,
			status: 400,
			body: result.error.message,
		};
	}

	//check if the classroom exists
	const isClassroom = await db.query.classroomTable.findFirst({
		where: (classroomTable, { eq }) =>
			eq(classroomTable.id, reqwithId.classroomId),
	});

	if (!isClassroom) {
		console.log("Classroom does not exist");
		return {
			status: 404,
			body: "Classroom does not exist",
			error: true,
		};
	}

	//check if classroom is already requested
	if (["evento", "mantenimiento"].includes(isClassroom.status)) {
		console.log(
			`It is not possible to make the request, the room is ${isClassroom.status}`,
		);
		return {
			status: 400,
			body: `It is not possible to make the request, the room is ${isClassroom.status}`,
			error: true,
		};
	}

	//check if the user is authorized
	const { authorized } = await onCheckRole(
		db,
		session.user.id,
		["admin", "professor"],
		session,
	);

	if (!authorized) {
		console.log("Unauthorized");
		return {
			status: 403,
			body: "Unauthorized",
			error: true,
		};
	}

	try {
		await db.insert(classroomRequestsTable).values(reqwithId).execute();
		console.log("Classroom request created");
		return {
			status: 201,
			body: "Classroom request created",
			error: false,
		};
	} catch (error) {
		console.log("Error creating classroom request", error);
		return {
			status: 500,
			body: "Error creating classroom request",
			error: true,
		};
	}
};
