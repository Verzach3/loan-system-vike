import type { TelefuncContext } from "@/types";
import { getContext } from "telefunc";

export async function onGetHeadquarters() {
  const { db } = getContext<TelefuncContext>();

  return await db.query.headquarterTable.findMany();
}