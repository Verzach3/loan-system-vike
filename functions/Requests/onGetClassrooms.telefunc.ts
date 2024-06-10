import type { TelefuncContext } from "@/types";
import { getContext } from "telefunc";

export async function onGetClassrooms() {
  const { db } = getContext<TelefuncContext>();

  return await db.query.classroomTable.findMany({
    with: {
      headquarter: true
    }
  });
}