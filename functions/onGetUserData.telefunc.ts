import type { TelefuncContext } from "@/types";
import { getContext } from "telefunc";

export async function onGetUserData() {
	const { db, session } = getContext<TelefuncContext>();
  if (!session) {
    return undefined;
  }
	const user = await db.query.userTable.findFirst({
		where: (userTable, { eq }) => eq(userTable.id, session.user.id),
    });
	if (!user) {
		return undefined;
	}
	return user;
}
