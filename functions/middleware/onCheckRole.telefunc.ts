import { eq } from "drizzle-orm";
import { userTable } from "@/database/schema";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as Schema from "@/database/schema";


export const onCheckRole = async (db: PostgresJsDatabase<typeof Schema>,id: string, role: string[]) => {

    const isAuthorized = await db.select({role: userTable.role}).from(userTable).where(eq(userTable.id, id));

    if (!role.includes(isAuthorized[0].role)) return {
        status: 401,
        body: "Unauthorized",
        authorized: false,
    }

    return {
        status: 200,
        body: "Authorized",
        authorized: true
    };


};