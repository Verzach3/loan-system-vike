import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  numeric,
  date,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod"
export const userRoles = pgEnum("user_roles", [
  "admin",
  "professor",
  "student",
]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  role: userRoles("role").notNull().default("student"),
});

export const userRelations = relations(userTable, ({ many }) => ({
  classroomRequests: many(classroomRequestsTable),
  resourceRequests: many(resourceRequestsTable),
}));

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const itemStatus = pgEnum("item_status", [
  "disponible",
  "mantenimiento",
  "evento",
  "ocupado",
]);
export const requestStatus = pgEnum("request_status", [
  "pendiente",
  "aprobado",
  "rechazado",
]);

export const classroomTable = pgTable("classroom", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  status: itemStatus("status").notNull(),
  headquarterId: text("headquarter_id").references(() => headquarterTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
});

export const classroomRelations = relations(
  classroomTable,
  ({ one, many }) => ({
    headquarter: one(headquarterTable, {
      fields: [classroomTable.headquarterId],
      references: [headquarterTable.id],
    }),
    images: many(classroomImageTable),
    requests: many(classroomRequestsTable),
  })
);

export const classroomImageTable = pgTable("classroom_image", {
  id: text("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  classroomId: text("classroom_id").references(() => classroomTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
});

export const classroomImageRelations = relations(
  classroomImageTable,
  ({ one }) => ({
    classroom: one(classroomTable, {
      fields: [classroomImageTable.classroomId],
      references: [classroomTable.id],
    }),
  })
);

export type classroomImageTableSelect = typeof classroomImageTable.$inferSelect;
export type classroomImageTableInsert = typeof classroomImageTable.$inferInsert;


export const classroomRequestsTable = pgTable("classroom_request", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  requestStartDate: date("request_startdate").notNull(),
  requestEndDate: date("request_enddate").notNull(),
  classroomId: text("classroom_id").references(() => classroomTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  status: requestStatus("status").notNull(),
});

export type classroomRequestType = typeof classroomRequestsTable.$inferSelect;
export const classroomRequestInsertSchema = createInsertSchema(classroomRequestsTable)

export type classroomRequestInsert = typeof classroomRequestsTable.$inferInsert;

export const classroomRequestsRelations = relations(
  classroomRequestsTable,
  ({ one }) => ({
    classroom: one(classroomTable, {
      fields: [classroomRequestsTable.classroomId],
      references: [classroomTable.id],
    }),
    user: one(userTable, {
      fields: [classroomRequestsTable.userId],
      references: [userTable.id],
    }),
  })
);

export const resourceTable = pgTable("resource", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  quantity: numeric("quantity").notNull(),
  status: itemStatus("status").notNull(),
  headquarterId: text("headquarter_id").references(() => headquarterTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
});

export const resourceRelations = relations(resourceTable, ({ one, many }) => ({
  headquarter: one(headquarterTable, {
    fields: [resourceTable.headquarterId],
    references: [headquarterTable.id],
  }),
  images: many(resourceImageTable),
  requests: many(resourceRequestsTable),
}));

export const resourceImageTable = pgTable("resource_image", {
  id: text("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  resourceId: text("resource_id").references(() => resourceTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
});

export const resourceImageRelations = relations(
  resourceImageTable,
  ({ one }) => ({
    resource: one(resourceTable, {
      fields: [resourceImageTable.resourceId],
      references: [resourceTable.id],
    }),
  })
);

export const resourceRequestsTable = pgTable("resource_request", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => userTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  requestStartDate: date("request_startdate").notNull(),
  requestEndDate: date("request_enddate").notNull(),
  resourceId: text("resource_id").references(() => resourceTable.id, { onDelete: "cascade", onUpdate: "cascade" }).notNull(),
  status: requestStatus("status").notNull(),
});

export type resourceRequestType = typeof resourceRequestsTable.$inferSelect;
export type resourceRequestInsert = typeof resourceRequestsTable.$inferInsert;

export const resourceRequestInsertSchema = createInsertSchema(resourceRequestsTable)


export const resourceRequestsRelations = relations(
  resourceRequestsTable,
  ({ one }) => ({
    resource: one(resourceTable, {
      fields: [resourceRequestsTable.resourceId],
      references: [resourceTable.id],
    }),
    user: one(userTable, {
      fields: [resourceRequestsTable.userId],
      references: [userTable.id],
    }),
  })
);

export const headquarterTable = pgTable("headquarter", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  city: text("city").notNull(),
  country: text("country").notNull(),
});

export type HeadquarterInsert = Omit<
  typeof headquarterTable.$inferInsert,
  "id"
>;
export type HeadquarterSelect = typeof headquarterTable.$inferSelect;

export type ClassroomInsert = Omit<typeof classroomTable.$inferInsert, "id">;
export type ClassroomSelect = typeof classroomTable.$inferSelect;

export type ResourceInsert = Omit<typeof resourceTable.$inferInsert, "id">;
export type ResourceSelect = typeof resourceTable.$inferSelect;

export const headquarterRelations = relations(headquarterTable, ({ many }) => ({
  classrooms: many(classroomTable),
  resources: many(resourceTable),
}));
