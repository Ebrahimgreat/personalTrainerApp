ALTER TABLE "programmeWorkout" RENAME TO "programmeworkout";--> statement-breakpoint
ALTER TABLE "programmeDetails" DROP CONSTRAINT "programmeDetails_programme_workoutId_programmeWorkout_id_fk";
--> statement-breakpoint
ALTER TABLE "programmeworkout" DROP CONSTRAINT "programmeWorkout_programme_id_programme_id_fk";
--> statement-breakpoint
ALTER TABLE "programmeDetails" ADD CONSTRAINT "programmeDetails_programme_workoutId_programmeworkout_id_fk" FOREIGN KEY ("programme_workoutId") REFERENCES "public"."programmeworkout"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "programmeworkout" ADD CONSTRAINT "programmeworkout_programme_id_programme_id_fk" FOREIGN KEY ("programme_id") REFERENCES "public"."programme"("id") ON DELETE cascade ON UPDATE no action;