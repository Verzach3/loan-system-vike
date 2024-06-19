import type { PageContext } from "vike/types";

export type ResourceData = Awaited<ReturnType<typeof data>>;

export async function data({ db, routeParams }: PageContext) {
	console.log(db);
	if (!routeParams?.id) {
		throw new Error("Invalid route params");
	}

	const resource = await db.query.resourceTable.findFirst({
		where: (resourceTable, { eq }) => eq(resourceTable.id, routeParams.id),
		with: {
			headquarter: true,
		},
	});

	if (!resource) {
		return {
			status: 404,
			error: {
				message: "No se encontró el recurso",
			},
		};
	}

	const resources = await db.query.resourceRequestsTable.findMany({
		where: (resourceRequestsTable, { eq }) =>
			eq(resourceRequestsTable.resourceId, routeParams.id),
		with: {
			user: true,
		}
	});

	if (!resources) {
		return {
			status: 404,
			error: {
				message: "No se encontraron recursos",
			},
		};
	}

	return {
		status: 200,
		body: {
			resource,
			resources,
		},
		error: false,
	};
}
