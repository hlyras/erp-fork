DROP TABLE IF EXISTS `sale`;

CREATE TABLE `sale` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `sale_date` varchar(45) NOT NULL,
  `estimated_shipping_date` varchar(45) NOT NULL,
  `shipment_date` varchar(45) DEFAULT NULL,
  `customer_id` varchar(45) NOT NULL,
  `customer_name` varchar(45) NOT NULL,
  `customer_cnpj` varchar(45) NOT NULL,
  `payment_method` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `value` decimal(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)

CREATE TABLE `sale_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sale_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_info` varchar(100) NOT NULL,
  `product_amount` int NOT NULL,
  `product_price` decimal(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
)