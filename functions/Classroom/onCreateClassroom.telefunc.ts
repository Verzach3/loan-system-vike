import { ClassroomInsert, classroomTable } from "@/database/schema";
import { TelefuncContext } from "@/types";

import { nanoid } from "nanoid";
import { getContext } from "telefunc";
import { onCheckRole } from "../middleware/onCheckRole.telefunc";

export const onCreateClassroom = async (classroom: ClassroomInsert) => {
  const { db, session } = getContext<TelefuncContext>();

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  try {
    
    const { authorized, body, status } = await onCheckRole(
      session.user.id,
      ["admin", "student"]
    );

    if (!authorized) {
      return {
        status,
        body,
      };
    }

    await db.insert(classroomTable).values({
      id: nanoid(),
      ...classroom,
    });

    return {
      status: 201,
      body: "Classroom created",
    };
    
  } catch (error) {
    return {
      status: 500,
      body: error,
    };
  }
};
