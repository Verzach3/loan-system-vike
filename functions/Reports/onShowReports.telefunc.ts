

import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";
import {
    classroomRequestInsertSchema,
    resourceRequestInsertSchema,
    resourceRequestsTable,
	classroomRequestsTable,
    userTable,
	type classroomRequestInsert,
    } from "@/database/schema";   

import { onCheckRole } from "../middleware/onCheckRole.telefunc";
import type { statusReport } from "../types/reports.type";
import { eq } from "drizzle-orm";

export const onShowReports = async () => {
    

    const { db, session } = getContext<TelefuncContext>();


    if (!session) {
        return {
            status: 401,
            message: "Unauthorized",
            error: true
        };
    }

    try {
        const { authorized } = await onCheckRole(db, session.user.id, ["student"]);

        if (!authorized) {
            return {
                status: 401,
                message: "Unauthorized",
                error: true
            };
        }

        const query = await db.select().from(classroomRequestsTable).innerJoin(resourceRequestsTable, eq(classroomRequestsTable.id, resourceRequestsTable.id));

        if (!query) {
            return {
                status: 404,
                message: "Not Found",
                error: true
            };
        }

        return {
            error: false,
            status: 200,
            message: "Success",
            data: query,
        }

    
    } catch(e) {
        return {
            status: 500,
            message: "Internal Server Error",
            error: true
        };
    }



};