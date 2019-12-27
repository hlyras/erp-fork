-- MySQL dump 10.13  Distrib 5.7.12, for Win32 (AMD64)
--
-- Host: 127.0.0.1    Database: cms_wt_erp
-- ------------------------------------------------------
-- Server version	5.7.27-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `financial_outcome`
--

DROP TABLE IF EXISTS `financial_outcome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financial_outcome` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(20) NOT NULL,
  `category_id` int(11) NOT NULL,
  `category_name` varchar(45) NOT NULL,
  `origin_id` int(11) NOT NULL,
  `origin_name` varchar(45) NOT NULL,
  `value` decimal(7,2) NOT NULL,
  `obs` varchar(200) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome`
--

LOCK TABLES `financial_outcome` WRITE;
/*!40000 ALTER TABLE `financial_outcome` DISABLE KEYS */;
INSERT INTO `financial_outcome` VALUES (1,'2019-12-20',4,'Custo Fixo',4,'Água Fábrica',101.33,'',1,'Henrique Lyra'),(2,'2019-12-23',5,'Fisco',27,'GPS',203.44,'',1,'Henrique Lyra'),(3,'2019-12-27',1,'Funcionários',15,'Betchola',1200.00,'Salário',1,'Henrique Lyra'),(4,'2019-12-27',1,'Funcionários',15,'Betchola',200.00,'Vale passagem do mês 12',1,'Henrique Lyra');
/*!40000 ALTER TABLE `financial_outcome` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-27 18:01:42
