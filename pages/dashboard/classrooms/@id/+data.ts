import type { PageContext } from "vike/types";

export type ClassroomData = Awaited<ReturnType<typeof data>>;

export async function data({ db, routeParams }: PageContext) {
	console.log(db);
	if (!routeParams?.id) {
		throw new Error("Invalid route params");
	}

	const classroom = await db.query.classroomTable.findFirst({
		where: (classroomTable, { eq }) => eq(classroomTable.id, routeParams.id),
		with: {
			headquarter: true,
		},
	});

	if (!classroom) {
		return {
			status: 404,
			error: {
				message: "No se encontró la sede",
			},
		};
	}

	const classroomReservations = await db.query.classroomRequestsTable.findMany({
		where: (classroomRequestsTable, { eq }) =>
			eq(classroomRequestsTable.classroomId, routeParams.id),
		with: {
			user: true,
		}
	});

	if (!classroomReservations) {
		return {
			status: 404,
			error: {
				message: "No se encontraron reservaciones",
			},
		};
	}

	return {
		status: 200,
		body: {
			classroom,
			classroomReservations,
		},
		error: false,
	};
}
