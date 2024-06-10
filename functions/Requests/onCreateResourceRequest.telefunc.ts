import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";

import { onCheckRole } from "../middleware/onCheckRole.telefunc";

import  { type resourceRequestInsert, resourceRequestInsertSchema, resourceTable, resourceRequestsTable } from "@/database/schema";

export const onCreateResourceRequest = async (request: resourceRequestInsert) => {
    const { db, session } = getContext<TelefuncContext>();

    const id = nanoid();
	const reqwithId = {
		...request,
		id,
	};

    //validate the input
	const result = resourceRequestInsertSchema.safeParse(reqwithId);

   

    if (!result.success) {
        return {
            error: true,
            status: 400,
            body: result.error.message
        }
    }

    if (!session) {
        return {
            error: true,
            status: 401,
            body: "Unauthorized"
        }
    }

    const isResource = await db
        .select()
        .from(resourceTable)
        .where(eq(resourceTable.id, reqwithId.resourceId));


    if (!isResource) {
        console.log("Resource not found")
        return {
            error: true,
            status: 404,
            body: "Resource not found"
        }
    }

    if (["ocupado", "evento", "mantenimiento"].includes(isResource[0].status)) {
        console.log(`It is not possible to make the request, the room is ${isResource[0].status}`);
        return {
            status: 400,
            body: `It is not possible to make the request, the room is ${isResource[0].status}`,
            error: true,
        };
    }


    //check if the user is authorized
	const { authorized } = await onCheckRole(db, session.user.id, [
		"admin",
		"student",
	]);
    
    if (!authorized) {
		console.log("Unauthorized");
		return {
			status: 403,
			body: "Unauthorized",
			error: true,
		};
	}


    try {
        console.log("Entro")
        await db.insert(resourceRequestsTable).values(reqwithId).execute();
        console.log("Resource request created");
        return {
            error: false,
            status: 201,
            body: "Resource request created"
        }
    } catch(e) {
        console.log(e);
        return {
            error: true,
            status: 500,
            body: "Internal Server Error"
        }
    }


}