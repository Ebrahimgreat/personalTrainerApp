CREATE TABLE `exercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text
);
--> statement-breakpoint
ALTER TABLE `workoutDetails` ADD `exercise_id` integer REFERENCES exercise(id);