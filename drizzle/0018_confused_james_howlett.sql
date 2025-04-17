ALTER TABLE `exercise` RENAME COLUMN "description" TO "type";--> statement-breakpoint
ALTER TABLE `exercise` ADD `instructions` text;