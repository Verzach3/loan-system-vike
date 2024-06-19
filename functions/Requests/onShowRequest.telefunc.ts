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
		const resourceQuery = await db.query.resourceTable.findMany({
			with: {
				requests: {
					with: {
						user: true,
					},
				},
			},
		});

		const classroomQuery = await db.query.classroomTable.findMany({
			with: {
				requests: {
					with: {
						user: true,
					},
				},
			},
		});

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
