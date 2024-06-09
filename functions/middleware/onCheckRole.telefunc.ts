import { TelefuncContext } from "@/types";
import { eq } from "drizzle-orm";
import { getContext } from "telefunc";

import { userTable } from "@/database/schema";



export const onCheckRole = async (id: string, role: string) => {
    const { db } = getContext<TelefuncContext>();


    const isAuthorized = await db.select({role: userTable.role}).from(userTable).where(eq(userTable.id, id));

    if ( isAuthorized[0].role !== role) {
        return {
            status: 401,
            body: "Unauthorized",
            authorized: false
        };
    }

    return {
        status: 200,
        body: "Authorized",
        authorized: true
    };


};