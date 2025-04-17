CREATE TABLE `nutrition` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`calories` numeric,
	`protein` numeric,
	`fat` numeric,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `weight` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scaleWeight` numeric,
	`trendWeight` numeric,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
