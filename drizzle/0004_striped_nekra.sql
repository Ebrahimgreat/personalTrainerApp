PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_weight` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`scaleWeight` numeric,
	`created_at` timestamp,
	`trendWeight` numeric,
	`user_id` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_weight`("id", "scaleWeight", "created_at", "trendWeight", "user_id") SELECT "id", "scaleWeight", "created_at", "trendWeight", "user_id" FROM `weight`;--> statement-breakpoint
DROP TABLE `weight`;--> statement-breakpoint
ALTER TABLE `__new_weight` RENAME TO `weight`;--> statement-breakpoint
PRAGMA foreign_keys=ON;