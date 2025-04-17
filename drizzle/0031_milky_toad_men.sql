CREATE TABLE `latestActivities` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`sender_id` integer,
	`reciever_id` integer,
	FOREIGN KEY (`sender_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`reciever_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
