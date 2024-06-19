import type { TelefuncContext } from "@/types";
import { getContext } from "telefunc";
import { onCheckRole } from "./onCheckRole.server";
import { userTable } from "@/database/schema";
import { eq } from "drizzle-orm";



export const onCheckUser = async (userId: string) => {

    const { db, session } = getContext<TelefuncContext>();

    if (!session) {
        return {
            status: 401,
            body: "Unauthorized",
            error: true
        };
    }

    try {
        //const { authorized, body, status } = await onCheckRole(db, session.user.id, ["admin"]);

       

        const user = await db.select().from(userTable).where(eq(userTable.id, userId));

        if (!user) {
            return {
                status: 404,
                body: "User not found",
                error: true
            };
        }

        return {
            status: 200,
            user: user[0],
        };

    } catch (error) {
        return {
            status: 500,
            body: error,
        };
    }
}