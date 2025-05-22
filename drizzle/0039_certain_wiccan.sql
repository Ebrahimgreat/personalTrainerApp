PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_nutrition` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`calories` numeric,
	`protein` numeric,
	`fat` numeric,
	`carbs` numeric,
	`created_at` text,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_nutrition`("id", "calories", "protein", "fat", "carbs", "created_at", "user_id") SELECT "id", "calories", "protein", "fat", "carbs", "created_at", "user_id" FROM `nutrition`;--> statement-breakpoint
DROP TABLE `nutrition`;--> statement-breakpoint
ALTER TABLE `__new_nutrition` RENAME TO `nutrition`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE TABLE `__new_weight` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scaleWeight` numeric,
	`created_at` text,
	`trendWeight` numeric,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_weight`("id", "scaleWeight", "created_at", "trendWeight", "user_id") SELECT "id", "scaleWeight", "created_at", "trendWeight", "user_id" FROM `weight`;--> statement-breakpoint
DROP TABLE `weight`;--> statement-breakpoint
ALTER TABLE `__new_weight` RENAME TO `weight`;