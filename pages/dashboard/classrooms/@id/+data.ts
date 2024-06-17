import type { PageContext } from "vike/types";

export type ClassroomData = Awaited<ReturnType<typeof data>>;

export async function data({ db, routeParams }: PageContext) {
	console.log(db);
	if (!routeParams?.id) {
		throw new Error("Invalid route params");
	}

  return {
    status: 404,
    body: "No se encontró la sala",
    error: true
  }
  
}
