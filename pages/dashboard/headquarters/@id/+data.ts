import type { PageContext } from "vike/types";

export type HeadquarterData = Awaited<ReturnType<typeof data>>;

export async function data({ db, routeParams }: PageContext) {
  console.log(db);
  if (!routeParams?.id) {
    throw new Error("Invalid route params");
  }

  const headquarter = await db.query.headquarterTable.findFirst({
    where: (headquarterTable, { eq }) => eq(headquarterTable.id, routeParams.id)
  });

  const headquarterClassrooms = await db.query.classroomTable.findMany({
    where: (classroomTable, { eq }) => eq(classroomTable.headquarterId, routeParams.id)
  });

  const headquarterResources = await db.query.resourceTable.findMany({
    where: (resourceTable, { eq }) => eq(resourceTable.headquarterId, routeParams.id)
  });

  if (!headquarter) {
    return undefined
  }
  return {
    headquarter,
    headquarterClassrooms,
    headquarterResources
  };
}
