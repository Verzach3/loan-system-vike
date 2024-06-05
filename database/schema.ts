import { relations } from "drizzle-orm";
import {
	pgTable,
	text,
	timestamp,
	boolean,
	numeric,
	date,
} from "drizzle-orm/pg-core";

export const userTable = pgTable("user", {
	id: text("id").primaryKey(),
	email: text("email").notNull().unique(),
	name: text("name").notNull(),
	password: text("password").notNull(),
});

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

export const classroomTable = pgTable("classroom", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	isActive: boolean("is_active").notNull(),
  headquarterId: text("headquarter_id").notNull(),
});

export const classroomRelations = relations(classroomTable, ({ one, many }) => ({
	headquarter: one(headquarterTable, {
    fields: [classroomTable.headquarterId],
    references: [headquarterTable.id],
  }),
  images: many(classroomImageTable),
  requests: many(classroomRequestsTable),
}));

export const classroomImageTable = pgTable("classroom_image", {
	id: text("id").primaryKey(),
	imageUrl: text("image_url").notNull(),
	classroomId: text("classroom_id").notNull(),
});

export const classroomImageRelations = relations(classroomImageTable, ({ one }) => ({
	classroom: one(classroomTable, {
    fields: [classroomImageTable.classroomId],
    references: [classroomTable.id],
  }),
}));

export const classroomRequestsTable = pgTable("classroom_request", {
	id: text("id").primaryKey(),
	requestDate: date("request_date").notNull(),
	classroomId: text("classroom_id").notNull(),
});

export const classroomRequestsRelations = relations(classroomRequestsTable, ({ one }) => ({
	classroom: one(classroomTable, {
    fields: [classroomRequestsTable.classroomId],
    references: [classroomTable.id],
  }),
}));

export const resourceTable = pgTable("resource", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	quantity: numeric("quantity").notNull(),
  headquarterId: text("headquarter_id").notNull(),
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
	resourceId: text("resource_id").notNull(),
});

export const resourceImageRelations = relations(resourceImageTable, ({ one }) => ({
	resource: one(resourceTable, {
    fields: [resourceImageTable.resourceId],
    references: [resourceTable.id],
  }),
}));

export const resourceRequestsTable = pgTable("resource_request", {
	id: text("id").primaryKey(),
	requestDate: date("request_date").notNull(),
	resourceId: text("resource_id").notNull(),
});

export const resourceRequestsRelations = relations(resourceRequestsTable, ({ one }) => ({
	resource: one(resourceTable, {
    fields: [resourceRequestsTable.resourceId],
    references: [resourceTable.id],
  }),
}));

export const headquarterTable = pgTable("headquarter", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	description: text("description").notNull(),
	city: text("city").notNull(),
	country: text("country").notNull(),
});

export type HeadquarterInsert = Omit<typeof headquarterTable.$inferInsert, "id">;
export type HeadquarterSelect = typeof headquarterTable.$inferSelect;

export const headquarterRelations = relations(headquarterTable, ({ many }) => ({
	classrooms: many(classroomTable),
  resources: many(resourceTable),
}));
