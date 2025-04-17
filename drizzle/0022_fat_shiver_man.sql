PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_programme` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text,
	`description` text,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_programme`("id", "name", "description", "user_id") SELECT "id", "name", "description", "user_id" FROM `programme`;--> statement-breakpoint
DROP TABLE `programme`;--> statement-breakpoint
ALTER TABLE `__new_programme` RENAME TO `programme`;--> statement-breakpoint
PRAGMA foreign_keys=ON;