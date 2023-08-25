CREATE TABLE `users` (
  `user_id` integer PRIMARY KEY AUTO_INCREMENT,
  `f_name` varchar(255) NOT NULL,
  `l_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `role_id` integer NOT NULL
);

CREATE TABLE `roles` (
  `role_id` integer PRIMARY KEY AUTO_INCREMENT,
  `role_name` varchar(255) NOT NULL
);

INSERT INTO `roles` (`role_id`, `role_name`) VALUES (1, 'admin');

INSERT INTO `roles` (`role_id`, `role_name`) VALUES (2, 'user');

INSERT INTO `users` (`user_id`, `f_name`, `l_name`, `email`, `password`, `role_id` ) VALUES (1, 'admin', 'admin', 'admin#gmail.com', 'admin1234', 1);

ALTER TABLE `users` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`);

