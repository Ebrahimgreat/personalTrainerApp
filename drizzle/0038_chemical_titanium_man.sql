PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_workout` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` integer,
	`name` text,
	`programme_id` integer,
	`created_at` text,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`programme_id`) REFERENCES `programme`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_workout`("id", "user_id", "name", "programme_id", "created_at") SELECT "id", "user_id", "name", "programme_id", "created_at" FROM `workout`;--> statement-breakpoint
DROP TABLE `workout`;--> statement-breakpoint
ALTER TABLE `__new_workout` RENAME TO `workout`;--> statement-breakpoint
PRAGMA foreign_keys=ON;