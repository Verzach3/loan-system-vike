
import { eq } from 'drizzle-orm';
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


//TODO: Implement onShowReportsById
export const onShowReportsById = async (userId: string, status?: statusReport) => {
    
    const { db, session } = getContext<TelefuncContext>();

    if (!userId) {
        return {
            error: true,
            message: 'id is required'
        }
    }

    if (!session) {
        return {
            error: true,
            message: 'Session not found'
        }
    }

   try {
        const isUser = await db.select().from(userTable).where(eq(userTable.id, userId));

        if (!isUser) {
            return {
                error: true,
                message: 'User not found'
            }
        }

        const query = await db.select().from(classroomRequestsTable).innerJoin(resourceRequestsTable, eq(classroomRequestsTable.userId, resourceRequestsTable.userId));
   
        if (!query) return 'No reports found';

        if (!status) {
            console.log(query);
            return {
                error: false,
                message: 'Reports found',
                data: query,
                status: 200
            }
        }

        const result = query.filter(sts => sts.classroom_request.status && sts.resource_request.status === status.status);

        console.log(result);

        return {
                error: false,
                message: 'Reports found',
                data: result,
                status: 200
            }

    } catch (error) {
         return {
              error: true,
              message: `Error: ${error}`,
              status: 500
         }
   }


};