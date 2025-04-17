CREATE TABLE `programmeDetails` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`exercise_id` integer,
	`repRange` text,
	`programme_id` integer,
	FOREIGN KEY (`exercise_id`) REFERENCES `exercise`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`programme_id`) REFERENCES `programme`(`id`) ON UPDATE no action ON DELETE no action
);
