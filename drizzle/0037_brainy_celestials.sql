CREATE TABLE `customExercise` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`equipment` text,
	`targetMuscleGroup` text,
	`type` text,
	`instructions` text,
	`photo` text,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
