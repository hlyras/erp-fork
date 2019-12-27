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
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product_category` (
  `id` int(11) DEFAULT NULL,
  `name` text,
  `shortcut` text
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'Colete','Colete'),(2,'Peça Modular','Peça_mod'),(4,'Coldre','Coldre'),(5,'Cinto','Cinto'),(6,'Bornal','Bornal'),(7,'Bandoleira','Bandolei'),(9,'Mochila','Mochila'),(10,'Luva','Luva'),(11,'Cotoveleira e j','Cot/joel'),(12,'Refil Camelback','Ref. Cam'),(13,'Fiel','Fiel'),(14,'Farda','Farda'),(15,'Faca','Faca'),(16,'Canivete','Canivete'),(17,'Lanterna','Lanterna'),(18,'Camelback','Camelbac'),(19,'Pulseira','Pulseira'),(20,'Boné','Boné'),(21,'Chapéu','Chapéu'),(22,'Gorro','Gorro'),(23,'Capacete','Capacete'),(24,'Bússola','Bússola'),(25,'Bombacho','Bombacho'),(26,'Cadeado','Cadeado'),(27,'Alicate','Alicate'),(28,'Máscara','Máscara'),(29,'Shemagh','Shemagh'),(30,'Gandoleta','Gandolet'),(31,'Bolsa','Bolsa'),(32,'Cantil','Cantil'),(33,'Sup. Celular','Sup. Cel'),(34,'Casaco','Casaco');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
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
