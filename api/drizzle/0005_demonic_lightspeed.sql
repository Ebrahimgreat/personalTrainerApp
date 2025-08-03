ALTER TABLE "foodsTable" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "nutrition" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
ALTER TABLE "weight" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "foodsTable" CASCADE;--> statement-breakpoint
DROP TABLE "nutrition" CASCADE;--> statement-breakpoint
DROP TABLE "weight" CASCADE;--> statement-breakpoint
ALTER TABLE "measurementsData" DROP CONSTRAINT "measurementsData_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "measurementsData" ALTER COLUMN "value" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "workoutDetails" ALTER COLUMN "set" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "workoutDetails" ALTER COLUMN "reps" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "workoutDetails" ALTER COLUMN "weight" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "workoutDetails" ALTER COLUMN "rir" SET DATA TYPE real;--> statement-breakpoint
ALTER TABLE "measurementsData" ADD CONSTRAINT "measurementsData_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;