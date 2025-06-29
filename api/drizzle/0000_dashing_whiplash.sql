CREATE TABLE "customExercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"equipment" text,
	"targetMuscleGroup" text,
	"type" text,
	"instructions" text,
	"photo" text,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "foodsTable" (
	"id" serial PRIMARY KEY NOT NULL,
	"foodName" text,
	"defaultProtein" numeric,
	"defaultServing" numeric,
	"defaultCalories" numeric,
	"defaultCarbs" numeric,
	"defaultFat" numeric,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "exercise" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"equipment" text,
	"targetMuscleGroup" text,
	"type" text,
	"instructions" text,
	"photo" text
);
--> statement-breakpoint
CREATE TABLE "heightUnit" (
	"id" serial PRIMARY KEY NOT NULL,
	"unit" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "latestActivities" (
	"id" serial PRIMARY KEY NOT NULL,
	"sender_id" integer,
	"reciever_id" integer,
	"message" text
);
--> statement-breakpoint
CREATE TABLE "measurementsData" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"measurement_id" integer,
	"value" numeric,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "measurements" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"content" text,
	"created_at" timestamp,
	"user_id" integer,
	"room_id" integer
);
--> statement-breakpoint
CREATE TABLE "nutrition" (
	"id" serial PRIMARY KEY NOT NULL,
	"calories" numeric,
	"protein" numeric,
	"fat" numeric,
	"carbs" numeric,
	"created_at" timestamp,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "programmeDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"exercise_id" integer,
	"repRange" text,
	"programme_workoutId" integer,
	"sets" integer
);
--> statement-breakpoint
CREATE TABLE "programmeWorkout" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"programme_id" integer
);
--> statement-breakpoint
CREATE TABLE "programme" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"description" text,
	"user_id" integer,
	"assigned_to" integer
);
--> statement-breakpoint
CREATE TABLE "roomMembers" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"room_id" integer
);
--> statement-breakpoint
CREATE TABLE "rooms" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" integer
);
--> statement-breakpoint
CREATE TABLE "userProgramme" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"programme_id" integer,
	"status" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	"user_id" numeric,
	"parent_id" integer
);
--> statement-breakpoint
CREATE TABLE "weight" (
	"id" serial PRIMARY KEY NOT NULL,
	"scaleWeight" numeric,
	"created_at" timestamp,
	"trendWeight" numeric,
	"user_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "weightUnits" (
	"id" serial PRIMARY KEY NOT NULL,
	"unit" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "workoutDetails" (
	"id" serial PRIMARY KEY NOT NULL,
	"workout_id" integer,
	"set" numeric,
	"reps" numeric,
	"weight" numeric,
	"rir" numeric,
	"exercise_id" integer
);
--> statement-breakpoint
CREATE TABLE "workout" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer,
	"name" text,
	"programme_id" integer,
	"created_at" timestamp
);
--> statement-breakpoint
ALTER TABLE "customExercise" ADD CONSTRAINT "customExercise_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "foodsTable" ADD CONSTRAINT "foodsTable_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "latestActivities" ADD CONSTRAINT "latestActivities_sender_id_users_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "latestActivities" ADD CONSTRAINT "latestActivities_reciever_id_users_id_fk" FOREIGN KEY ("reciever_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "measurementsData" ADD CONSTRAINT "measurementsData_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "measurementsData" ADD CONSTRAINT "measurementsData_measurement_id_measurements_id_fk" FOREIGN KEY ("measurement_id") REFERENCES "public"."measurements"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "messages" ADD CONSTRAINT "messages_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programmeDetails" ADD CONSTRAINT "programmeDetails_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programmeDetails" ADD CONSTRAINT "programmeDetails_programme_workoutId_programmeWorkout_id_fk" FOREIGN KEY ("programme_workoutId") REFERENCES "public"."programmeWorkout"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programmeWorkout" ADD CONSTRAINT "programmeWorkout_programme_id_programme_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programme"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme" ADD CONSTRAINT "programme_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programme" ADD CONSTRAINT "programme_assigned_to_users_id_fk" FOREIGN KEY ("assigned_to") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomMembers" ADD CONSTRAINT "roomMembers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "roomMembers" ADD CONSTRAINT "roomMembers_room_id_rooms_id_fk" FOREIGN KEY ("room_id") REFERENCES "public"."rooms"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "rooms" ADD CONSTRAINT "rooms_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userProgramme" ADD CONSTRAINT "userProgramme_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "userProgramme" ADD CONSTRAINT "userProgramme_programme_id_programme_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programme"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "weight" ADD CONSTRAINT "weight_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workoutDetails" ADD CONSTRAINT "workoutDetails_workout_id_workout_id_fk" FOREIGN KEY ("workout_id") REFERENCES "public"."workout"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workoutDetails" ADD CONSTRAINT "workoutDetails_exercise_id_exercise_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercise"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout" ADD CONSTRAINT "workout_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "workout" ADD CONSTRAINT "workout_programme_id_programme_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programme"("id") ON DELETE no action ON UPDATE no action;