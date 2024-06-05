import { getContext } from "telefunc";
import type { TelefuncContext } from "../types";
import { eq } from "drizzle-orm";
import { userTable } from "@/database/schema";

export async function onCheckSession() {
  const { session, db } = getContext<TelefuncContext>();
  console.log(session)
  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    }
  }
  const user = await db.select().from(userTable).where(eq(userTable.id, session.user.id));
  return {
    status: 200,
    body: user,
  }
}