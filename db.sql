DROP TABLE IF EXISTS `forum`;
CREATE TABLE `forum` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category` varchar(255),
  `username` varchar(255),
  `message` varchar(255),
  `time` timestamp,
  PRIMARY KEY (`id`),
  KEY `username` (`username`),
  CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;


DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `type` (`id`, `type`) VALUES
(1,	'Farmer'),
(2,	'Broker'),
(3,	'Student'),
(4,	'Government Employee'),
(5,	'Others');

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255),
  `phone` int(11),
  `email` varchar(255) DEFAULT 'dummy@gmail.com',
  `username` varchar(255),
  `password` varchar(255),
  `type` int(11),
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `username` (`username`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`type`) REFERENCES `type` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `user` (`id`, `name`, `phone`, `email`, `username`, `password`, `type`) VALUES
(1,	'Shashank S Shetty',	2147483647,	'shashankshetty1996@gmail.com',	'shashankshetty1996',	'1234',	3);