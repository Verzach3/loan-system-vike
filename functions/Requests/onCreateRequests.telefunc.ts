import { getContext } from "telefunc";

import { requestType } from "../types/request.type";
import { TelefuncContext } from "@/types";
import {
  classroomRequestsTable,
  resourceRequestsTable,
} from "@/database/schema";
import { onCheckRole } from "../middleware/onCheckRole.telefunc";
import { nanoid } from "nanoid";

export default async function onCreateRequests(request: requestType) {
  const { db, session } = getContext<TelefuncContext>();

  const { type, requestId, ...rest } = request;

  if (!session) {
    return {
      status: 401,
      body: "Unauthorized",
    };
  }

  if (!type) {
    return {
      status: 400,
      body: "Missing type",
    };
  }

  //TODO: check if the classroom or resource exists and is available

  if (type !== "classroom") {
    await db.insert(resourceRequestsTable).values({
      id: nanoid(),
      userId: session.user.id,
      resourceId: requestId,
      requestStartDate: rest.requestStartDate,
      requestEndDate: rest.requestEndDate,
      status: "pendiente",
    });

    return {
      status: 201,
      body: "Request created",
    };
  }

  const { authorized: isAdminAuthorized } = await onCheckRole(
    session.user.id,
    "admin"
  );

  const {
    authorized: isProfessorAuthorized,
    body,
    status,
  } = await onCheckRole(session.user.id, "professor");

  if (!isAdminAuthorized || !isProfessorAuthorized) {
    return {
      status,
      body,
    };
  }

  await db.insert(classroomRequestsTable).values({
    id: nanoid(),
    userId: session.user.id,
    classroomId: requestId,
    requestStartDate: rest.requestStartDate,
    requestEndDate: rest.requestEndDate,
    status: "pendiente",
  });

  return {
    status: 201,
    body: "Request created",
  };
}
