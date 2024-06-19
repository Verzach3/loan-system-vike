import { onCheckRole } from "@/functions/middleware/onCheckRole.server";
import type { PageContext } from "vike/types";
import { redirect, render } from "vike/abort";
import { getContext } from "telefunc";

export async function guard(pageContext: PageContext) {
	if (
		!(
			await onCheckRole(
				pageContext.db,
				pageContext.session?.user.id ?? "",
				["admin", "student"],
				pageContext.session,
			)
		).authorized
	) {
		throw render("/login");
	}
}
