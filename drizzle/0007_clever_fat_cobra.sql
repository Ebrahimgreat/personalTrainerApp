PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_nutrition` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`calories` numeric,
	`protein` numeric,
	`fat` numeric,
	`created_at` date,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_nutrition`("id", "calories", "protein", "fat", "created_at", "user_id") SELECT "id", "calories", "protein", "fat", "created_at", "user_id" FROM `nutrition`;--> statement-breakpoint
DROP TABLE `nutrition`;--> statement-breakpoint
ALTER TABLE `__new_nutrition` RENAME TO `nutrition`;--> statement-breakpoint
PRAGMA foreign_keys=ON;