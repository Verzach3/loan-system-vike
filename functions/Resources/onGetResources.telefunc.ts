import type { TelefuncContext } from "@/types";
import { getContext } from "telefunc";

export async function onGetResources() {
  const { db } = getContext<TelefuncContext>();

  return await db.query.resourceTable.findMany({
    with: {
      headquarter: true
    }
  });
}