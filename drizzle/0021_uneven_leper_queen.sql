PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`age` integer NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`user_id` numeric,
	`parent_id` integer
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "age", "email", "password", "user_id", "parent_id") SELECT "id", "name", "age", "email", "password", "user_id", "parent_id" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `programme` ADD `assigned_to` integer REFERENCES users(id);