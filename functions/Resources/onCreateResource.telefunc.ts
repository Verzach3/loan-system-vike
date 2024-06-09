import { nanoid } from "nanoid";
import { getContext } from "telefunc";
import { TelefuncContext } from "@/types";

import { onCheckRole } from "../middleware/onCheckRole.telefunc";
import { ResourceInsert, resourceTable } from "@/database/schema";

export const onCreateResource = async (resource: ResourceInsert) => {
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
      "admin"
    );

    if (!authorized) {
      return {
        status,
        body,
      };
    }
   
    await db.insert(resourceTable).values({
      id: nanoid(),
      ...resource,
    });


    return {
      status: 201,
      body: "Resource created",
    };
  } catch (error) {
    return {
      status: 500,
      body: error,
    };
  }
};
