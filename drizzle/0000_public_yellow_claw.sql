DO $$ BEGIN
 CREATE TYPE "public"."item_status" AS ENUM('activo', 'mantenimiento', 'evento', 'inactivo');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."request_status" AS ENUM('pendiente', 'aprobado', 'rechazado');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_roles" AS ENUM('admin', 'professor', 'student');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classroom_image" (
	"id" text PRIMARY KEY NOT NULL,
	"image_url" text NOT NULL,
	"classroom_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classroom_request" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"request_date" date NOT NULL,
	"classroom_id" text NOT NULL,
	"status" "request_status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "classroom" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"status" "item_status" NOT NULL,
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
	"resource_id" text NOT NULL,
	"status" "request_status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "resource" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"quantity" numeric NOT NULL,
	"status" "item_status" NOT NULL,
	"headquarter_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "session" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"expires_at" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"password" text NOT NULL,
	"role" "user_roles" DEFAULT 'student' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
