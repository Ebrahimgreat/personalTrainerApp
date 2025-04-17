CREATE TABLE `heightUnit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weightUnits` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`unit` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `workoutDetails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`workout_id` integer,
	FOREIGN KEY (`workout_id`) REFERENCES `workout`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `workout` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
