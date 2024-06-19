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

import { onCheckRole } from "../middleware/onCheckRole.server";
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
        const { authorized } = await onCheckRole(db, session.user.id, ["admin"], session);

        if (!authorized) {
            return {
                status: 401,
                message: "Unauthorized",
                error: true
            };
        }



        const resourceQuery = await db.select({
            id: userTable.id,
            name: userTable.name,
            email: userTable.email,
            requestStartDate: resourceRequestsTable.requestStartDate,
            requestEndDate: resourceRequestsTable.requestEndDate,
            status: resourceRequestsTable.status
          }).from(userTable).
            innerJoin(resourceRequestsTable, eq(userTable.id, resourceRequestsTable.userId))


        const classroomQuery = await db.select({
                id: userTable.id,
                name: userTable.name,
                email: userTable.email,
                requestStartDate: classroomRequestsTable.requestStartDate,
                requestEndDate: classroomRequestsTable.requestEndDate,
                status: classroomRequestsTable.status
              }).from(userTable).
              innerJoin(classroomRequestsTable, eq(userTable.id, classroomRequestsTable.userId))


              
        return {
            status: 200,
            message: "Success",
            data: {
                resource: resourceQuery.map(item => ({requestType: "Resource", ...item})),
                classroom: classroomQuery.map(item => ({requestType: "Classroom", ...item})),
                all: [...resourceQuery.map(item => ({requestType: "Resource", ...item})), ...classroomQuery.map(item => ({requestType: "Classroom", ...item}))]
            },
            error: false
        };

        
    } catch(e) {
        return {
            status: 500,
            message: "Internal Server Error",
            error: true
        };
    }



};