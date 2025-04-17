CREATE TABLE `foodsTable` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`defaultProtein` numeric,
	`defaultServing` numeric,
	`defaultCalories` numeric,
	`defaultCarbs` numeric,
	`defaultFat` numeric,
	`user_id` integer,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
