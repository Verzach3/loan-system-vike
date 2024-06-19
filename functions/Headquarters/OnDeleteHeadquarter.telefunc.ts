import { eq } from "drizzle-orm";
import { nanoid } from "nanoid";
import { getContext } from "telefunc";
import type { TelefuncContext } from "@/types";
import { headquarterTable } from "@/database/schema";


export const onDeleteheadquarter = async (headquarterId: string) => {

    const { db, session } = getContext<TelefuncContext>();


    if (!session) {
        return { error: "Unauthorized", status: 401 };
    }


    try {
        await db
            .delete(headquarterTable)
            .where(eq(headquarterTable.id,  headquarterId))

        return {
            data: {
                message: "headquarter deleted"
            }
        }

    } catch (error) {
        console.log(error)
    }
    
}