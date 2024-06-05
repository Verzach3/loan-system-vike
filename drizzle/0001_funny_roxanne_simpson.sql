CREATE TABLE IF NOT EXISTS "classroom_image" (
	"id" text PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"classroom_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classroom_request" (
	"id" text PRIMARY KEY NOT NULL,
	"request_date" date NOT NULL,
	"classroom_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classroom" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"is_active" boolean NOT NULL,
	"headquarter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "headquarter" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"city" text NOT NULL,
	"country" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource_image" (
	"id" text PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"resource_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource_request" (
	"id" text PRIMARY KEY NOT NULL,
	"request_date" date NOT NULL,
	"resource_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"quantity" numeric NOT NULL,
	"headquarter_id" text NOT NULL
);
