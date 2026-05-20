CREATE TABLE `sales` (
	`id` int AUTO_INCREMENT NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`thumbnail` varchar(500),
	`discountType` enum('percentage','fixed') NOT NULL,
	`discountValue` decimal(10,2) NOT NULL,
	`applicableProducts` json NOT NULL DEFAULT (JSON_ARRAY()),
	`startDate` timestamp NOT NULL,
	`endDate` timestamp NOT NULL,
	`active` int NOT NULL DEFAULT 1,
	`featured` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `sales_id` PRIMARY KEY(`id`)
);
