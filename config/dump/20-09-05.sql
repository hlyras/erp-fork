-- Host: localhost    Database: cms_wt_erp
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `customers`
--

DROP TABLE IF EXISTS `customers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `access` varchar(3) NOT NULL DEFAULT 'ctm',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customers`
--

LOCK TABLES `customers` WRITE;
/*!40000 ALTER TABLE `customers` DISABLE KEYS */;
INSERT INTO `customers` VALUES (1,'Emilson Junior','emilsonjr@gmail.com','$2a$10$CKmc/gWnJTmRGTOu/.dM9.Y4XDlh7AL3I8/F8wxnDd8xQ02iFnKmm','ctm');
/*!40000 ALTER TABLE `customers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `abbreviation` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `abbreviation_UNIQUE` (`abbreviation`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Diretoria','DIR');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_role`
--

DROP TABLE IF EXISTS `department_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `name` varchar(45) NOT NULL,
  `abbreviation` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_role`
--

LOCK TABLES `department_role` WRITE;
/*!40000 ALTER TABLE `department_role` DISABLE KEYS */;
INSERT INTO `department_role` VALUES (5,1,'Presidente','PRE'),(6,1,'Diretor','DIR'),(7,0,'Conselheiro','CON'),(8,1,'Conselheiro','CON');
/*!40000 ALTER TABLE `department_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock`
--

DROP TABLE IF EXISTS `feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` int NOT NULL,
  `name` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `standard` int NOT NULL,
  `uom` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=193 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock`
--

LOCK TABLES `feedstock` WRITE;
/*!40000 ALTER TABLE `feedstock` DISABLE KEYS */;
INSERT INTO `feedstock` VALUES (1,1,'Córdoba Ripstop 300','pt',100,'cm'),(2,2,'Córdoba Ripstop 300','vd',100,'cm'),(3,3,'Córdoba Ripstop 300','tan',100,'cm'),(10,4,'Córdoba Ripstop 300','cvd',100,'cm'),(11,51,'Duratran','pt',100,'cm'),(12,52,'Duratran','vd',100,'cm'),(13,53,'Duratran','tan',100,'cm'),(14,101,'Aerado','pt',100,'cm'),(16,201,'Velcro 25 F (light)','pt',2500,'cm'),(17,202,'Velcro 25 M (light)','pt',2500,'cm'),(18,203,'Velcro 25 F (light)','vd',2500,'cm'),(19,251,'Velcro 40 F (light)','pt',2500,'cm'),(20,252,'Velcro 40 M (light)','pt',2500,'cm'),(21,253,'Velcro 40 F (light)','vd',2500,'cm'),(22,301,'Velcro 50 F (light)','pt',2500,'cm'),(23,302,'Velcro 50 M (light)','pt',2500,'cm'),(24,303,'Velcro 50 F (light)','vd',2500,'cm'),(25,351,'Velcro 100 F (light)','pt',2500,'cm'),(26,352,'Velcro 100 M (light)','pt',2500,'cm'),(27,353,'Velcro 100 F (light)','vd',2500,'cm'),(28,401,'CA 25','pt',5000,'cm'),(29,402,'CA 25','vd',5000,'cm'),(30,403,'CA 25','tan',5000,'cm'),(31,451,'CA 40','pt',5000,'cm'),(32,452,'CA 40','vd',5000,'cm'),(33,453,'CA 40','tan',5000,'cm'),(34,501,'CA 50','pt',5000,'cm'),(35,502,'CA 50','vd',5000,'cm'),(36,503,'CA 50','tan',5000,'cm'),(37,551,'CA 70','pt',5000,'cm'),(38,552,'CA 70','vd',5000,'cm'),(39,553,'CA 70','tan',5000,'cm'),(40,601,'CA 100','pt',5000,'cm'),(41,602,'CA 100','vd',5000,'cm'),(42,603,'CA 100','tan',5000,'cm'),(43,651,'HXL','pt',10000,'cm'),(44,701,'Gorgurão','pt',10000,'cm'),(45,702,'Gorgurão','vd',10000,'cm'),(46,703,'Gorgurão','tan',10000,'cm'),(47,751,'Zíper','pt',100,'cm'),(48,752,'Zíper','vd',100,'cm'),(49,753,'Zíper','tan',100,'cm'),(50,801,'Elástico 25','pt',2500,'cm'),(51,851,'Tic Tac 25','pt',500,'un'),(52,852,'Tic Tac 25','vd',500,'un'),(53,853,'Tic Tac 25','tan',500,'un'),(54,901,'Tic Tac 40','pt',500,'un'),(55,902,'Tic Tac 40','vd',500,'un'),(56,903,'Tic Tac 40','tan',500,'un'),(57,951,'Tic Tac 50','pt',250,'un'),(58,952,'Tic Tac 50','vd',250,'un'),(59,953,'Tic Tac 50','tan',250,'un'),(60,1001,'Botão','S/C',200,'cm'),(61,1051,'Argola 25','pt',500,'un'),(62,1052,'Argola 25','vd',500,'un'),(63,1053,'Argola 25','tan',500,'un'),(64,1101,'Argola 40','pt',500,'un'),(65,1102,'Argola 40','vd',500,'un'),(66,1103,'Argola 40','tan',500,'un'),(67,1151,'Argola 50','pt',500,'un'),(68,1152,'Argola 50','vd',500,'un'),(69,1153,'Argola 50','tan',500,'un'),(70,1201,'Meia argola 25','pt',500,'un'),(71,1202,'Meia argola 25','vd',500,'un'),(72,1203,'Meia argola 25','tan',500,'un'),(73,1251,'Meia argola 40','pt',500,'un'),(74,1252,'Meia argola 40','vd',500,'un'),(75,1253,'Meia argola 40','tan',500,'un'),(76,1301,'Meia argola 50','pt',500,'un'),(77,1302,'Meia Argola 50','vd',500,'un'),(78,1303,'Meia argola 50','tan',500,'un'),(79,1351,'Ponteira','pt',500,'un'),(80,1352,'Ponteira','vd',500,'un'),(81,1353,'Ponteira','tan',500,'un'),(82,161,'Prateado','S/C',5000,'cm'),(83,151,'Bidin','pt',2000,'cm'),(84,1501,'Regulador 25','pt',500,'un'),(85,1502,'Regulador 25','vd',500,'un'),(86,1503,'Regulador 25','tan',500,'un'),(87,1551,'Regulador 40','pt',500,'un'),(88,1552,'Regulador 40','vd',500,'un'),(89,1553,'Regulador 40','tan',500,'un'),(90,1601,'Regulador 50','pt',500,'un'),(91,1602,'Regulador 50','vd',500,'un'),(92,1603,'Regulador 50','tan',500,'un'),(93,1651,'Triângulo 25','S/C',500,'un'),(94,1652,'Triângulo 40','S/C',500,'un'),(95,1653,'Mosquetão triângulo','S/C',500,'un'),(96,1701,'Enforcador','pt',500,'un'),(97,1710,'Terminal enforcador','pt',1000,'un'),(99,103,'Aerado','tan',100,'cm'),(100,1751,'Cursor','pt',500,'un'),(101,1811,'Etiqueta tamanho P','S/C',1000,'un'),(102,1802,'Etiqueta Marca pano','S/C',1000,'un'),(103,1803,'Etiqueta Marca embor','S/C',1000,'un'),(104,1851,'Emborrachado trapézi','pt',1000,'un'),(105,1852,'Emborrachado trapézi','vd',1000,'un'),(106,1853,'Emborrachado trapézi','tan',1000,'un'),(107,204,'Velcro 25 M (light)','vd',2500,'cm'),(108,205,'Velcro 25 F (light)','tan',2500,'cm'),(109,206,'Velcro 25 M (light)','tan',2500,'cm'),(110,254,'Velcro 40 M (light)','vd',2500,'cm'),(111,255,'Velcro 40 F (light)','tan',2500,'cm'),(112,256,'Velcro 40 M (light)','tan',2500,'cm'),(113,304,'Velcro 50 M (light)','vd',2500,'cm'),(114,305,'Velcro 50 F (light)','tan',2500,'cm'),(115,306,'Velcro 50 M (light)','tan',2500,'cm'),(116,211,'Velcro 25 F (veltor)','pt',2500,'cm'),(117,212,'Velcro 25 M (veltor)','pt',2500,'cm'),(118,213,'Velcro 25 F (veltor)','vd',2500,'cm'),(119,214,'Velcro 25 M (veltor)','vd',2500,'cm'),(120,215,'Velcro 25 F (veltor)','tan',2500,'cm'),(121,216,'Velcro 25 M (veltor)','tan',2500,'cm'),(122,261,'Velcro 40 F (veltor)','pt',2500,'cm'),(123,262,'Velcro 40 M (veltor)','pt',2500,'cm'),(124,263,'Velcro 40 F (veltor)','vd',2500,'cm'),(125,264,'Velcro 40 M (veltor)','vd',2500,'cm'),(126,265,'Velcro 40 F (veltor)','tan',2500,'cm'),(127,266,'Velcro 40 M (veltor)','tan',2500,'cm'),(128,311,'Velcro 50 F (veltor)','pt',2500,'cm'),(129,312,'Velcro 50 M (veltor)','pt',2500,'cm'),(130,313,'Velcro 50 F (veltor)','vd',2500,'cm'),(131,314,'Velcro 50 M (veltor)','vd',2500,'cm'),(132,315,'Velcro 50 F (veltor)','tan',2500,'cm'),(133,316,'Velcro 50 M (veltor)','tan',2500,'cm'),(134,354,'Velcro 100 M (light)','vd',2500,'cm'),(135,355,'Velcro 100 F (light)','tan',2500,'cm'),(136,356,'Velcro 100 M (light)','tan',2500,'cm'),(137,361,'Velcro 100 F(veltor)','pt',2500,'cm'),(138,362,'Velcro 100 M(veltor)','pt',2500,'cm'),(139,363,'Velcro 100 F(veltor)','vd',2500,'cm'),(140,364,'Velcro 100 M(veltor)','vd',2500,'cm'),(141,365,'Velcro 100 F(velcro)','tan',2500,'cm'),(142,366,'Velcro 100 M(veltor)','tan',2500,'cm'),(143,23,'Cordurex','tan',10000,'cm'),(144,102,'Aerado','vd',100,'cm'),(145,811,'Elástico 80','pt',2500,'cm'),(150,1901,'Alça Bob','pt',200,'un'),(151,1902,'Alça Bob','vd',200,'un'),(152,1903,'Alça Bob','tan',200,'un'),(153,1951,'Etaflon','S/C',2000,'cm'),(154,821,'Elástico Roliço','pt',100,'cm'),(155,822,'Elástico Roliço','vd',100,'cm'),(156,823,'Elástico Roliço','tan',100,'cm'),(157,812,'Elástico 80','vd',2500,'cm'),(158,813,'Elástico 80','tan',2500,'cm'),(164,411,'Cadarço Tubular','pt',5000,'cm'),(165,461,'Cadarço Tubular','vd',5000,'cm'),(166,511,'Cadarço Tubular','tan',5000,'cm'),(167,1711,'Terminal enforcador','vd',1000,'un'),(168,1712,'Terminal enforcador','tan',1000,'un'),(169,802,'Elástico 40 branc','S/C',2500,'cm'),(170,405,'CA 25 ','mtc',5000,'cm'),(171,455,'CA 40','mtc',5000,'cm'),(172,505,'CA 50','mtc',5000,'cm'),(173,555,'CA 70','mtc',5000,'cm'),(174,2001,'Linha','pt',10,'un'),(175,2002,'Linha','vd',10,'un'),(176,2003,'Linha','tan',10,'un'),(177,803,'Elástico 40','pt',2500,'cm'),(178,1854,'Emborrachado coldre','pt',50,'un'),(179,1855,'Emborrachado coldre','vd',50,'un'),(180,1856,'Emborrachado coldre','tan',50,'un'),(181,1857,'Emborrachado botão ','pt',50,'un'),(182,1861,'Emborrachado cinto','pt',50,'un'),(183,1862,'Emborrachado cinto','vd',50,'un'),(184,1863,'Emborrachado cinto','tan',50,'un'),(185,1654,'Mosquetão gancho','S/C',500,'un'),(186,804,'Elástico 15 branco','S/C',2500,'cm'),(187,1812,'Etiqueta tamanho M','S/C',1000,'un'),(188,1813,'Etiqueta tamanho G','S/C',1000,'un'),(189,1864,'Emborrachado Robocop','pt',250,'un'),(190,713,'CD 25','tan',5000,'cm'),(191,21,'Cordurex','pt',10000,'cm'),(192,22,'Cordurex','vd',10000,'cm');
/*!40000 ALTER TABLE `feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_color`
--

DROP TABLE IF EXISTS `feedstock_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_color` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `shortcut` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_color`
--

LOCK TABLES `feedstock_color` WRITE;
/*!40000 ALTER TABLE `feedstock_color` DISABLE KEYS */;
INSERT INTO `feedstock_color` VALUES (1,'Sem cor','S/C'),(2,'Preto','pt'),(3,'Verde','vd'),(4,'Tan','tan'),(5,'Camoflado verde','cvd'),(6,'Multicam','mtc'),(7,'Marpat Digital','mpt');
/*!40000 ALTER TABLE `feedstock_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_purchase`
--

DROP TABLE IF EXISTS `feedstock_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_purchase` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  `full_date` varchar(25) NOT NULL,
  `supplier_id` int NOT NULL,
  `supplier_name` varchar(20) NOT NULL,
  `value` decimal(11,2) NOT NULL DEFAULT '0.00',
  `storage_id` int NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pedido solicitado',
  `user` varchar(45) NOT NULL,
  `confirmation_user` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_purchase`
--

LOCK TABLES `feedstock_purchase` WRITE;
/*!40000 ALTER TABLE `feedstock_purchase` DISABLE KEYS */;
INSERT INTO `feedstock_purchase` VALUES (1,'2020-03-25','25-03-2020-17:8:12',4,'Eduardo Cadarço',836.00,1,'Pedido confirmado','Daniel Anderson','Rodrigo Salazar'),(2,'2020-03-26','26-03-2020-16:53:29',3,'Adina',1190.00,1,'Pedido confirmado','Daniel Anderson','Henrique Lyra'),(3,'2020-03-27','27-03-2020-16:5:5',1,'China',1330.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(4,'2020-03-30','30-03-2020-14:17:49',4,'Eduardo Cadarço',3063.57,1,'Pedido confirmado','Daniel Anderson','Rodrigo Salazar'),(5,'2020-03-31','31-03-2020-15:40:57',5,'Rogério Emborrachado',2104.70,1,'Pedido confirmado','Daniel Anderson','Henrique Lyra'),(6,'2020-04-06','06-04-2020-13:7:34',8,'Madumac',1272.50,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(7,'2020-04-08','08-04-2020-16:19:53',3,'Adina',2725.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(8,'2020-04-09','09-04-2020-17:35:42',4,'Eduardo Cadarço',2675.50,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(9,'2020-04-14','14-04-2020-10:34:37',2,'Luã',445.50,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(10,'2020-04-16','16-04-2020-13:8:15',1,'China',360.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(11,'2020-04-16','16-04-2020-17:40:48',4,'Eduardo Cadarço',1381.50,1,'Pedido cancelado','Henrique Lyra',NULL),(12,'2020-04-16','16-04-2020-17:42:23',4,'Eduardo Cadarço',1437.50,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(13,'2020-04-20','20-04-2020-15:25:4',8,'Madumac',1680.00,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(14,'2020-04-24','24-04-2020-11:27:39',8,'Madumac',1410.75,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(15,'2020-04-24','24-04-2020-13:16:40',3,'Adina',4610.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(16,'2020-04-27','27-04-2020-18:12:59',1,'China',10656.94,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(17,'2020-04-27','27-04-2020-18:17:35',4,'Eduardo Cadarço',443.28,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(18,'2020-04-29','29-04-2020-9:14:10',2,'Luã',433.68,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(19,'2020-05-05','05-05-2020-14:59:49',1,'China',300.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(20,'2020-05-15','15-05-2020-14:57:34',2,'Luã',7266.00,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(21,'2020-07-30','30-07-2020-22:44:17',2,'Luã',2402.50,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra');
/*!40000 ALTER TABLE `feedstock_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_purchase_feedstock`
--

DROP TABLE IF EXISTS `feedstock_purchase_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_purchase_feedstock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_id` int NOT NULL,
  `feedstock_id` int NOT NULL,
  `feedstock_info` varchar(60) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `feedstock_uom` varchar(2) NOT NULL,
  `feedstock_value` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_feedstock_purchase` (`feedstock_id`),
  CONSTRAINT `fk_feedstock_purchase` FOREIGN KEY (`feedstock_id`) REFERENCES `feedstock` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_purchase_feedstock`
--

LOCK TABLES `feedstock_purchase_feedstock` WRITE;
/*!40000 ALTER TABLE `feedstock_purchase_feedstock` DISABLE KEYS */;
INSERT INTO `feedstock_purchase_feedstock` VALUES (1,1,28,'401 | CA 25 | pt',135000.00,'cm',0.40),(2,1,31,'451 | CA 40 | pt',40000.00,'cm',0.74),(3,2,144,'102 | Aerado | vd',10000.00,'cm',11.90),(4,3,51,'851 | Tic Tac 25 | pt',1500.00,'un',0.15),(5,3,57,'951 | Tic Tac 50 | pt',500.00,'un',0.45),(6,3,70,'1201 | Meia argola 25 | pt',1000.00,'un',0.07),(7,3,97,'1710 | Terminal enforcador | pt',1000.00,'un',0.23),(8,3,150,'1901 | Alça Bob | pt',1000.00,'un',0.58),(9,4,28,'401 | CA 25 | pt',220000.00,'cm',0.40),(10,4,29,'402 | CA 25 | vd',80000.00,'cm',0.51),(11,4,30,'403 | CA 25 | tan',80000.00,'cm',0.51),(12,4,31,'451 | CA 40 | pt',35000.00,'cm',0.74),(13,4,32,'452 | CA 40 | vd',10000.00,'cm',0.82),(14,4,34,'501 | CA 50 | pt',25000.00,'cm',0.93),(15,4,35,'502 | CA 50 | vd',5000.00,'cm',1.02),(16,4,37,'551 | CA 70 | pt',30000.00,'cm',1.29),(17,4,39,'553 | CA 70 | tan',24900.00,'cm',1.43),(18,5,178,'1854 | Emborrachado coldre | pt',405.00,'un',1.10),(19,5,179,'1855 | Emborrachado coldre | vd',208.00,'un',1.10),(20,5,180,'1856 | Emborrachado coldre | tan',204.00,'un',1.10),(21,5,181,'1857 | Emborrachado botão | pt',1005.00,'un',1.20),(22,6,43,'651 | HXL | pt',500000.00,'cm',0.18),(23,6,45,'702 | Gorgurão | vd',200000.00,'cm',0.17),(24,6,186,'804 | Elástico 15 branco | S/C',12500.00,'cm',0.26),(25,7,116,'211 | Velcro 25 F (veltor) | pt',50000.00,'cm',1.03),(26,7,128,'311 | Velcro 50 F (veltor) | pt',50000.00,'cm',2.02),(27,7,130,'313 | Velcro 50 F (veltor) | vd',50000.00,'cm',2.40),(28,8,28,'401 | CA 25 | pt',270000.00,'cm',0.40),(29,8,31,'451 | CA 40 | pt',35000.00,'cm',0.74),(30,8,32,'452 | CA 40 | vd',30000.00,'cm',0.82),(31,8,33,'453 | CA 40 | tan',30000.00,'cm',0.82),(32,8,34,'501 | CA 50 | pt',25000.00,'cm',0.93),(33,8,35,'502 | CA 50 | vd',30000.00,'cm',1.02),(34,8,36,'503 | CA 50 | tan',30000.00,'cm',1.02),(35,9,100,'1751 | Cursor | pt',1350.00,'un',0.33),(36,10,87,'1551 | Regulador 40 | pt',6000.00,'un',0.06),(37,11,28,'401 | CA 25 | pt',255000.00,'cm',0.40),(38,11,31,'451 | CA 40 | pt',30000.00,'cm',0.74),(39,11,34,'501 | CA 50 | pt',15000.00,'cm',0.93),(40,12,28,'401 | CA 25 | pt',255000.00,'cm',0.40),(41,12,31,'451 | CA 40 | pt',25000.00,'cm',0.74),(42,12,34,'501 | CA 50 | pt',25000.00,'cm',0.93),(43,13,14,'101 | Aerado | pt',10000.00,'cm',12.95),(44,13,16,'201 | Velcro 25 F (light) | pt',25000.00,'cm',0.33),(45,13,17,'202 | Velcro 25 M (light) | pt',25000.00,'cm',0.33),(46,13,47,'751 | Zíper | pt',40000.00,'cm',0.55),(47,14,100,'1751 | Cursor | pt',4275.00,'un',0.33),(48,15,16,'201 | Velcro 25 F (light) | pt',200000.00,'cm',1.03),(49,15,22,'301 | Velcro 50 F (light) | pt',200000.00,'cm',0.77),(50,15,128,'311 | Velcro 50 F (veltor) | pt',50000.00,'cm',2.02),(51,16,52,'852 | Tic Tac 25 | vd',4500.00,'un',0.27),(52,16,53,'853 | Tic Tac 25 | tan',4500.00,'un',0.27),(53,16,71,'1202 | Meia argola 25 | vd',4000.00,'un',0.11),(54,16,72,'1203 | Meia argola 25 | tan',4000.00,'un',0.11),(55,16,80,'1352 | Ponteira | vd',4000.00,'un',0.28),(56,16,81,'1353 | Ponteira | tan',4000.00,'un',0.28),(57,16,85,'1502 | Regulador 25 | vd',4000.00,'un',0.07),(58,16,86,'1503 | Regulador 25 | tan',4000.00,'un',0.07),(59,16,90,'1601 | Regulador 50 | pt',2000.00,'un',0.22),(60,16,91,'1602 | Regulador 50 | vd',2508.00,'un',0.31),(61,16,92,'1603 | Regulador 50 | tan',2606.00,'un',0.31),(62,16,151,'1902 | Alça Bob | vd',1940.00,'un',0.64),(63,16,152,'1903 | Alça Bob | tan',2000.00,'un',0.64),(64,17,30,'403 | CA 25 | tan',60000.00,'cm',0.51),(65,17,190,'713 | CD 25 | tan',52800.00,'cm',0.26),(66,18,99,'103 | Aerado | tan',2720.00,'cm',11.90),(67,18,47,'751 | Zíper | pt',20000.00,'cm',0.55),(68,19,51,'851 | Tic Tac 25 | pt',2000.00,'un',0.15),(69,20,1,'1 | Córdoba Ripstop 300 | pt',10000.00,'cm',17.50),(70,20,143,'23 | Cordurex | tan',10000.00,'cm',13.00),(71,20,14,'101 | Aerado | pt',10000.00,'cm',11.90),(72,20,108,'205 | Velcro 25 F (light) | tan',25000.00,'cm',1.08),(73,20,29,'402 | CA 25 | vd',50000.00,'cm',1.00),(74,20,30,'403 | CA 25 | tan',50000.00,'cm',1.00),(75,20,33,'453 | CA 40 | tan',30000.00,'cm',1.00),(76,20,34,'501 | CA 50 | pt',50000.00,'cm',1.00),(77,20,35,'502 | CA 50 | vd',50000.00,'cm',1.00),(78,20,36,'503 | CA 50 | tan',10000.00,'cm',1.00),(79,20,60,'1001 | Botão | S/C',2000.00,'cm',0.30),(80,20,174,'2001 | Linha | pt',30.00,'un',5.00),(81,20,175,'2002 | Linha | vd',30.00,'un',5.00),(82,20,176,'2003 | Linha | tan',10.00,'un',5.00),(83,21,143,'23 | Cordurex | tan',12500.00,'cm',16.50),(84,21,13,'53 | Duratran | tan',5000.00,'cm',6.80);
/*!40000 ALTER TABLE `feedstock_purchase_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_regress`
--

DROP TABLE IF EXISTS `feedstock_regress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_regress` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `full_date` varchar(45) NOT NULL,
  `storage_id` int NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'Pedido solicitado',
  `user` varchar(45) NOT NULL,
  `confirmation_user` varchar(45) DEFAULT NULL,
  `obs` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=64 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_regress`
--

LOCK TABLES `feedstock_regress` WRITE;
/*!40000 ALTER TABLE `feedstock_regress` DISABLE KEYS */;
INSERT INTO `feedstock_regress` VALUES (1,'2020-04-02','02-04-2020-9:58:7',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Completar estoque Mínimo'),(2,'2020-04-02','02-04-2020-14:38:21',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(3,'2020-04-02','02-04-2020-14:38:53',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(4,'2020-04-02','02-04-2020-14:40:44',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Completar estoque Mínimo'),(5,'2020-04-03','03-04-2020-13:31:21',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(6,'2020-04-03','03-04-2020-16:6:35',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Acumulo por pedido de produção'),(7,'2020-04-06','06-04-2020-10:7:32',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(8,'2020-04-06','06-04-2020-10:33:19',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(9,'2020-04-06','06-04-2020-10:59:28',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(10,'2020-04-06','06-04-2020-11:2:40',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(11,'2020-04-06','06-04-2020-11:5:34',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(12,'2020-04-06','06-04-2020-11:11:45',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(13,'2020-04-06','06-04-2020-14:52:3',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(14,'2020-04-06','06-04-2020-15:36:2',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(15,'2020-04-06','06-04-2020-15:49:24',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(16,'2020-04-06','06-04-2020-15:55:17',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(17,'2020-04-07','07-04-2020-9:59:29',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(18,'2020-04-07','07-04-2020-10:2:56',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(19,'2020-04-07','07-04-2020-14:43:59',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(20,'2020-04-07','07-04-2020-14:44:53',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(21,'2020-04-08','08-04-2020-8:58:51',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(22,'2020-04-08','08-04-2020-9:0:20',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(23,'2020-04-08','08-04-2020-9:3:32',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(24,'2020-04-08','08-04-2020-9:10:32',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(25,'2020-04-08','08-04-2020-14:37:27',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(26,'2020-04-08','08-04-2020-14:39:17',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(27,'2020-04-08','08-04-2020-16:15:31',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(28,'2020-04-08','08-04-2020-17:55:11',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(29,'2020-04-09','09-04-2020-17:37:24',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(30,'2020-04-13','13-04-2020-9:7:5',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(31,'2020-04-13','13-04-2020-10:57:11',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(32,'2020-04-14','14-04-2020-9:40:41',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(33,'2020-04-14','14-04-2020-10:51:56',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(34,'2020-04-15','15-04-2020-9:43:29',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(35,'2020-04-15','15-04-2020-11:3:37',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(36,'2020-04-15','15-04-2020-11:34:20',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(37,'2020-04-15','15-04-2020-14:16:58',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(38,'2020-04-15','15-04-2020-14:25:15',1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar','Inserção manual em estoque'),(39,'2020-04-16','16-04-2020-10:6:46',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(40,'2020-04-16','16-04-2020-10:17:12',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(41,'2020-04-16','16-04-2020-15:6:36',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(42,'2020-04-16','16-04-2020-15:53:47',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(43,'2020-04-16','16-04-2020-17:44:54',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(44,'2020-04-17','17-04-2020-17:52:19',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(45,'2020-04-22','22-04-2020-12:1:44',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(46,'2020-04-22','22-04-2020-12:14:18',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(47,'2020-04-23','23-04-2020-9:53:0',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(48,'2020-04-23','23-04-2020-15:6:39',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(49,'2020-04-27','27-04-2020-10:29:49',1,'Pedido solicitado','Danrlei Henrique',NULL,'Acumulo por pedido de produção'),(50,'2020-04-28','28-04-2020-16:12:4',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(51,'2020-04-30','30-04-2020-10:44:18',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(52,'2020-05-04','04-05-2020-9:34:38',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(53,'2020-05-04','04-05-2020-9:49:0',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(54,'2020-05-05','05-05-2020-8:38:57',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Acumulo por pedido avulso'),(55,'2020-05-05','05-05-2020-9:57:36',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(56,'2020-05-05','05-05-2020-11:33:31',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(57,'2020-05-05','05-05-2020-11:41:8',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(58,'2020-05-05','05-05-2020-17:22:16',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(59,'2020-05-06','06-05-2020-10:36:30',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(60,'2020-05-06','06-05-2020-10:37:13',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(61,'2020-05-06','06-05-2020-15:39:52',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Inserção manual em estoque'),(62,'2020-05-18','18-05-2020-8:53:21',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção'),(63,'2020-05-18','18-05-2020-10:0:56',1,'Pedido confirmado','Danrlei Henrique','Rodrigo Salazar','Acumulo por pedido de produção');
/*!40000 ALTER TABLE `feedstock_regress` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_regress_feedstock`
--

DROP TABLE IF EXISTS `feedstock_regress_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_regress_feedstock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `regress_id` int NOT NULL,
  `feedstock_id` int NOT NULL,
  `feedstock_info` varchar(45) NOT NULL,
  `feedstock_uom` varchar(2) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=105 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_regress_feedstock`
--

LOCK TABLES `feedstock_regress_feedstock` WRITE;
/*!40000 ALTER TABLE `feedstock_regress_feedstock` DISABLE KEYS */;
INSERT INTO `feedstock_regress_feedstock` VALUES (1,1,79,'Ponteira pt','un',1318.00),(2,1,80,'Ponteira vd','un',1078.00),(3,1,81,'Ponteira tan','un',829.00),(4,2,43,'HXL pt','cm',180000.00),(5,3,44,'Gorgurão pt','cm',110000.00),(6,3,45,'Gorgurão vd','cm',60000.00),(7,4,46,'Gorgurão tan','cm',110000.00),(8,5,85,'Regulador 25 vd','un',45.00),(9,6,28,'CA 25 pt','cm',20000.00),(10,7,95,'Mosquetão triângulo S/C','un',1438.00),(11,7,185,'Mosquetão gancho S/C','un',1090.00),(12,8,182,'Emborrachado cinto pt','un',587.00),(13,9,33,'CA 40 tan','cm',5000.00),(14,10,166,'Cadarço Tubular tan','cm',15000.00),(15,11,166,'Cadarço Tubular tan','cm',5000.00),(16,12,169,'Elástico 40 branc S/C','cm',10000.00),(17,13,128,'Velcro 50 F (veltor) pt','cm',5000.00),(18,14,104,'Emborrachado trapézi pt','un',43.00),(19,15,128,'Velcro 50 F (veltor) pt','cm',2500.00),(20,15,130,'Velcro 50 F (veltor) vd','cm',2500.00),(21,16,130,'Velcro 50 F (veltor) vd','cm',2500.00),(22,17,24,'Velcro 50 F (light) vd','cm',10000.00),(23,18,130,'Velcro 50 F (veltor) vd','cm',10000.00),(24,19,114,'Velcro 50 F (light) tan','cm',2500.00),(25,20,36,'CA 50 tan','cm',5000.00),(26,21,128,'Velcro 50 F (veltor) pt','cm',12500.00),(27,21,130,'Velcro 50 F (veltor) vd','cm',12500.00),(28,22,14,'Aerado pt','cm',400000.00),(29,22,144,'Aerado vd','cm',400000.00),(30,23,128,'Velcro 50 F (veltor) pt','cm',2500.00),(31,24,47,'Zíper pt','cm',2600.00),(32,24,48,'Zíper vd','cm',14500.00),(33,24,49,'Zíper tan','cm',2200.00),(34,25,34,'CA 50 pt','cm',5000.00),(35,25,100,'Cursor pt','un',200.00),(36,26,128,'Velcro 50 F (veltor) pt','cm',12500.00),(37,27,16,'Velcro 25 F (light) pt','cm',7500.00),(38,27,116,'Velcro 25 F (veltor) pt','cm',5000.00),(39,27,129,'Velcro 50 M (veltor) pt','cm',2500.00),(40,27,28,'CA 25 pt','cm',20000.00),(41,27,34,'CA 50 pt','cm',5000.00),(42,27,47,'Zíper pt','cm',2800.00),(43,28,116,'Velcro 25 F (veltor) pt','cm',2500.00),(44,28,129,'Velcro 50 M (veltor) pt','cm',2500.00),(45,29,16,'Velcro 25 F (light) pt','cm',5000.00),(46,29,24,'Velcro 50 F (light) vd','cm',2500.00),(47,29,113,'Velcro 50 M (light) vd','cm',2500.00),(48,29,28,'CA 25 pt','cm',40000.00),(49,30,116,'Velcro 25 F (veltor) pt','cm',2500.00),(50,31,100,'Cursor pt','un',208.00),(51,32,128,'Velcro 50 F (veltor) pt','cm',2500.00),(52,32,129,'Velcro 50 M (veltor) pt','cm',2500.00),(53,33,52,'Tic Tac 25 vd','un',132.00),(54,34,47,'Zíper pt','cm',2800.00),(55,34,100,'Cursor pt','un',96.00),(56,35,118,'Velcro 25 F (veltor) vd','cm',5000.00),(57,36,39,'CA 70 tan','cm',5000.00),(58,36,145,'Elástico 80 pt','cm',2500.00),(59,37,47,'Zíper pt','cm',13300.00),(60,38,48,'Zíper vd','cm',2000.00),(61,39,169,'Elástico 40 branc S/C','cm',70000.00),(62,40,87,'Regulador 40 pt','un',348.00),(63,41,189,'Emborrachado Robocop pt','un',500.00),(64,42,31,'CA 40 pt','cm',10000.00),(65,43,30,'CA 25 tan','cm',10000.00),(66,43,34,'CA 50 pt','cm',10000.00),(67,44,18,'Velcro 25 F (light) vd','cm',7500.00),(68,44,118,'Velcro 25 F (veltor) vd','cm',5000.00),(69,44,24,'Velcro 50 F (light) vd','cm',2500.00),(70,44,130,'Velcro 50 F (veltor) vd','cm',7500.00),(71,44,131,'Velcro 50 M (veltor) vd','cm',5000.00),(72,44,29,'CA 25 vd','cm',20000.00),(73,45,45,'Gorgurão vd','cm',50000.00),(74,46,86,'Regulador 25 tan','un',733.00),(75,47,22,'Velcro 50 F (light) pt','cm',2500.00),(76,48,22,'Velcro 50 F (light) pt','cm',2500.00),(77,49,128,'Velcro 50 F (veltor) pt','cm',2500.00),(78,49,129,'Velcro 50 M (veltor) pt','cm',2500.00),(79,50,108,'Velcro 25 F (light) tan','cm',5000.00),(80,51,11,'Duratran pt','cm',500.00),(81,52,29,'CA 25 vd','cm',5000.00),(82,53,114,'Velcro 50 F (light) tan','cm',5000.00),(83,54,29,'CA 25 vd','cm',5000.00),(84,55,29,'CA 25 vd','cm',15000.00),(85,56,113,'Velcro 50 M (light) vd','cm',2500.00),(86,56,131,'Velcro 50 M (veltor) vd','cm',2500.00),(87,57,144,'Aerado vd','cm',6800.00),(88,57,29,'CA 25 vd','cm',5000.00),(89,58,114,'Velcro 50 F (light) tan','cm',5000.00),(90,58,36,'CA 50 tan','cm',5000.00),(91,59,11,'Duratran pt','cm',1000.00),(92,59,118,'Velcro 25 F (veltor) vd','cm',2500.00),(93,59,114,'Velcro 50 F (light) tan','cm',7500.00),(94,59,130,'Velcro 50 F (veltor) vd','cm',5000.00),(95,59,29,'CA 25 vd','cm',20000.00),(96,59,30,'CA 25 tan','cm',20000.00),(97,60,12,'Duratran vd','cm',1000.00),(98,61,31,'CA 40 pt','cm',5000.00),(99,61,95,'Mosquetão triângulo S/C','un',180.00),(100,61,185,'Mosquetão gancho S/C','un',180.00),(101,62,116,'Velcro 25 F (veltor) pt','cm',7500.00),(102,62,30,'CA 25 tan','cm',10000.00),(103,62,33,'CA 40 tan','cm',5000.00),(104,63,130,'Velcro 50 F (veltor) vd','cm',10000.00);
/*!40000 ALTER TABLE `feedstock_regress_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_request`
--

DROP TABLE IF EXISTS `feedstock_request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_request` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `full_date` varchar(45) NOT NULL,
  `storage_id` int NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'Pedido solicitado',
  `user` varchar(45) NOT NULL,
  `confirmation_user` varchar(45) DEFAULT NULL,
  `obs` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=272 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_request`
--

LOCK TABLES `feedstock_request` WRITE;
/*!40000 ALTER TABLE `feedstock_request` DISABLE KEYS */;
INSERT INTO `feedstock_request` VALUES (1,'2020-03-26','26-03-2020-11:5:35',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(2,'2020-03-26','26-03-2020-17:4:3',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(3,'2020-03-26','26-03-2020-17:45:57',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(4,'2020-03-26','26-03-2020-17:56:42',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(5,'2020-03-27','27-03-2020-18:41:51',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(6,'2020-03-30','30-03-2020-9:49:26',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(7,'2020-03-30','30-03-2020-13:7:20',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(8,'2020-03-31','31-03-2020-9:22:37',1,'Pedido confirmado','Henrique Lyra','Daniel Luís','Produção não planejada'),(9,'2020-03-31','31-03-2020-13:12:7',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(10,'2020-03-31','31-03-2020-14:21:32',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(11,'2020-03-31','31-03-2020-16:17:9',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Completar estoque Mínimo'),(12,'2020-04-01','01-04-2020-12:28:40',1,'Pedido cancelado','Daniel Anderson',NULL,'Produção não planejada'),(13,'2020-04-01','01-04-2020-15:46:36',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(14,'2020-04-01','01-04-2020-16:7:49',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(15,'2020-04-01','01-04-2020-16:23:39',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(16,'2020-04-01','01-04-2020-17:41:24',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(17,'2020-04-02','02-04-2020-9:27:0',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(18,'2020-04-02','02-04-2020-10:3:34',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(19,'2020-04-02','02-04-2020-10:18:0',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(20,'2020-04-02','02-04-2020-10:47:45',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(21,'2020-04-02','02-04-2020-10:48:22',1,'Pedido cancelado','Caio César',NULL,'Insuficiente para produção'),(22,'2020-04-02','02-04-2020-10:49:14',1,'Pedido cancelado','Caio César',NULL,'Insuficiente para produção'),(23,'2020-04-02','02-04-2020-10:49:40',1,'Pedido cancelado','Caio César',NULL,'Insuficiente para produção'),(24,'2020-04-02','02-04-2020-10:56:16',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(25,'2020-04-02','02-04-2020-13:18:35',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(26,'2020-04-02','02-04-2020-13:54:19',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(27,'2020-04-03','03-04-2020-10:2:7',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(28,'2020-04-03','03-04-2020-10:31:31',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(29,'2020-04-03','03-04-2020-10:40:57',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(30,'2020-04-03','03-04-2020-11:30:51',1,'Pedido confirmado','Daniel Anderson','Henrique Lyra','Produção não planejada'),(31,'2020-04-03','03-04-2020-13:13:46',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(32,'2020-04-03','03-04-2020-13:34:53',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(33,'2020-04-03','03-04-2020-16:3:58',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(34,'2020-04-06','06-04-2020-8:42:58',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Produção não planejada'),(35,'2020-04-06','06-04-2020-8:44:47',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(36,'2020-04-06','06-04-2020-11:10:44',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(37,'2020-04-06','06-04-2020-13:35:55',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(38,'2020-04-06','06-04-2020-14:52:43',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(39,'2020-04-06','06-04-2020-14:57:38',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(40,'2020-04-06','06-04-2020-15:36:35',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(41,'2020-04-06','06-04-2020-15:37:3',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(42,'2020-04-06','06-04-2020-15:39:17',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(43,'2020-04-06','06-04-2020-15:49:49',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(44,'2020-04-06','06-04-2020-15:55:47',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(45,'2020-04-07','07-04-2020-8:57:51',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(46,'2020-04-07','07-04-2020-10:2:30',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(47,'2020-04-07','07-04-2020-11:9:0',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(48,'2020-04-07','07-04-2020-11:26:55',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(49,'2020-04-07','07-04-2020-11:29:52',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(50,'2020-04-07','07-04-2020-11:32:58',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(51,'2020-04-07','07-04-2020-11:49:39',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(52,'2020-04-07','07-04-2020-13:9:28',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(53,'2020-04-07','07-04-2020-15:9:54',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(54,'2020-04-07','07-04-2020-15:11:0',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(55,'2020-04-07','07-04-2020-15:45:30',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(56,'2020-04-07','07-04-2020-15:50:43',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(57,'2020-04-07','07-04-2020-16:14:20',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(58,'2020-04-07','07-04-2020-16:17:0',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(59,'2020-04-07','07-04-2020-17:16:8',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(60,'2020-04-08','08-04-2020-8:39:35',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(61,'2020-04-08','08-04-2020-9:37:24',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(62,'2020-04-08','08-04-2020-9:52:47',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(63,'2020-04-08','08-04-2020-10:13:13',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(64,'2020-04-08','08-04-2020-10:17:41',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(65,'2020-04-08','08-04-2020-10:34:34',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(66,'2020-04-08','08-04-2020-10:53:5',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(67,'2020-04-08','08-04-2020-10:53:50',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(68,'2020-04-08','08-04-2020-11:15:51',1,'Pedido confirmado','Henrique Lyra','Caio César','Insuficiente para produção'),(69,'2020-04-08','08-04-2020-11:21:12',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(70,'2020-04-08','08-04-2020-13:21:29',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(71,'2020-04-08','08-04-2020-14:20:26',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(72,'2020-04-08','08-04-2020-15:14:56',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Insuficiente para produção'),(73,'2020-04-08','08-04-2020-16:7:1',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(74,'2020-04-08','08-04-2020-16:23:37',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(75,'2020-04-08','08-04-2020-16:24:25',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(76,'2020-04-08','08-04-2020-16:47:20',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(77,'2020-04-08','08-04-2020-17:16:14',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(78,'2020-04-08','08-04-2020-17:54:9',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(79,'2020-04-09','09-04-2020-10:28:3',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(80,'2020-04-09','09-04-2020-10:57:45',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(81,'2020-04-09','09-04-2020-13:6:33',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(82,'2020-04-09','09-04-2020-13:7:56',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(83,'2020-04-09','09-04-2020-14:9:5',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(84,'2020-04-09','09-04-2020-15:17:33',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(85,'2020-04-09','09-04-2020-15:24:19',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(86,'2020-04-13','13-04-2020-8:33:47',1,'Pedido confirmado','Caio César','Danrlei Henrique','Insuficiente para produção'),(87,'2020-04-13','13-04-2020-8:33:53',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(88,'2020-04-13','13-04-2020-8:35:50',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(89,'2020-04-13','13-04-2020-9:6:19',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(90,'2020-04-13','13-04-2020-9:39:42',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(91,'2020-04-13','13-04-2020-9:56:36',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(92,'2020-04-13','13-04-2020-10:40:0',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(93,'2020-04-13','13-04-2020-14:37:36',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(94,'2020-04-13','13-04-2020-15:29:50',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(95,'2020-04-13','13-04-2020-15:43:19',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(96,'2020-04-14','14-04-2020-8:43:24',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(97,'2020-04-14','14-04-2020-9:40:3',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(98,'2020-04-14','14-04-2020-9:49:33',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(99,'2020-04-14','14-04-2020-10:16:21',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(100,'2020-04-14','14-04-2020-14:57:0',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Produção não planejada'),(101,'2020-04-14','14-04-2020-15:1:42',1,'Pedido confirmado','Caio César','Danrlei Henrique','Insuficiente para produção'),(102,'2020-04-14','14-04-2020-15:3:33',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(103,'2020-04-14','14-04-2020-16:59:29',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(104,'2020-04-14','14-04-2020-17:59:0',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(105,'2020-04-15','15-04-2020-8:16:29',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Insuficiente para produção'),(106,'2020-04-15','15-04-2020-8:17:13',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Insuficiente para produção'),(107,'2020-04-15','15-04-2020-9:17:56',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(108,'2020-04-15','15-04-2020-11:1:22',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(109,'2020-04-15','15-04-2020-11:32:40',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(110,'2020-04-15','15-04-2020-11:35:35',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(111,'2020-04-15','15-04-2020-13:34:2',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(112,'2020-04-15','15-04-2020-14:17:54',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(113,'2020-04-15','15-04-2020-14:24:59',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(114,'2020-04-15','15-04-2020-16:5:10',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(115,'2020-04-15','15-04-2020-16:25:47',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(116,'2020-04-15','15-04-2020-17:6:22',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(117,'2020-04-16','16-04-2020-8:34:16',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(118,'2020-04-16','16-04-2020-10:47:17',1,'Pedido cancelado','Danrlei Henrique',NULL,'Completar estoque Mínimo'),(119,'2020-04-16','16-04-2020-13:4:0',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(120,'2020-04-16','16-04-2020-13:6:50',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Produção não planejada'),(121,'2020-04-16','16-04-2020-14:56:59',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(122,'2020-04-16','16-04-2020-18:34:30',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(123,'2020-04-16','16-04-2020-16:45:57',1,'Pedido confirmado','Henrique Lyra','Daniel Luís','Produção não planejada'),(124,'2020-04-17','17-04-2020-8:51:37',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(125,'2020-04-17','17-04-2020-14:0:41',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(126,'2020-04-17','17-04-2020-15:7:29',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(127,'2020-04-17','17-04-2020-15:59:31',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(128,'2020-04-17','17-04-2020-17:53:59',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(129,'2020-04-20','20-04-2020-10:44:47',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(130,'2020-04-20','20-04-2020-15:27:9',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(131,'2020-04-20','20-04-2020-17:9:54',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(132,'2020-04-20','20-04-2020-17:44:8',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Insuficiente para produção'),(133,'2020-04-20','20-04-2020-17:57:51',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(134,'2020-04-22','22-04-2020-9:16:56',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(135,'2020-04-22','22-04-2020-13:8:30',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(136,'2020-04-22','22-04-2020-14:49:58',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(137,'2020-04-22','22-04-2020-16:23:4',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(138,'2020-04-22','22-04-2020-17:17:8',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(139,'2020-04-22','22-04-2020-18:52:55',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(140,'2020-04-23','23-04-2020-8:29:45',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(141,'2020-04-23','23-04-2020-9:6:25',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(142,'2020-04-23','23-04-2020-17:21:52',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(143,'2020-04-23','23-04-2020-17:44:48',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(144,'2020-04-24','24-04-2020-8:20:25',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(145,'2020-04-24','24-04-2020-8:30:48',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(146,'2020-04-24','24-04-2020-9:52:47',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(147,'2020-04-24','24-04-2020-10:35:45',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(148,'2020-04-24','24-04-2020-10:49:12',1,'Pedido cancelado','Henrique Lyra',NULL,'Produção não planejada'),(149,'2020-04-24','24-04-2020-10:53:54',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(150,'2020-04-24','24-04-2020-13:55:29',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(151,'2020-04-24','24-04-2020-14:29:23',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(152,'2020-04-24','24-04-2020-15:51:16',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(153,'2020-04-24','24-04-2020-16:5:25',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(154,'2020-04-24','24-04-2020-17:10:49',1,'Pedido confirmado','Daniel Luís','Daniel Luís','Insuficiente para produção'),(155,'2020-04-24','24-04-2020-17:35:57',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(156,'2020-04-27','27-04-2020-9:12:28',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(157,'2020-04-27','27-04-2020-9:25:1',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(158,'2020-04-27','27-04-2020-9:29:35',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Produção não planejada'),(159,'2020-04-27','27-04-2020-10:33:53',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(160,'2020-04-27','27-04-2020-15:17:53',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(161,'2020-04-27','27-04-2020-16:57:34',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(162,'2020-04-28','28-04-2020-8:53:8',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(163,'2020-04-28','28-04-2020-13:21:19',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(164,'2020-04-28','28-04-2020-14:37:18',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(165,'2020-04-29','29-04-2020-8:42:41',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(166,'2020-04-29','29-04-2020-8:43:45',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(167,'2020-04-29','29-04-2020-10:12:19',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Completar estoque Mínimo'),(168,'2020-04-29','29-04-2020-11:8:41',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(169,'2020-04-29','29-04-2020-11:56:14',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(170,'2020-04-29','29-04-2020-14:34:47',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Insuficiente para produção'),(171,'2020-04-29','29-04-2020-14:58:30',1,'Pedido cancelado','Danrlei Henrique',NULL,'Insuficiente para produção'),(172,'2020-04-29','29-04-2020-14:59:0',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(173,'2020-04-29','29-04-2020-15:22:10',1,'Pedido solicitado','Danrlei Henrique',NULL,'Completar estoque Mínimo'),(174,'2020-04-30','30-04-2020-8:34:51',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(175,'2020-04-30','30-04-2020-9:31:29',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(176,'2020-04-30','30-04-2020-9:34:50',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(177,'2020-04-30','30-04-2020-10:34:53',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(178,'2020-04-30','30-04-2020-10:43:0',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(179,'2020-04-30','30-04-2020-10:51:46',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(180,'2020-04-30','30-04-2020-11:8:59',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(181,'2020-04-30','30-04-2020-13:52:2',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(182,'2020-04-30','30-04-2020-16:29:44',1,'Pedido solicitado','Danrlei Henrique',NULL,'Completar estoque Mínimo'),(183,'2020-05-04','04-05-2020-8:21:26',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(184,'2020-05-04','04-05-2020-9:20:45',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(185,'2020-05-04','04-05-2020-10:38:1',1,'Pedido confirmado','Caio César','Caio César','Insuficiente para produção'),(186,'2020-05-04','04-05-2020-14:16:57',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Insuficiente para produção'),(187,'2020-05-04','04-05-2020-16:3:59',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(188,'2020-05-04','04-05-2020-17:32:41',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(189,'2020-05-04','04-05-2020-17:36:42',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Completar estoque Mínimo'),(190,'2020-05-05','05-05-2020-8:33:28',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(191,'2020-05-05','05-05-2020-8:48:16',1,'Pedido cancelado','Henrique Lyra',NULL,'Produção não planejada'),(192,'2020-05-05','05-05-2020-8:50:18',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(193,'2020-05-05','05-05-2020-10:0:1',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(194,'2020-05-05','05-05-2020-10:6:29',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(195,'2020-05-05','05-05-2020-10:23:35',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(196,'2020-05-05','05-05-2020-11:32:0',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(197,'2020-05-05','05-05-2020-11:32:11',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(198,'2020-05-05','05-05-2020-13:46:33',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Insuficiente para produção'),(199,'2020-05-06','06-05-2020-8:37:45',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Insuficiente para produção'),(200,'2020-05-06','06-05-2020-9:9:19',1,'Pedido confirmado','Henrique Lyra','Danrlei Henrique','Produção não planejada'),(201,'2020-05-07','07-05-2020-8:43:22',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(202,'2020-05-07','07-05-2020-9:12:29',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(203,'2020-05-07','07-05-2020-9:14:32',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(204,'2020-05-07','07-05-2020-10:19:14',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(205,'2020-05-07','07-05-2020-11:36:59',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(206,'2020-05-07','07-05-2020-13:9:55',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(207,'2020-05-14','14-05-2020-15:42:28',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Insuficiente para produção'),(208,'2020-05-14','14-05-2020-15:43:42',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(209,'2020-05-14','14-05-2020-16:36:25',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(210,'2020-05-14','14-05-2020-16:42:10',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(211,'2020-05-14','14-05-2020-17:29:59',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(212,'2020-05-15','15-05-2020-8:37:6',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(213,'2020-05-15','15-05-2020-8:38:33',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(214,'2020-05-15','15-05-2020-14:20:57',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(215,'2020-05-15','15-05-2020-15:5:7',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(216,'2020-05-15','15-05-2020-15:9:2',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(217,'2020-05-15','15-05-2020-15:10:11',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(218,'2020-05-15','15-05-2020-15:20:12',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(219,'2020-05-15','15-05-2020-16:48:4',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(220,'2020-05-16','16-05-2020-9:1:55',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(221,'2020-05-16','16-05-2020-9:46:12',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(222,'2020-05-16','16-05-2020-11:55:40',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(223,'2020-05-16','16-05-2020-12:3:29',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(224,'2020-05-16','16-05-2020-15:26:40',1,'Pedido confirmado','Danrlei Henrique','Henrique Lyra','Produção não planejada'),(225,'2020-05-16','16-05-2020-15:38:23',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(226,'2020-05-18','18-05-2020-8:10:0',1,'Pedido solicitado','Danrlei Henrique',NULL,'Produção não planejada'),(227,'2020-05-18','18-05-2020-8:42:13',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(228,'2020-05-18','18-05-2020-8:53:46',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(229,'2020-05-18','18-05-2020-8:56:11',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(230,'2020-05-18','18-05-2020-9:39:28',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(231,'2020-05-18','18-05-2020-9:40:35',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(232,'2020-05-18','18-05-2020-10:0:32',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(233,'2020-05-18','18-05-2020-10:30:37',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Completar estoque Mínimo'),(234,'2020-05-18','18-05-2020-15:0:46',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(235,'2020-05-18','18-05-2020-15:3:58',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(236,'2020-05-18','18-05-2020-16:48:50',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(237,'2020-05-18','18-05-2020-16:52:11',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(238,'2020-05-18','18-05-2020-16:55:18',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(239,'2020-05-18','18-05-2020-17:56:47',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(240,'2020-05-19','19-05-2020-8:25:2',1,'Pedido confirmado','Henrique Lyra','Henrique Lyra','Insuficiente para produção'),(241,'2020-05-19','19-05-2020-8:31:4',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(242,'2020-05-19','19-05-2020-9:37:15',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(243,'2020-05-19','19-05-2020-9:41:14',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(244,'2020-05-19','19-05-2020-10:23:24',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(245,'2020-05-19','19-05-2020-10:32:46',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(246,'2020-05-19','19-05-2020-13:15:9',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(247,'2020-05-19','19-05-2020-13:24:1',1,'Pedido solicitado','Danrlei Henrique',NULL,'Produção não planejada'),(248,'2020-05-19','19-05-2020-17:48:21',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(249,'2020-05-20','20-05-2020-9:37:39',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(250,'2020-05-20','20-05-2020-10:4:18',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(251,'2020-05-20','20-05-2020-10:6:33',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(252,'2020-05-20','20-05-2020-14:8:49',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(253,'2020-05-20','20-05-2020-14:58:16',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(254,'2020-05-20','20-05-2020-17:50:37',1,'Pedido solicitado','Danrlei Henrique',NULL,'Produção não planejada'),(255,'2020-05-21','21-05-2020-8:18:47',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(256,'2020-05-21','21-05-2020-8:48:18',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(257,'2020-05-21','21-05-2020-11:15:50',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(258,'2020-05-21','21-05-2020-11:16:19',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(259,'2020-05-21','21-05-2020-14:12:33',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(260,'2020-05-21','21-05-2020-15:34:14',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(261,'2020-05-21','21-05-2020-15:43:54',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(262,'2020-05-22','22-05-2020-8:20:17',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(263,'2020-05-22','22-05-2020-9:50:8',1,'Pedido solicitado','Danrlei Henrique',NULL,'Produção não planejada'),(264,'2020-06-01','01-06-2020-14:3:56',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(265,'2020-06-01','01-06-2020-14:6:36',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(266,'2020-06-01','01-06-2020-14:14:17',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(267,'2020-06-01','01-06-2020-16:42:9',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(268,'2020-06-02','02-06-2020-8:34:15',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(269,'2020-06-02','02-06-2020-8:36:29',1,'Pedido confirmado','Danrlei Henrique','Danrlei Henrique','Produção não planejada'),(270,'2020-06-02','02-06-2020-8:45:30',1,'Pedido solicitado','Danrlei Henrique',NULL,'Produção não planejada'),(271,'2020-06-02','02-06-2020-13:47:11',1,'Pedido solicitado','Danrlei Henrique',NULL,'Produção não planejada');
/*!40000 ALTER TABLE `feedstock_request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_request_feedstock`
--

DROP TABLE IF EXISTS `feedstock_request_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_request_feedstock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `request_id` int NOT NULL,
  `feedstock_id` int NOT NULL,
  `feedstock_info` varchar(45) NOT NULL,
  `feedstock_uom` varchar(2) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=486 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_request_feedstock`
--

LOCK TABLES `feedstock_request_feedstock` WRITE;
/*!40000 ALTER TABLE `feedstock_request_feedstock` DISABLE KEYS */;
INSERT INTO `feedstock_request_feedstock` VALUES (1,1,28,'CA 25 pt','cm',15000.00),(2,1,43,'HXL pt','cm',20000.00),(3,2,130,'Velcro 50 F (veltor) vd','cm',7500.00),(4,2,131,'Velcro 50 M (veltor) vd','cm',7500.00),(5,3,28,'CA 25 pt','cm',20000.00),(6,4,17,'Velcro 25 M (light) pt','cm',2500.00),(7,4,107,'Velcro 25 M (light) vd','cm',2500.00),(8,4,109,'Velcro 25 M (light) tan','cm',2500.00),(9,4,119,'Velcro 25 M (veltor) vd','cm',5000.00),(10,4,113,'Velcro 50 M (light) vd','cm',2500.00),(11,4,114,'Velcro 50 F (light) tan','cm',2500.00),(12,4,115,'Velcro 50 M (light) tan','cm',2500.00),(13,4,128,'Velcro 50 F (veltor) pt','cm',2500.00),(14,4,129,'Velcro 50 M (veltor) pt','cm',2500.00),(15,5,45,'Gorgurão vd','cm',20000.00),(16,6,47,'Zíper pt','cm',6400.00),(17,6,51,'Tic Tac 25 pt','un',300.00),(18,6,100,'Cursor pt','un',192.00),(19,7,46,'Gorgurão tan','cm',10000.00),(20,8,46,'Gorgurão tan','cm',20000.00),(21,8,49,'Zíper tan','cm',2800.00),(22,8,60,'Botão S/C','un',384.00),(23,8,100,'Cursor pt','un',96.00),(24,8,176,'Linha tan','un',5.00),(25,9,174,'Linha pt','un',4.00),(26,10,60,'Botão S/C','un',17.00),(27,11,23,'Velcro 50 M (light) pt','cm',2500.00),(28,12,43,'HXL pt','cm',20000.00),(29,12,60,'Botão S/C','un',148.00),(30,12,174,'Linha pt','un',4.00),(31,12,175,'Linha vd','un',6.00),(32,13,22,'Velcro 50 F (light) pt','cm',2500.00),(33,13,23,'Velcro 50 M (light) pt','cm',2500.00),(34,13,114,'Velcro 50 F (light) tan','cm',2500.00),(35,13,28,'CA 25 pt','cm',5000.00),(36,13,30,'CA 25 tan','cm',5000.00),(37,14,169,'Elástico 40 branc S/C','cm',12500.00),(38,15,164,'Cadarço Tubular pt','cm',5000.00),(39,15,31,'CA 40 pt','cm',25000.00),(40,15,60,'Botão S/C','un',400.00),(41,15,175,'Linha vd','un',6.00),(42,16,102,'Etiqueta Marca pano S/C','un',180.00),(43,17,87,'Regulador 40 pt','un',540.00),(44,18,80,'Ponteira vd','un',20.00),(45,19,60,'Botão S/C','cm',200.00),(46,20,60,'Botão S/C','cm',200.00),(47,21,60,'Botão S/C','cm',200.00),(48,22,60,'Botão S/C','cm',200.00),(49,23,60,'Botão S/C','cm',200.00),(50,24,43,'HXL pt','cm',20000.00),(51,24,45,'Gorgurão vd','cm',20000.00),(52,24,46,'Gorgurão tan','cm',20000.00),(53,25,60,'Botão S/C','cm',200.00),(54,26,71,'Meia argola 25 vd','un',2.00),(55,27,71,'Meia argola 25 vd','un',2.00),(56,27,151,'Alça Bob vd','un',1.00),(57,28,105,'Emborrachado trapézi vd','un',2.00),(58,29,105,'Emborrachado trapézi vd','un',2.00),(59,30,60,'Botão S/C','cm',200.00),(60,31,174,'Linha pt','un',2.00),(61,32,80,'Ponteira vd','un',2.00),(62,32,85,'Regulador 25 vd','un',4.00),(63,33,57,'Tic Tac 50 pt','un',20.00),(64,34,60,'Botão S/C','cm',200.00),(65,35,174,'Linha pt','un',4.00),(66,36,87,'Regulador 40 pt','un',540.00),(67,37,70,'Meia argola 25 pt','un',22.00),(68,37,71,'Meia argola 25 vd','un',26.00),(69,38,22,'Velcro 50 F (light) pt','cm',5000.00),(70,39,181,'Emborrachado botão pt','un',11.00),(71,40,181,'Emborrachado botão pt','un',37.00),(72,41,182,'Emborrachado cinto pt','un',11.00),(73,42,178,'Emborrachado coldre pt','un',48.00),(74,43,22,'Velcro 50 F (light) pt','cm',2500.00),(75,43,24,'Velcro 50 F (light) vd','cm',2500.00),(76,44,52,'Tic Tac 25 vd','un',2.00),(77,45,174,'Linha pt','un',3.00),(78,46,24,'Velcro 50 F (light) vd','cm',20000.00),(79,47,175,'Linha vd','un',3.00),(80,48,157,'Elástico 80 vd','cm',2500.00),(81,48,104,'Emborrachado trapézi pt','un',2.00),(82,49,60,'Botão S/C','cm',200.00),(83,50,16,'Velcro 25 F (light) pt','cm',5000.00),(84,51,24,'Velcro 50 F (light) vd','cm',5000.00),(85,52,47,'Zíper pt','cm',1100.00),(86,53,114,'Velcro 50 F (light) tan','cm',2500.00),(87,54,174,'Linha pt','un',3.00),(88,55,29,'CA 25 vd','cm',10000.00),(89,56,176,'Linha tan','un',6.00),(90,57,60,'Botão S/C','cm',200.00),(91,58,79,'Ponteira pt','un',60.00),(92,59,22,'Velcro 50 F (light) pt','cm',2500.00),(93,59,115,'Velcro 50 M (light) tan','cm',5000.00),(94,60,43,'HXL pt','cm',20000.00),(95,60,45,'Gorgurão vd','cm',20000.00),(96,60,81,'Ponteira tan','un',60.00),(97,61,60,'Botão S/C','cm',200.00),(98,62,81,'Ponteira tan','un',60.00),(99,63,57,'Tic Tac 50 pt','un',6.00),(100,64,185,'Mosquetão gancho S/C','un',1.00),(101,65,81,'Ponteira tan','un',60.00),(102,66,116,'Velcro 25 F (veltor) pt','cm',5000.00),(103,67,60,'Botão S/C','cm',200.00),(104,68,43,'HXL pt','cm',10000.00),(105,69,80,'Ponteira vd','un',60.00),(106,70,80,'Ponteira vd','un',60.00),(107,71,60,'Botão S/C','cm',200.00),(108,72,102,'Etiqueta Marca pano S/C','un',48.00),(109,73,145,'Elástico 80 pt','cm',2500.00),(110,74,43,'HXL pt','cm',20000.00),(111,75,128,'Velcro 50 F (veltor) pt','cm',12500.00),(112,76,80,'Ponteira vd','un',60.00),(113,77,60,'Botão S/C','cm',200.00),(114,78,118,'Velcro 25 F (veltor) vd','cm',2500.00),(115,78,22,'Velcro 50 F (light) pt','cm',2500.00),(116,78,128,'Velcro 50 F (veltor) pt','cm',5000.00),(117,78,130,'Velcro 50 F (veltor) vd','cm',5000.00),(118,78,174,'Linha pt','un',2.00),(119,79,130,'Velcro 50 F (veltor) vd','cm',12500.00),(120,80,52,'Tic Tac 25 vd','un',2.00),(121,81,79,'Ponteira pt','un',60.00),(122,82,60,'Botão S/C','cm',200.00),(123,83,60,'Botão S/C','cm',200.00),(124,83,80,'Ponteira vd','un',60.00),(125,84,60,'Botão S/C','cm',200.00),(126,84,80,'Ponteira vd','un',60.00),(127,84,102,'Etiqueta Marca pano S/C','un',72.00),(128,85,80,'Ponteira vd','un',11.00),(129,86,60,'Botão S/C','cm',200.00),(130,87,174,'Linha pt','un',4.00),(131,88,79,'Ponteira pt','un',60.00),(132,89,17,'Velcro 25 M (light) pt','cm',2500.00),(133,89,117,'Velcro 25 M (veltor) pt','cm',2500.00),(134,89,118,'Velcro 25 F (veltor) vd','cm',2500.00),(135,89,23,'Velcro 50 M (light) pt','cm',2500.00),(136,89,51,'Tic Tac 25 pt','un',2.00),(137,89,54,'Tic Tac 40 pt','un',2.00),(138,89,87,'Regulador 40 pt','un',2.00),(139,90,79,'Ponteira pt','un',60.00),(140,91,60,'Botão S/C','cm',200.00),(141,92,60,'Botão S/C','cm',200.00),(142,92,79,'Ponteira pt','un',60.00),(143,93,174,'Linha pt','un',6.00),(144,93,175,'Linha vd','un',3.00),(145,94,79,'Ponteira pt','un',20.00),(146,95,47,'Zíper pt','cm',14000.00),(147,96,80,'Ponteira vd','un',1.00),(148,96,85,'Regulador 25 vd','un',2.00),(149,96,105,'Emborrachado trapézi vd','un',1.00),(150,97,22,'Velcro 50 F (light) pt','cm',5000.00),(151,98,181,'Emborrachado botão pt','un',5.00),(152,99,22,'Velcro 50 F (light) pt','cm',5000.00),(153,100,25,'Velcro 100 F (light) pt','cm',2500.00),(154,100,26,'Velcro 100 M (light) pt','cm',2500.00),(155,100,51,'Tic Tac 25 pt','un',10.00),(156,101,174,'Linha pt','un',1.00),(157,102,175,'Linha vd','un',1.00),(158,103,181,'Emborrachado botão pt','un',5.00),(159,104,47,'Zíper pt','cm',13500.00),(160,104,174,'Linha pt','un',12.00),(161,105,100,'Cursor pt','un',96.00),(162,105,175,'Linha vd','un',6.00),(163,106,48,'Zíper vd','cm',2800.00),(164,107,36,'CA 50 tan','cm',5000.00),(165,108,175,'Linha vd','un',2.00),(166,109,102,'Etiqueta Marca pano S/C','un',72.00),(167,110,117,'Velcro 25 M (veltor) pt','cm',2500.00),(168,110,28,'CA 25 pt','cm',5000.00),(169,110,30,'CA 25 tan','cm',10000.00),(170,111,175,'Linha vd','un',2.00),(171,112,47,'Zíper pt','cm',600.00),(172,113,47,'Zíper pt','cm',2000.00),(173,114,51,'Tic Tac 25 pt','un',2.00),(174,114,70,'Meia argola 25 pt','un',2.00),(175,114,150,'Alça Bob pt','un',1.00),(176,115,70,'Meia argola 25 pt','un',2.00),(177,115,104,'Emborrachado trapézi pt','un',2.00),(178,116,158,'Elástico 80 tan','cm',2500.00),(179,117,176,'Linha tan','un',4.00),(180,118,23,'Velcro 50 M (light) pt','cm',2500.00),(181,119,176,'Linha tan','un',2.00),(182,120,87,'Regulador 40 pt','un',348.00),(183,121,31,'CA 40 pt','cm',10000.00),(184,122,72,'Meia argola 25 tan','un',2.00),(185,123,174,'Linha pt','un',6.00),(186,124,175,'Linha vd','un',1.00),(187,125,174,'Linha pt','un',2.00),(188,126,167,'Terminal enforcador vd','un',2.00),(189,127,60,'Botão S/C','cm',200.00),(190,127,182,'Emborrachado cinto pt','un',30.00),(191,128,174,'Linha pt','un',10.00),(192,128,175,'Linha vd','un',10.00),(193,128,176,'Linha tan','un',10.00),(194,129,36,'CA 50 tan','cm',10000.00),(195,130,47,'Zíper pt','cm',1000.00),(196,131,16,'Velcro 25 F (light) pt','cm',5000.00),(197,132,47,'Zíper pt','cm',1400.00),(198,132,100,'Cursor pt','un',40.00),(199,133,174,'Linha pt','un',6.00),(200,134,80,'Ponteira vd','un',3.00),(201,134,81,'Ponteira tan','un',3.00),(202,134,85,'Regulador 25 vd','un',6.00),(203,134,86,'Regulador 25 tan','un',6.00),(204,135,175,'Linha vd','un',6.00),(205,136,31,'CA 40 pt','cm',10000.00),(206,137,23,'Velcro 50 M (light) pt','cm',5000.00),(207,138,105,'Emborrachado trapézi vd','un',1.00),(208,139,43,'HXL pt','cm',30000.00),(209,140,60,'Botão S/C','cm',200.00),(210,140,80,'Ponteira vd','un',3.00),(211,140,85,'Regulador 25 vd','un',6.00),(212,140,105,'Emborrachado trapézi vd','un',3.00),(213,140,174,'Linha pt','un',6.00),(214,141,51,'Tic Tac 25 pt','un',12.00),(215,142,128,'Velcro 50 F (veltor) pt','cm',2500.00),(216,143,116,'Velcro 25 F (veltor) pt','cm',2500.00),(217,144,174,'Linha pt','un',6.00),(218,145,174,'Linha pt','un',1.00),(219,146,60,'Botão S/C','cm',200.00),(220,147,54,'Tic Tac 40 pt','un',2.00),(221,148,24,'Velcro 50 F (light) vd','cm',2500.00),(222,148,113,'Velcro 50 M (light) vd','cm',2500.00),(223,149,130,'Velcro 50 F (veltor) vd','cm',2500.00),(224,149,131,'Velcro 50 M (veltor) vd','cm',2500.00),(225,150,28,'CA 25 pt','cm',5000.00),(226,151,174,'Linha pt','un',10.00),(227,152,22,'Velcro 50 F (light) pt','cm',5000.00),(228,153,145,'Elástico 80 pt','cm',2500.00),(229,154,51,'Tic Tac 25 pt','un',3.00),(230,155,51,'Tic Tac 25 pt','un',3.00),(231,156,57,'Tic Tac 50 pt','un',1.00),(232,157,176,'Linha tan','un',3.00),(233,158,57,'Tic Tac 50 pt','un',1.00),(234,159,17,'Velcro 25 M (light) pt','cm',2500.00),(235,159,114,'Velcro 50 F (light) tan','cm',2500.00),(236,159,115,'Velcro 50 M (light) tan','cm',2500.00),(237,159,130,'Velcro 50 F (veltor) vd','cm',5000.00),(238,159,29,'CA 25 vd','cm',5000.00),(239,160,72,'Meia argola 25 tan','un',6.00),(240,161,60,'Botão S/C','cm',200.00),(241,162,72,'Meia argola 25 tan','un',1.00),(242,162,80,'Ponteira vd','un',3.00),(243,162,81,'Ponteira tan','un',3.00),(244,162,85,'Regulador 25 vd','un',6.00),(245,162,86,'Regulador 25 tan','un',6.00),(246,162,105,'Emborrachado trapézi vd','un',3.00),(247,162,106,'Emborrachado trapézi tan','un',3.00),(248,162,176,'Linha tan','un',6.00),(249,163,22,'Velcro 50 F (light) pt','cm',5000.00),(250,163,23,'Velcro 50 M (light) pt','cm',5000.00),(251,164,174,'Linha pt','un',4.00),(252,165,43,'HXL pt','cm',30000.00),(253,166,22,'Velcro 50 F (light) pt','cm',5000.00),(254,166,23,'Velcro 50 M (light) pt','cm',2500.00),(255,167,157,'Elástico 80 vd','cm',2500.00),(256,168,92,'Regulador 50 tan','un',120.00),(257,169,84,'Regulador 25 pt','un',1.00),(258,169,174,'Linha pt','un',6.00),(259,170,91,'Regulador 50 vd','un',80.00),(260,171,174,'Linha pt','un',3.00),(261,172,175,'Linha vd','un',3.00),(262,173,28,'CA 25 pt','cm',10000.00),(263,174,28,'CA 25 pt','cm',15000.00),(264,175,80,'Ponteira vd','un',2.00),(265,175,85,'Regulador 25 vd','un',6.00),(266,175,105,'Emborrachado trapézi vd','un',2.00),(267,176,79,'Ponteira pt','un',4.00),(268,176,84,'Regulador 25 pt','un',8.00),(269,176,104,'Emborrachado trapézi pt','un',4.00),(270,177,129,'Velcro 50 M (veltor) pt','cm',2500.00),(271,178,174,'Linha pt','un',7.00),(272,179,90,'Regulador 50 pt','un',120.00),(273,180,72,'Meia argola 25 tan','un',20.00),(274,181,51,'Tic Tac 25 pt','un',12.00),(275,182,107,'Velcro 25 M (light) vd','cm',2500.00),(276,182,109,'Velcro 25 M (light) tan','cm',2500.00),(277,182,31,'CA 40 pt','cm',5000.00),(278,182,32,'CA 40 vd','cm',5000.00),(279,182,34,'CA 50 pt','cm',5000.00),(280,182,35,'CA 50 vd','cm',5000.00),(281,182,37,'CA 70 pt','cm',5000.00),(282,183,174,'Linha pt','un',6.00),(283,184,72,'Meia argola 25 tan','un',20.00),(284,185,57,'Tic Tac 50 pt','un',2.00),(285,186,47,'Zíper pt','cm',2800.00),(286,187,43,'HXL pt','cm',40000.00),(287,188,157,'Elástico 80 vd','cm',2500.00),(288,189,32,'CA 40 vd','cm',5000.00),(289,190,175,'Linha vd','un',6.00),(290,191,24,'Velcro 50 F (light) vd','cm',2500.00),(291,191,43,'HXL pt','cm',30000.00),(292,191,51,'Tic Tac 25 pt','un',4.00),(293,192,43,'HXL pt','cm',30000.00),(294,192,51,'Tic Tac 25 pt','un',4.00),(295,193,91,'Regulador 50 vd','un',120.00),(296,194,81,'Ponteira tan','un',5.00),(297,194,86,'Regulador 25 tan','un',10.00),(298,194,106,'Emborrachado trapézi tan','un',5.00),(299,195,57,'Tic Tac 50 pt','un',3.00),(300,196,22,'Velcro 50 F (light) pt','cm',2500.00),(301,196,24,'Velcro 50 F (light) vd','cm',2500.00),(302,196,28,'CA 25 pt','cm',10000.00),(303,196,30,'CA 25 tan','cm',10000.00),(304,197,175,'Linha vd','un',8.00),(305,198,47,'Zíper pt','cm',2900.00),(306,199,43,'HXL pt','cm',50000.00),(307,199,70,'Meia argola 25 pt','un',100.00),(308,199,92,'Regulador 50 tan','un',50.00),(309,199,174,'Linha pt','un',4.00),(310,200,167,'Terminal enforcador vd','un',3.00),(311,201,22,'Velcro 50 F (light) pt','cm',5000.00),(312,202,51,'Tic Tac 25 pt','un',10.00),(313,202,54,'Tic Tac 40 pt','un',8.00),(314,202,79,'Ponteira pt','un',6.00),(315,202,181,'Emborrachado botão pt','un',6.00),(316,203,84,'Regulador 25 pt','un',10.00),(317,204,52,'Tic Tac 25 vd','un',10.00),(318,205,175,'Linha vd','un',12.00),(319,206,79,'Ponteira pt','un',6.00),(320,206,84,'Regulador 25 pt','un',10.00),(321,206,87,'Regulador 40 pt','un',3.00),(322,207,22,'Velcro 50 F (light) pt','cm',15000.00),(323,207,28,'CA 25 pt','cm',40000.00),(324,207,70,'Meia argola 25 pt','un',100.00),(325,208,108,'Velcro 25 F (light) tan','cm',7500.00),(326,209,28,'CA 25 pt','cm',40000.00),(327,210,145,'Elástico 80 pt','cm',2500.00),(328,211,28,'CA 25 pt','cm',20000.00),(329,211,51,'Tic Tac 25 pt','un',48.00),(330,212,102,'Etiqueta Marca pano S/C','un',200.00),(331,213,60,'Botão S/C','cm',400.00),(332,214,51,'Tic Tac 25 pt','un',1.00),(333,214,60,'Botão S/C','cm',800.00),(334,214,79,'Ponteira pt','un',120.00),(335,214,84,'Regulador 25 pt','un',294.00),(336,214,86,'Regulador 25 tan','un',2.00),(337,215,28,'CA 25 pt','cm',20000.00),(338,215,51,'Tic Tac 25 pt','un',480.00),(339,215,70,'Meia argola 25 pt','un',96.00),(340,215,100,'Cursor pt','un',192.00),(341,215,150,'Alça Bob pt','un',48.00),(342,216,16,'Velcro 25 F (light) pt','cm',17500.00),(343,216,174,'Linha pt','un',7.00),(344,217,104,'Emborrachado trapézi pt','un',96.00),(345,218,43,'HXL pt','cm',70000.00),(346,218,47,'Zíper pt','cm',10000.00),(347,218,72,'Meia argola 25 tan','un',100.00),(348,219,115,'Velcro 50 M (light) tan','cm',12500.00),(349,219,28,'CA 25 pt','cm',60000.00),(350,220,114,'Velcro 50 F (light) tan','cm',10000.00),(351,220,28,'CA 25 pt','cm',40000.00),(352,220,29,'CA 25 vd','cm',10000.00),(353,220,30,'CA 25 tan','cm',25000.00),(354,220,32,'CA 40 vd','cm',15000.00),(355,220,33,'CA 40 tan','cm',25000.00),(356,221,16,'Velcro 25 F (light) pt','cm',7500.00),(357,221,28,'CA 25 pt','cm',20000.00),(358,221,31,'CA 40 pt','cm',20000.00),(359,221,43,'HXL pt','cm',100000.00),(360,221,104,'Emborrachado trapézi pt','un',120.00),(361,222,19,'Velcro 40 F (light) pt','cm',7500.00),(362,222,20,'Velcro 40 M (light) pt','cm',7500.00),(363,222,114,'Velcro 50 F (light) tan','cm',2500.00),(364,222,31,'CA 40 pt','cm',5000.00),(365,222,34,'CA 50 pt','cm',10000.00),(366,223,22,'Velcro 50 F (light) pt','cm',7500.00),(367,224,18,'Velcro 25 F (light) vd','cm',12500.00),(368,224,22,'Velcro 50 F (light) pt','cm',7500.00),(369,224,23,'Velcro 50 M (light) pt','cm',7500.00),(370,224,29,'CA 25 vd','cm',20000.00),(371,224,31,'CA 40 pt','cm',5000.00),(372,224,35,'CA 50 vd','cm',10000.00),(373,224,49,'Zíper tan','cm',8400.00),(374,224,51,'Tic Tac 25 pt','un',203.00),(375,224,100,'Cursor pt','un',240.00),(376,224,174,'Linha pt','un',6.00),(377,224,175,'Linha vd','un',3.00),(378,224,176,'Linha tan','un',9.00),(379,225,157,'Elástico 80 vd','cm',2500.00),(380,226,128,'Velcro 50 F (veltor) pt','cm',15000.00),(381,226,129,'Velcro 50 M (veltor) pt','cm',5000.00),(382,226,157,'Elástico 80 vd','cm',2500.00),(383,227,47,'Zíper pt','cm',7800.00),(384,227,100,'Cursor pt','un',192.00),(385,227,104,'Emborrachado trapézi pt','un',48.00),(386,228,150,'Alça Bob pt','un',24.00),(387,229,130,'Velcro 50 F (veltor) vd','cm',15000.00),(388,229,131,'Velcro 50 M (veltor) vd','cm',5000.00),(389,229,157,'Elástico 80 vd','cm',2500.00),(390,230,91,'Regulador 50 vd','un',100.00),(391,231,130,'Velcro 50 F (veltor) vd','cm',10000.00),(392,232,24,'Velcro 50 F (light) vd','cm',10000.00),(393,233,130,'Velcro 50 F (veltor) vd','cm',5000.00),(394,233,131,'Velcro 50 M (veltor) vd','cm',5000.00),(395,234,175,'Linha vd','un',8.00),(396,235,16,'Velcro 25 F (light) pt','cm',5000.00),(397,235,113,'Velcro 50 M (light) vd','cm',5000.00),(398,235,129,'Velcro 50 M (veltor) pt','cm',2500.00),(399,235,28,'CA 25 pt','cm',10000.00),(400,235,71,'Meia argola 25 vd','un',100.00),(401,235,90,'Regulador 50 pt','un',100.00),(402,236,100,'Cursor pt','un',20.00),(403,237,114,'Velcro 50 F (light) tan','cm',5000.00),(404,238,100,'Cursor pt','un',96.00),(405,239,22,'Velcro 50 F (light) pt','cm',5000.00),(406,239,28,'CA 25 pt','cm',10000.00),(407,239,29,'CA 25 vd','cm',10000.00),(408,240,174,'Linha pt','un',10.00),(409,241,47,'Zíper pt','cm',3000.00),(410,242,16,'Velcro 25 F (light) pt','cm',15000.00),(411,242,22,'Velcro 50 F (light) pt','cm',5000.00),(412,242,128,'Velcro 50 F (veltor) pt','cm',15000.00),(413,242,129,'Velcro 50 M (veltor) pt','cm',10000.00),(414,242,145,'Elástico 80 pt','cm',2500.00),(415,243,80,'Ponteira vd','un',3.00),(416,243,85,'Regulador 25 vd','un',5.00),(417,244,47,'Zíper pt','cm',100.00),(418,244,179,'Emborrachado coldre vd','un',9.00),(419,245,34,'CA 50 pt','cm',10000.00),(420,246,70,'Meia argola 25 pt','un',100.00),(421,246,90,'Regulador 50 pt','un',100.00),(422,247,175,'Linha vd','un',4.00),(423,248,79,'Ponteira pt','un',26.00),(424,249,128,'Velcro 50 F (veltor) pt','cm',5000.00),(425,249,30,'CA 25 tan','cm',25000.00),(426,250,114,'Velcro 50 F (light) tan','cm',7500.00),(427,250,30,'CA 25 tan','cm',10000.00),(428,251,100,'Cursor pt','un',240.00),(429,251,102,'Etiqueta Marca pano S/C','un',200.00),(430,252,22,'Velcro 50 F (light) pt','cm',5000.00),(431,252,34,'CA 50 pt','cm',10000.00),(432,252,81,'Ponteira tan','un',2.00),(433,252,86,'Regulador 25 tan','un',4.00),(434,253,43,'HXL pt','cm',50000.00),(435,253,145,'Elástico 80 pt','cm',2500.00),(436,254,16,'Velcro 25 F (light) pt','cm',10000.00),(437,254,29,'CA 25 vd','cm',5000.00),(438,254,31,'CA 40 pt','cm',25000.00),(439,255,128,'Velcro 50 F (veltor) pt','cm',15000.00),(440,255,102,'Etiqueta Marca pano S/C','un',130.00),(441,256,22,'Velcro 50 F (light) pt','cm',7500.00),(442,256,104,'Emborrachado trapézi pt','un',48.00),(443,257,129,'Velcro 50 M (veltor) pt','cm',5000.00),(444,257,30,'CA 25 tan','cm',10000.00),(445,257,35,'CA 50 vd','cm',5000.00),(446,257,36,'CA 50 tan','cm',5000.00),(447,258,29,'CA 25 vd','cm',10000.00),(448,259,115,'Velcro 50 M (light) tan','cm',5000.00),(449,259,30,'CA 25 tan','cm',10000.00),(450,260,18,'Velcro 25 F (light) vd','cm',15000.00),(451,260,130,'Velcro 50 F (veltor) vd','cm',10000.00),(452,260,29,'CA 25 vd','cm',25000.00),(453,260,35,'CA 50 vd','cm',5000.00),(454,261,22,'Velcro 50 F (light) pt','cm',5000.00),(455,261,23,'Velcro 50 M (light) pt','cm',5000.00),(456,262,174,'Linha pt','un',6.00),(457,262,175,'Linha vd','un',6.00),(458,263,24,'Velcro 50 F (light) vd','cm',10000.00),(459,263,113,'Velcro 50 M (light) vd','cm',7500.00),(460,263,29,'CA 25 vd','cm',10000.00),(461,264,28,'CA 25 pt','cm',40000.00),(462,264,164,'Cadarço Tubular pt','cm',15000.00),(463,264,50,'Elástico 25 pt','cm',25000.00),(464,264,51,'Tic Tac 25 pt','un',240.00),(465,265,31,'CA 40 pt','cm',25000.00),(466,266,16,'Velcro 25 F (light) pt','cm',7500.00),(467,266,108,'Velcro 25 F (light) tan','cm',5000.00),(468,266,109,'Velcro 25 M (light) tan','cm',5000.00),(469,266,22,'Velcro 50 F (light) pt','cm',10000.00),(470,266,23,'Velcro 50 M (light) pt','cm',2500.00),(471,267,22,'Velcro 50 F (light) pt','cm',2500.00),(472,267,128,'Velcro 50 F (veltor) pt','cm',7500.00),(473,267,28,'CA 25 pt','cm',20000.00),(474,268,150,'Alça Bob pt','un',24.00),(475,269,129,'Velcro 50 M (veltor) pt','cm',5000.00),(476,270,72,'Meia argola 25 tan','un',100.00),(477,271,51,'Tic Tac 25 pt','un',240.00),(478,271,53,'Tic Tac 25 tan','un',120.00),(479,271,54,'Tic Tac 40 pt','un',192.00),(480,271,57,'Tic Tac 50 pt','un',48.00),(481,271,70,'Meia argola 25 pt','un',48.00),(482,271,72,'Meia argola 25 tan','un',24.00),(483,271,87,'Regulador 40 pt','un',192.00),(484,271,150,'Alça Bob pt','un',24.00),(485,271,152,'Alça Bob tan','un',12.00);
/*!40000 ALTER TABLE `feedstock_request_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_storage`
--

DROP TABLE IF EXISTS `feedstock_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_storage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `storage_id` int NOT NULL,
  `feedstock_id` int NOT NULL,
  `amount` decimal(11,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=183 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_storage`
--

LOCK TABLES `feedstock_storage` WRITE;
/*!40000 ALTER TABLE `feedstock_storage` DISABLE KEYS */;
INSERT INTO `feedstock_storage` VALUES (1,1,1,19600),(2,1,2,20000),(3,1,3,0),(4,1,10,0),(5,1,143,35000),(6,1,11,1100),(7,1,12,0),(8,1,13,7900),(9,1,14,10600),(10,1,144,0),(11,1,99,4220),(12,1,83,100000),(13,1,82,100000),(14,1,16,1000),(15,1,17,542500),(16,1,18,15000),(17,1,107,550000),(18,1,108,30000),(19,1,109,495000),(20,1,116,52500),(21,1,117,95000),(22,1,118,0),(23,1,119,95000),(24,1,120,0),(25,1,121,0),(26,1,19,75000),(27,1,20,492500),(28,1,21,0),(29,1,110,0),(30,1,111,0),(31,1,112,0),(32,1,122,0),(33,1,123,0),(34,1,124,0),(35,1,125,0),(36,1,126,0),(37,1,127,0),(38,1,22,25000),(39,1,23,467500),(40,1,24,92500),(41,1,113,482500),(42,1,114,30000),(43,1,115,462500),(44,1,128,0),(45,1,129,462500),(46,1,130,5000),(47,1,131,35000),(48,1,132,0),(49,1,133,0),(50,1,25,5000),(51,1,26,0),(52,1,27,0),(53,1,134,0),(54,1,135,0),(55,1,136,0),(56,1,137,0),(57,1,138,0),(58,1,139,0),(59,1,140,0),(60,1,141,0),(61,1,142,0),(62,1,28,125000),(63,1,29,130000),(64,1,30,135000),(65,1,31,100000),(66,1,32,60000),(67,1,33,85000),(68,1,34,195000),(69,1,35,45000),(70,1,36,30000),(71,1,37,15000),(72,1,38,50000),(73,1,39,20000),(74,1,40,0),(75,1,41,0),(76,1,42,0),(77,1,43,160000),(78,1,44,0),(79,1,45,200000),(80,1,46,10000),(81,1,47,18800),(82,1,48,46700),(83,1,49,36100),(84,1,50,75000),(85,1,145,35000),(86,1,51,268),(87,1,52,4200),(88,1,53,5600),(89,1,54,428),(90,1,55,0),(91,1,56,0),(92,1,57,528),(93,1,58,0),(94,1,59,0),(95,1,60,2000),(96,1,61,0),(97,1,62,0),(98,1,63,35000),(99,1,64,0),(100,1,65,0),(101,1,66,0),(102,1,67,0),(103,1,68,0),(104,1,69,0),(105,1,70,1892),(106,1,71,6200),(107,1,72,7900),(108,1,73,0),(109,1,74,0),(110,1,75,0),(111,1,76,0),(112,1,77,0),(113,1,78,0),(114,1,79,1448),(115,1,80,5197),(116,1,81,3398),(117,1,84,896),(118,1,85,3899),(119,1,86,6294),(120,1,87,2201),(121,1,88,0),(122,1,89,0),(123,1,90,1200),(124,1,91,2000),(125,1,92,2050),(126,1,93,0),(127,1,94,0),(128,1,95,358),(129,1,96,1000000),(130,1,97,1000),(131,1,100,1997),(132,1,101,1548),(133,1,102,2132),(134,1,103,13557),(135,1,104,302),(136,1,105,1242),(137,1,106,675),(142,1,150,1498),(143,1,151,2593),(144,1,152,2200),(145,1,153,1000000),(146,1,154,8300),(147,1,155,0),(148,1,156,5000),(149,1,157,70000),(150,1,158,70000),(154,1,164,190000),(155,1,165,50000),(156,1,166,75000),(157,1,167,2955),(158,1,168,1985),(159,1,169,10000),(160,1,170,325000),(161,1,171,70000),(162,1,172,40000),(163,1,173,15000),(164,1,174,12),(165,1,175,33),(166,1,176,40),(167,1,177,7500),(168,1,178,150),(169,1,179,149),(170,1,180,204),(171,1,181,764),(172,1,182,546),(173,1,183,0),(174,1,184,0),(175,1,185,9),(176,1,186,12500),(177,1,187,476),(178,1,188,0),(179,1,189,452),(180,1,190,52800),(181,1,191,0),(182,1,192,0);
/*!40000 ALTER TABLE `feedstock_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_storage_instance`
--

DROP TABLE IF EXISTS `feedstock_storage_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_storage_instance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_storage_instance`
--

LOCK TABLES `feedstock_storage_instance` WRITE;
/*!40000 ALTER TABLE `feedstock_storage_instance` DISABLE KEYS */;
INSERT INTO `feedstock_storage_instance` VALUES (1,'Estoque 3º Piso');
/*!40000 ALTER TABLE `feedstock_storage_instance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_supplier`
--

DROP TABLE IF EXISTS `feedstock_supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_supplier` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `phone` varchar(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_supplier`
--

LOCK TABLES `feedstock_supplier` WRITE;
/*!40000 ALTER TABLE `feedstock_supplier` DISABLE KEYS */;
INSERT INTO `feedstock_supplier` VALUES (1,'China','21999999999'),(2,'Luã','21999999911'),(3,'Adina','21999999999'),(4,'Eduardo Cadarço','21964940571'),(5,'Rogério Emborrachado','21964493421'),(7,'Jorge Etiquetas','21999999999'),(8,'Madumac','02124523131'),(9,'Cordon textil','99333333333'),(10,'Omborgo','11999999999');
/*!40000 ALTER TABLE `feedstock_supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_supplier_storage`
--

DROP TABLE IF EXISTS `feedstock_supplier_storage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_supplier_storage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `supplier_id` int NOT NULL,
  `feedstock_id` int NOT NULL,
  `value` decimal(7,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=161 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_supplier_storage`
--

LOCK TABLES `feedstock_supplier_storage` WRITE;
/*!40000 ALTER TABLE `feedstock_supplier_storage` DISABLE KEYS */;
INSERT INTO `feedstock_supplier_storage` VALUES (1,2,1,20.00),(15,2,11,6.80),(16,2,12,6.80),(17,2,13,6.80),(18,2,143,16.50),(19,2,14,11.90),(20,2,99,11.90),(21,2,82,7.00),(22,2,83,22.00),(23,2,2,17.50),(24,2,16,0.30),(25,2,17,0.30),(26,2,18,0.60),(27,2,107,0.60),(28,2,108,1.08),(29,2,109,1.08),(30,2,116,1.55),(31,2,117,1.55),(32,2,128,2.40),(33,2,129,2.40),(34,2,118,1.55),(35,2,119,1.55),(36,2,130,3.10),(37,2,131,3.10),(38,2,47,0.55),(39,2,48,1.00),(40,2,49,1.00),(43,3,1,12.11),(44,3,11,6.24),(45,3,16,0.40),(46,3,22,0.77),(47,3,116,1.03),(49,3,122,1.59),(50,3,128,2.36),(51,3,118,0.90),(52,3,130,2.40),(53,3,47,0.63),(54,3,48,0.68),(55,3,49,0.68),(56,3,100,0.25),(59,2,100,0.33),(60,2,60,0.30),(65,4,28,0.44),(66,4,29,0.56),(67,4,30,0.56),(68,4,31,0.74),(69,4,32,0.82),(70,4,33,0.82),(71,4,34,0.93),(72,4,35,1.02),(73,4,36,1.02),(74,4,37,1.29),(75,4,38,1.43),(76,4,39,1.43),(77,1,85,0.07),(78,1,86,0.07),(79,1,71,0.11),(80,1,72,0.11),(81,1,52,0.27),(82,1,53,0.27),(83,1,151,0.64),(84,1,152,0.64),(85,2,84,0.03),(86,2,150,0.60),(87,2,87,0.06),(88,2,90,0.10),(89,2,70,0.07),(90,2,95,0.45),(91,2,169,0.54),(92,2,51,0.18),(93,2,54,0.23),(94,2,57,0.46),(95,4,164,0.88),(96,4,165,0.88),(97,4,166,0.88),(98,4,170,0.51),(99,4,171,0.82),(100,4,172,1.02),(101,4,173,1.43),(102,2,43,0.22),(103,2,44,0.22),(104,2,45,0.22),(105,2,46,0.22),(106,5,104,1.30),(107,5,105,1.30),(108,5,106,1.30),(109,5,103,0.30),(110,7,101,0.10),(111,7,102,0.10),(112,1,80,0.28),(113,2,19,0.60),(114,2,22,0.60),(115,2,24,2.28),(116,2,114,2.40),(117,2,115,2.40),(118,2,20,0.60),(119,2,23,0.60),(120,2,24,1.20),(121,2,113,1.20),(122,2,108,2.16),(123,2,109,2.16),(124,2,153,8.00),(125,3,144,11.90),(126,1,51,0.15),(127,1,57,0.45),(128,1,70,0.07),(129,1,150,0.58),(130,1,97,0.23),(131,5,178,1.10),(132,5,179,1.10),(133,5,180,1.10),(134,5,181,1.20),(135,8,43,0.18),(136,8,45,0.17),(137,8,186,0.26),(138,1,87,0.06),(139,8,16,0.33),(140,8,17,0.33),(141,8,47,0.51),(142,8,14,12.95),(143,8,100,0.33),(144,1,90,0.22),(146,1,91,0.31),(147,1,92,0.31),(149,1,81,0.28),(150,4,190,0.26),(151,9,154,0.24),(152,2,174,5.00),(153,2,175,5.00),(154,2,176,5.00),(155,2,29,1.00),(156,2,30,1.00),(157,2,33,1.00),(158,2,35,1.00),(159,2,34,1.00),(160,2,36,1.00);
/*!40000 ALTER TABLE `feedstock_supplier_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_income`
--

DROP TABLE IF EXISTS `financial_income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_income` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(20) NOT NULL,
  `category_id` int NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `origin_id` int NOT NULL,
  `origin_name` varchar(20) NOT NULL,
  `value` decimal(11,2) NOT NULL,
  `obs` varchar(80) DEFAULT NULL,
  `user_id` int NOT NULL,
  `user_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_income`
--

LOCK TABLES `financial_income` WRITE;
/*!40000 ALTER TABLE `financial_income` DISABLE KEYS */;
INSERT INTO `financial_income` VALUES (1,'2019-12-30',4,'Caixa',6,'Caixa 1',180.00,'Fechamento Caixa ',3,'Anny Carvalho'),(6,'2020-01-06',4,'COFRE',6,'Caixa 1',200.00,'entrada',4,'Sheyla Lyra'),(7,'2020-01-08',4,'COFRE',6,'Caixa 1',2900.00,'entrada',4,'Sheyla Lyra'),(8,'2020-01-09',4,'COFRE',6,'Caixa 1',250.00,'',4,'Sheyla Lyra'),(9,'2020-01-09',4,'COFRE',6,'Caixa 1',270.00,'',4,'Sheyla Lyra'),(10,'2020-01-09',9,'CHEQUE',17,'CHEQUE',1200.00,'o cheque foi para o pagamento do eduardo cadarco obs 600 de credito temos com el',4,'Sheyla Lyra'),(11,'2020-01-10',4,'COFRE',6,'Caixa 1',470.00,'',4,'Sheyla Lyra'),(12,'2020-01-10',4,'COFRE',6,'Caixa 1',250.00,'',4,'Sheyla Lyra'),(13,'2020-01-14',4,'COFRE',6,'Caixa 1',690.00,'',4,'Sheyla Lyra'),(14,'2020-01-14',4,'COFRE',6,'Caixa 1',500.00,'referente ao dia 13/01',4,'Sheyla Lyra'),(15,'2020-01-14',4,'COFRE',6,'Caixa 1',690.00,'',4,'Sheyla Lyra'),(16,'2020-01-21',4,'COFRE',6,'Caixa 1',1700.00,'',4,'Sheyla Lyra'),(17,'2020-01-21',4,'COFRE',6,'Caixa 1',80.00,'',4,'Sheyla Lyra'),(18,'2020-01-24',4,'COFRE',6,'Caixa 1',300.00,'',4,'Sheyla Lyra'),(19,'2020-02-15',7,'BRADESCO',11,'DOC',13.00,'',1,'Henrique Lyra'),(20,'2020-04-22',4,'COFRE',6,'Caixa 1',50.00,'Receita para gastos diários ',1,'Henrique Lyra'),(21,'2020-04-22',4,'COFRE',6,'Caixa 1',50.00,'Receita para gastos diários ',1,'Henrique Lyra'),(22,'2020-04-24',4,'COFRE',6,'Caixa 1',100.00,'',1,'Henrique Lyra'),(23,'2020-05-25',4,'COFRE',6,'Caixa 1',200.00,'',1,'Henrique Lyra'),(24,'2020-06-01',4,'COFRE',6,'Caixa 1',100.00,'',1,'Henrique Lyra'),(25,'2020-06-03',4,'COFRE',6,'Caixa 1',100.00,'',1,'Henrique Lyra'),(26,'2020-07-10',4,'COFRE',6,'Caixa 1',200.00,'',1,'Henrique Lyra'),(27,'2020-07-10',4,'COFRE',6,'Caixa 1',380.00,'',1,'Henrique Lyra'),(28,'2020-08-11',4,'COFRE',6,'Caixa 1',50.00,'',1,'Henrique Lyra');
/*!40000 ALTER TABLE `financial_income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_income_category`
--

DROP TABLE IF EXISTS `financial_income_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_income_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_income_category`
--

LOCK TABLES `financial_income_category` WRITE;
/*!40000 ALTER TABLE `financial_income_category` DISABLE KEYS */;
INSERT INTO `financial_income_category` VALUES (7,'BRADESCO'),(10,'BRADESCO PJ'),(8,'BRASIL'),(9,'CHEQUE'),(4,'COFRE'),(6,'ITAÚ'),(2,'ML CHRIS'),(3,'ML JC'),(5,'TRAY');
/*!40000 ALTER TABLE `financial_income_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_income_origin`
--

DROP TABLE IF EXISTS `financial_income_origin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_income_origin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_income_origin`
--

LOCK TABLES `financial_income_origin` WRITE;
/*!40000 ALTER TABLE `financial_income_origin` DISABLE KEYS */;
INSERT INTO `financial_income_origin` VALUES (2,2,'Mercado Pago'),(3,2,'Mercado Livre'),(4,3,'Mercado Pago'),(5,3,'Mercado Livre'),(6,4,'Caixa 1'),(7,5,'Site'),(8,6,'TED'),(9,6,'DOC'),(10,6,'TEF'),(11,7,'DOC'),(12,7,'TED'),(13,7,'TEF'),(14,8,'DOC'),(15,8,'TED'),(16,8,'TEF'),(17,9,'CHEQUE'),(18,10,'DOC'),(19,10,'TED'),(20,10,'TEF'),(29,7,'Upsell'),(30,8,'Upsell'),(31,6,'Upsell'),(32,7,'Saque ML JC'),(33,7,'Saque ML Chris'),(34,8,'Saque ML JC'),(35,8,'Saque ML Chris'),(36,6,'Saque ML JC'),(37,6,'Saque ML Chris'),(38,6,'Correios'),(39,6,'custo fixo');
/*!40000 ALTER TABLE `financial_income_origin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_outcome`
--

DROP TABLE IF EXISTS `financial_outcome`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_outcome` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(20) NOT NULL,
  `full_date` varchar(45) NOT NULL,
  `category_id` int NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `origin_id` int NOT NULL,
  `origin_name` varchar(20) NOT NULL,
  `payment_id` int NOT NULL,
  `payment_name` varchar(20) NOT NULL,
  `value` decimal(11,2) NOT NULL,
  `obs` varchar(80) DEFAULT NULL,
  `user_id` int NOT NULL,
  `user_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=350 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome`
--

LOCK TABLES `financial_outcome` WRITE;
/*!40000 ALTER TABLE `financial_outcome` DISABLE KEYS */;
INSERT INTO `financial_outcome` VALUES (1,'2019-12-30','',5,'Fisco',27,'GPS',6,'ITAÚ',541.68,'Parcelamento Previdenciário 12/2019',3,'Anny Carvalho'),(2,'2019-12-30','',1,'Funcionários',24,'Sheyla',0,'',109.00,'Vale sheyla | Itau',3,'Anny Carvalho'),(3,'2019-12-30','',1,'Funcionários',21,'Chris',0,'',66.00,'Vale Chris | Itaú',3,'Anny Carvalho'),(4,'2019-12-30','',10,'Costura Externa',65,'Wilton Silva',0,'',300.00,'30 plates | Itaú',3,'Anny Carvalho'),(5,'2019-12-30','',10,'Costura Externa',71,'Lucilene Domingos',0,'',200.00,'20 plate marpat | Itaú',3,'Anny Carvalho'),(6,'2019-12-30','',10,'Costura Externa',72,'Sandra Liz',0,'',180.00,'120 bolsa pequena | Itau',3,'Anny Carvalho'),(7,'2019-12-30','',10,'Costura Externa',78,'Fátima Cristina',0,'',200.00,'20 close preto | Dinheiro',3,'Anny Carvalho'),(8,'2020-01-03','',1,'Funcionários',23,'Jean',0,'',813.97,'Itaú - Viagem 02/01',3,'Anny Carvalho'),(9,'2020-01-03','',10,'Costura Externa',78,'Fátima Cristina',0,'',150.00,'15 close preto | Dinheiro',3,'Anny Carvalho'),(10,'2020-01-03','',10,'Costura Externa',78,'Fátima Cristina',0,'',50.00,'Uber | dinheiro',3,'Anny Carvalho'),(11,'2020-01-03','',4,'Custo Fixo',79,'Alimentação',0,'',18.00,'3 quentinhas - 02/01 | Dinheiro',3,'Anny Carvalho'),(12,'2020-01-03','',1,'Funcionários',22,'Anny',0,'',5.00,'Vale 02/01 | dinheiro',3,'Anny Carvalho'),(13,'2020-01-03','',4,'Custo Fixo',80,'MDLivre',0,'',40.00,'Conta JC ',3,'Anny Carvalho'),(14,'2020-01-03','',4,'Custo Fixo',79,'Alimentação',0,'',42.00,'7 Quentinhas - Dinheiro',3,'Anny Carvalho'),(19,'2020-01-06','',1,'Funcionários',24,'Sheyla',4,'COFRE',62.00,'vale do dia 03-01',4,'Sheyla Lyra'),(20,'2020-01-06','',1,'Funcionários',14,'Dodô',6,'ITAÚ',337.05,'financiamento 03-01',4,'Sheyla Lyra'),(21,'2020-01-06','',2,'Materia Prima',51,'China',6,'ITAÚ',842.50,'transferência dia 03-01',4,'Sheyla Lyra'),(22,'2020-01-06','',2,'Materia Prima',52,'Eduardo',6,'ITAÚ',2624.00,'tranferencia 03/01',4,'Sheyla Lyra'),(23,'2020-01-06','',10,'Costura Externa',76,'Eliane Vandramini',6,'ITAÚ',1270.00,'Transferência 03-01',4,'Sheyla Lyra'),(24,'2020-01-06','',10,'Costura Externa',67,'Adriana Rodrigues',6,'ITAÚ',180.00,'TED 03-01',4,'Sheyla Lyra'),(25,'2020-01-06','',10,'Costura Externa',67,'Adriana Rodrigues',6,'ITAÚ',180.00,'tranferencia  03/01',4,'Sheyla Lyra'),(26,'2020-01-06','',10,'Costura Externa',68,'Lucení Gandra',6,'ITAÚ',360.00,'tranferencia  03/01',4,'Sheyla Lyra'),(27,'2020-01-06','',1,'Funcionários',11,'Fabiano',6,'ITAÚ',3271.00,'tranferencia  03/01',4,'Sheyla Lyra'),(28,'2020-01-06','',1,'Funcionários',9,'Daniel',6,'ITAÚ',4248.00,'tranferencia  03/01',4,'Sheyla Lyra'),(29,'2020-01-06','',1,'Funcionários',14,'Dodô',6,'ITAÚ',1263.00,'tranferencia  03/01',4,'Sheyla Lyra'),(30,'2020-01-06','',1,'Funcionários',13,'Josefa',4,'COFRE',50.00,'passagem 03/01',4,'Sheyla Lyra'),(31,'2020-01-06','',1,'Funcionários',15,'Betchola',4,'COFRE',50.00,'passagem 03/01',4,'Sheyla Lyra'),(32,'2020-01-06','',1,'Funcionários',11,'Fabiano',4,'COFRE',50.00,'passagem 03/01',4,'Sheyla Lyra'),(33,'2020-01-06','',1,'Funcionários',14,'Dodô',4,'COFRE',50.00,'passagem 03/01',4,'Sheyla Lyra'),(34,'2020-01-06','',1,'Funcionários',16,'Daniel Boca',4,'COFRE',50.00,'passagem 03/01',4,'Sheyla Lyra'),(35,'2020-01-06','',1,'Funcionários',18,'Caio',4,'COFRE',50.00,'passagem 03/01',4,'Sheyla Lyra'),(36,'2020-01-06','',1,'Funcionários',15,'Betchola',4,'COFRE',306.00,'vale 03/01',4,'Sheyla Lyra'),(37,'2020-01-06','',1,'Funcionários',81,'Rose',4,'COFRE',50.00,'passagem 03/01',4,'Sheyla Lyra'),(38,'2020-01-06','',4,'Custo Fixo',82,'Servidor',6,'ITAÚ',22.50,'',4,'Sheyla Lyra'),(39,'2020-01-06','',1,'Funcionários',21,'Chris',4,'COFRE',7.50,'vale ',4,'Sheyla Lyra'),(40,'2020-01-06','',1,'Funcionários',21,'Chris',4,'COFRE',12.00,'chip para trabalho',4,'Sheyla Lyra'),(41,'2020-01-06','',1,'Funcionários',15,'Betchola',6,'ITAÚ',1200.00,'pagamento ',4,'Sheyla Lyra'),(42,'2020-01-06','',1,'Funcionários',15,'Betchola',4,'COFRE',800.00,'pagamento',4,'Sheyla Lyra'),(43,'2020-01-06','',1,'Funcionários',17,'Danrlei',6,'ITAÚ',1200.00,'pagamento',4,'Sheyla Lyra'),(44,'2020-01-06','',1,'Funcionários',18,'Caio',6,'ITAÚ',1200.00,'pagamento ',4,'Sheyla Lyra'),(45,'2020-01-07','',10,'Costura Externa',68,'Lucení Gandra',6,'ITAÚ',360.00,'',4,'Sheyla Lyra'),(46,'2020-01-07','',10,'Costura Externa',66,'Míriam Braga Amorim',6,'ITAÚ',114.00,'',4,'Sheyla Lyra'),(47,'2020-01-07','',10,'Costura Externa',70,'Denise Regina',6,'ITAÚ',288.00,'',4,'Sheyla Lyra'),(48,'2020-01-07','',4,'Custo Fixo',80,'MDLivre',6,'ITAÚ',40.00,'',4,'Sheyla Lyra'),(49,'2020-01-07','',5,'Fisco',26,'FGTS',6,'ITAÚ',260.00,'',4,'Sheyla Lyra'),(50,'2020-01-07','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',36.00,'quentinhas',4,'Sheyla Lyra'),(51,'2020-01-07','',10,'Costura Externa',83,'Paulo Roberto',6,'ITAÚ',323.00,'',4,'Sheyla Lyra'),(52,'2020-01-07','',10,'Costura Externa',84,'Jaqueline Leão',6,'ITAÚ',240.00,'',4,'Sheyla Lyra'),(53,'2020-01-07','',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',20.00,'agua',4,'Sheyla Lyra'),(54,'2020-01-07','',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',161.50,'combustivel',4,'Sheyla Lyra'),(55,'2020-01-08','',1,'Funcionários',16,'Daniel Boca',6,'ITAÚ',128.20,'passagem',4,'Sheyla Lyra'),(56,'2020-01-08','',1,'Funcionários',14,'Dodô',6,'ITAÚ',128.20,'passagem',4,'Sheyla Lyra'),(57,'2020-01-08','',1,'Funcionários',11,'Fabiano',6,'ITAÚ',128.20,'passagem',4,'Sheyla Lyra'),(58,'2020-01-08','',1,'Funcionários',18,'Caio',6,'ITAÚ',128.20,'passagem',4,'Sheyla Lyra'),(59,'2020-01-08','',1,'Funcionários',10,'Henrique',4,'COFRE',650.00,'',4,'Sheyla Lyra'),(60,'2020-01-08','',1,'Funcionários',81,'Rose',4,'COFRE',256.00,'passagem',4,'Sheyla Lyra'),(61,'2020-01-08','',1,'Funcionários',13,'Josefa',4,'COFRE',128.00,'passagem',4,'Sheyla Lyra'),(62,'2020-01-08','',1,'Funcionários',24,'Sheyla',4,'COFRE',22.00,'',4,'Sheyla Lyra'),(63,'2020-01-08','',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',5.00,'',4,'Sheyla Lyra'),(64,'2020-01-08','',3,'Mat de Expediente',36,'Fitas Adesivas',4,'COFRE',5.00,'',4,'Sheyla Lyra'),(65,'2020-01-08','',1,'Funcionários',15,'Betchola',4,'COFRE',128.20,'passagem',4,'Sheyla Lyra'),(66,'2020-01-08','',1,'Funcionários',24,'Sheyla',4,'COFRE',7.00,'',4,'Sheyla Lyra'),(67,'2020-01-08','',1,'Funcionários',10,'Henrique',6,'ITAÚ',654.52,'aluguel',4,'Sheyla Lyra'),(68,'2020-01-08','',1,'Funcionários',10,'Henrique',6,'ITAÚ',99.29,'luz',4,'Sheyla Lyra'),(69,'2020-01-09','',10,'Costura Externa',69,'Maria Graças',6,'ITAÚ',539.00,'',4,'Sheyla Lyra'),(70,'2020-01-09','',1,'Funcionários',81,'Rose',6,'ITAÚ',1564.00,'pagamento mes de dezembro',4,'Sheyla Lyra'),(71,'2020-01-09','',1,'Funcionários',13,'Josefa',6,'ITAÚ',1962.20,'pagamento mes de dezembro e sabado',4,'Sheyla Lyra'),(72,'2020-01-09','',10,'Costura Externa',73,'Denise Telles',6,'ITAÚ',300.00,'',4,'Sheyla Lyra'),(73,'2020-01-09','',10,'Costura Externa',71,'Lucilene Domingos',6,'ITAÚ',300.00,'',4,'Sheyla Lyra'),(74,'2020-01-09','',1,'Funcionários',11,'Fabiano',6,'ITAÚ',50.00,'passagem referente ao dia 03/01',4,'Sheyla Lyra'),(75,'2020-01-09','',3,'Mat de Expediente',30,'Café',4,'COFRE',20.00,'agua',4,'Sheyla Lyra'),(76,'2020-01-09','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',52.00,'',4,'Sheyla Lyra'),(77,'2020-01-09','',10,'Costura Externa',78,'Fátima Cristina',4,'COFRE',410.00,'',4,'Sheyla Lyra'),(78,'2020-01-09','',4,'Custo Fixo',85,'combustivel',4,'COFRE',70.00,'',4,'Sheyla Lyra'),(79,'2020-01-09','',3,'Mat de Expediente',33,'´Pão',4,'COFRE',10.00,'',4,'Sheyla Lyra'),(80,'2020-01-10','',1,'Funcionários',24,'Sheyla',4,'COFRE',100.00,'vale',4,'Sheyla Lyra'),(81,'2020-01-10','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',40.00,'quentinha',4,'Sheyla Lyra'),(82,'2020-01-10','',1,'Funcionários',22,'Anny',4,'COFRE',5.00,'vale',4,'Sheyla Lyra'),(83,'2020-01-10','',10,'Costura Externa',84,'Jaqueline Leão',4,'COFRE',30.00,'uber ',4,'Sheyla Lyra'),(84,'2020-01-10','',10,'Costura Externa',77,'Vera Lúcia',4,'COFRE',20.00,'uber',4,'Sheyla Lyra'),(85,'2020-01-10','',1,'Funcionários',22,'Anny',6,'ITAÚ',15.00,'',4,'Sheyla Lyra'),(86,'2020-01-10','',4,'Custo Fixo',85,'combustivel',4,'COFRE',50.00,'',4,'Sheyla Lyra'),(87,'2020-01-10','',4,'Custo Fixo',8,'Contador',6,'ITAÚ',600.00,'',4,'Sheyla Lyra'),(88,'2020-01-10','',4,'Custo Fixo',86,'Correios',6,'ITAÚ',1294.81,'',4,'Sheyla Lyra'),(89,'2020-01-10','',4,'Custo Fixo',87,'marketing',6,'ITAÚ',300.00,'Nilo',4,'Sheyla Lyra'),(90,'2020-01-10','',4,'Custo Fixo',87,'marketing',6,'ITAÚ',300.00,'fuzileiro',4,'Sheyla Lyra'),(91,'2020-01-10','',10,'Costura Externa',78,'Fátima Cristina',6,'ITAÚ',288.00,'240 bolsas M',4,'Sheyla Lyra'),(92,'2020-01-10','',1,'Funcionários',20,'Luana',6,'ITAÚ',867.00,'',4,'Sheyla Lyra'),(93,'2020-01-10','',3,'Mat de Expediente',33,'´Pão',4,'COFRE',10.00,'',4,'Sheyla Lyra'),(94,'2020-01-10','',3,'Mat de Expediente',45,'Material Limpeza',4,'COFRE',50.00,'peca do banheiro',4,'Sheyla Lyra'),(95,'2020-01-14','',1,'Funcionários',9,'Daniel',6,'ITAÚ',80.00,'vale dia 10/01',4,'Sheyla Lyra'),(96,'2020-01-14','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',50.00,'referente ao dia 13/01',4,'Sheyla Lyra'),(97,'2020-01-14','',3,'Mat de Expediente',33,'´Pão',4,'COFRE',12.50,'referente ao dia 13/01',4,'Sheyla Lyra'),(98,'2020-01-14','',1,'Funcionários',15,'Betchola',6,'ITAÚ',210.00,'vale referente ao dia 10/01',4,'Sheyla Lyra'),(99,'2020-01-14','',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',200.00,'concerto do telhado',4,'Sheyla Lyra'),(100,'2020-01-14','',4,'Custo Fixo',85,'combustivel',4,'COFRE',39.20,'',4,'Sheyla Lyra'),(101,'2020-01-14','',4,'Custo Fixo',4,'Água Fábrica',6,'ITAÚ',139.37,'agua de casa',4,'Sheyla Lyra'),(102,'2020-01-14','',1,'Funcionários',24,'Sheyla',6,'ITAÚ',274.43,'vale',4,'Sheyla Lyra'),(103,'2020-01-14','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',24.00,'',4,'Sheyla Lyra'),(104,'2020-01-14','',10,'Costura Externa',78,'Fátima Cristina',4,'COFRE',55.00,'uber',4,'Sheyla Lyra'),(105,'2020-01-14','',1,'Funcionários',21,'Chris',4,'COFRE',850.00,'vale',4,'Sheyla Lyra'),(106,'2020-01-14','',4,'Custo Fixo',88,'Colegio JJ',6,'ITAÚ',508.50,'',4,'Sheyla Lyra'),(107,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',289.15,'reclamacao',4,'Sheyla Lyra'),(108,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',170.00,'frete',4,'Sheyla Lyra'),(109,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',30.60,'reclamacao',4,'Sheyla Lyra'),(110,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',29.40,'reclamacao',4,'Sheyla Lyra'),(111,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',38.40,'reclamacao',4,'Sheyla Lyra'),(112,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',23.40,'reclamacao',4,'Sheyla Lyra'),(113,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',27.40,'reclamacao',4,'Sheyla Lyra'),(114,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',53.00,'reclamacao',4,'Sheyla Lyra'),(115,'2020-01-14','',8,'Mercado Livre',62,'Devolução JC',6,'ITAÚ',23.00,'reclamacao',4,'Sheyla Lyra'),(116,'2020-01-14','',10,'Costura Externa',84,'Jaqueline Leão',6,'ITAÚ',240.00,'120 camel',4,'Sheyla Lyra'),(117,'2020-01-14','',10,'Costura Externa',65,'Wilton Silva',6,'ITAÚ',300.00,'30 plate',4,'Sheyla Lyra'),(118,'2020-01-14','',10,'Costura Externa',69,'Maria Graças',6,'ITAÚ',408.00,'240 coldres',4,'Sheyla Lyra'),(119,'2020-01-14','',10,'Costura Externa',68,'Lucení Gandra',6,'ITAÚ',360.00,'240 fz',4,'Sheyla Lyra'),(120,'2020-01-14','',10,'Costura Externa',72,'Sandra Liz',6,'ITAÚ',144.00,'120 bp',4,'Sheyla Lyra'),(121,'2020-01-14','',10,'Costura Externa',83,'Paulo Roberto',6,'ITAÚ',188.70,'111 coldres',4,'Sheyla Lyra'),(122,'2020-01-14','',10,'Costura Externa',67,'Adriana Rodrigues',6,'ITAÚ',180.00,'120 fz velcro',4,'Sheyla Lyra'),(123,'2020-01-14','',10,'Costura Externa',89,'Angela',6,'ITAÚ',288.00,'240 bm',4,'Sheyla Lyra'),(124,'2020-01-14','',1,'Funcionários',9,'Daniel',6,'ITAÚ',20.00,'vale',4,'Sheyla Lyra'),(125,'2020-01-16','',1,'Funcionários',9,'Daniel',4,'COFRE',200.00,'vale',4,'Sheyla Lyra'),(126,'2020-01-16','',12,'Produtos Loja',91,'Centro',6,'ITAÚ',2000.00,'Material loja ',4,'Sheyla Lyra'),(127,'2020-01-16','',3,'Mat de Expediente',39,'Saco Bobina',4,'COFRE',100.00,'',4,'Sheyla Lyra'),(128,'2020-01-16','',4,'Custo Fixo',85,'combustivel',4,'COFRE',30.95,'',4,'Sheyla Lyra'),(129,'2020-01-16','',10,'Costura Externa',78,'Fátima Cristina',4,'COFRE',55.00,'',4,'Sheyla Lyra'),(130,'2020-01-16','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',78.00,'',4,'Sheyla Lyra'),(131,'2020-01-16','',10,'Costura Externa',78,'Fátima Cristina',6,'ITAÚ',260.00,'',4,'Sheyla Lyra'),(132,'2020-01-21','',4,'Custo Fixo',85,'combustivel',4,'COFRE',100.00,'',4,'Sheyla Lyra'),(133,'2020-01-21','',10,'Costura Externa',77,'Vera Lúcia',4,'COFRE',360.80,'360 bp',4,'Sheyla Lyra'),(134,'2020-01-21','',2,'Materia Prima',52,'Eduardo',6,'ITAÚ',2650.00,'',4,'Sheyla Lyra'),(135,'2020-01-21','',5,'Fisco',27,'GPS',6,'ITAÚ',152.53,'',4,'Sheyla Lyra'),(136,'2020-01-21','',4,'Custo Fixo',5,'Luz Loja',6,'ITAÚ',135.01,'',4,'Sheyla Lyra'),(137,'2020-01-21','',4,'Custo Fixo',93,'Seguro',6,'ITAÚ',188.03,'carro Daniel',4,'Sheyla Lyra'),(138,'2020-01-21','',1,'Funcionários',9,'Daniel',6,'ITAÚ',200.00,'vale',4,'Sheyla Lyra'),(139,'2020-01-21','',1,'Funcionários',15,'Betchola',6,'ITAÚ',250.00,'vale',4,'Sheyla Lyra'),(140,'2020-01-21','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',42.00,'',4,'Sheyla Lyra'),(141,'2020-01-21','',1,'Funcionários',24,'Sheyla',6,'ITAÚ',299.84,'',4,'Sheyla Lyra'),(142,'2020-01-22','',4,'Custo Fixo',96,'Aluguel casa',6,'ITAÚ',1720.00,'obs tranferencia eric 1336,69 aluguel',4,'Sheyla Lyra'),(143,'2020-01-22','',4,'Custo Fixo',2,'Aluguel Fábrica',6,'ITAÚ',1600.00,'galpao',4,'Sheyla Lyra'),(144,'2020-01-22','',4,'Custo Fixo',97,'Net casa',6,'ITAÚ',308.86,'',4,'Sheyla Lyra'),(145,'2020-01-22','',4,'Custo Fixo',98,'Luz casa',6,'ITAÚ',660.98,'',4,'Sheyla Lyra'),(146,'2020-01-22','',1,'Funcionários',14,'Dodô',6,'ITAÚ',108.10,'sabado',4,'Sheyla Lyra'),(147,'2020-01-22','',1,'Funcionários',18,'Caio',6,'ITAÚ',83.10,'sabado',4,'Sheyla Lyra'),(148,'2020-01-22','',1,'Funcionários',16,'Daniel Boca',6,'ITAÚ',83.10,'sabado',4,'Sheyla Lyra'),(149,'2020-01-22','',1,'Funcionários',15,'Betchola',4,'COFRE',83.10,'sabado',4,'Sheyla Lyra'),(150,'2020-01-22','',1,'Funcionários',11,'Fabiano',6,'ITAÚ',150.00,'sabado',4,'Sheyla Lyra'),(151,'2020-01-22','',10,'Costura Externa',71,'Lucilene Domingos',6,'ITAÚ',400.00,'40 plates',4,'Sheyla Lyra'),(152,'2020-01-22','',10,'Costura Externa',73,'Denise Telles',6,'ITAÚ',200.00,'20 plates',4,'Sheyla Lyra'),(153,'2020-01-22','',10,'Costura Externa',70,'Denise Regina',6,'ITAÚ',720.00,'600 BP',4,'Sheyla Lyra'),(154,'2020-01-22','',10,'Costura Externa',84,'Jaqueline Leão',6,'ITAÚ',240.00,'120 camel',4,'Sheyla Lyra'),(155,'2020-01-22','',10,'Costura Externa',66,'Míriam Braga Amorim',6,'ITAÚ',285.00,'150 camel',4,'Sheyla Lyra'),(156,'2020-01-22','',10,'Costura Externa',72,'Sandra Liz',6,'ITAÚ',144.00,'',4,'Sheyla Lyra'),(157,'2020-01-22','',10,'Costura Externa',69,'Maria Graças',6,'ITAÚ',408.00,'240 coldres',4,'Sheyla Lyra'),(158,'2020-01-22','',10,'Costura Externa',76,'Eliane Vandramini',6,'ITAÚ',900.00,'90 closes',4,'Sheyla Lyra'),(159,'2020-01-24','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',30.00,'dia 23',4,'Sheyla Lyra'),(160,'2020-01-24','',4,'Custo Fixo',85,'combustivel',4,'COFRE',42.58,'dia 23',4,'Sheyla Lyra'),(161,'2020-01-24','',4,'Custo Fixo',1,'Aluguel Loja',4,'COFRE',1700.00,'dia 23',4,'Sheyla Lyra'),(162,'2020-01-24','',4,'Custo Fixo',3,'Água Loja',4,'COFRE',102.50,'dia 23',4,'Sheyla Lyra'),(163,'2020-01-24','',1,'Funcionários',15,'Betchola',6,'ITAÚ',500.00,'vale transferencia conta caio',4,'Sheyla Lyra'),(164,'2020-01-24','',1,'Funcionários',17,'Danrlei',6,'ITAÚ',83.10,'dia 23referente a sabado 04/01',4,'Sheyla Lyra'),(165,'2020-01-24','',10,'Costura Externa',74,'André Ferreira',6,'ITAÚ',960.00,'600 pst',4,'Sheyla Lyra'),(166,'2020-01-24','',1,'Funcionários',24,'Sheyla',4,'COFRE',200.00,'pagamento Henrique vale Jean',4,'Sheyla Lyra'),(167,'2020-01-24','',3,'Mat de Expediente',46,'Almoxerifado',6,'ITAÚ',20.00,'agua ',4,'Sheyla Lyra'),(168,'2020-01-24','',10,'Costura Externa',84,'Jaqueline Leão',4,'COFRE',30.00,'uber',4,'Sheyla Lyra'),(169,'2020-01-24','',4,'Custo Fixo',86,'Correios',6,'ITAÚ',1806.60,'',4,'Sheyla Lyra'),(170,'2020-01-24','',3,'Mat de Expediente',40,'Saco Merc Livre',3,'ML JC',379.00,'',4,'Sheyla Lyra'),(171,'2020-01-24','',1,'Funcionários',13,'Josefa',6,'ITAÚ',150.00,'Sabado 25/01',4,'Sheyla Lyra'),(172,'2020-01-24','',1,'Funcionários',9,'Daniel',6,'ITAÚ',200.00,'Sabado 25/01',4,'Sheyla Lyra'),(173,'2020-01-24','',1,'Funcionários',14,'Dodô',6,'ITAÚ',108.10,'Sabado 25/01',4,'Sheyla Lyra'),(174,'2020-01-24','',1,'Funcionários',16,'Daniel Boca',6,'ITAÚ',83.10,'Sabado 25/01',4,'Sheyla Lyra'),(175,'2020-01-24','',1,'Funcionários',17,'Danrlei',6,'ITAÚ',83.10,'Sabado 25/01',4,'Sheyla Lyra'),(176,'2020-01-24','',1,'Funcionários',18,'Caio',6,'ITAÚ',83.10,'Sabado 25/01',4,'Sheyla Lyra'),(177,'2020-01-24','',4,'Custo Fixo',99,'Faculdade',6,'ITAÚ',100.00,'Chris',4,'Sheyla Lyra'),(178,'2020-01-24','',4,'Custo Fixo',82,'Servidor',6,'ITAÚ',52.50,'dominio',4,'Sheyla Lyra'),(179,'2020-01-24','',4,'Custo Fixo',100,'Curso',6,'ITAÚ',149.90,'Leticia ',4,'Sheyla Lyra'),(180,'2020-01-24','',4,'Custo Fixo',100,'Curso',6,'ITAÚ',155.40,'Leticia ',4,'Sheyla Lyra'),(181,'2020-01-24','',10,'Costura Externa',68,'Lucení Gandra',6,'ITAÚ',360.00,'240fz',4,'Sheyla Lyra'),(182,'2020-01-24','',10,'Costura Externa',67,'Adriana Rodrigues',6,'ITAÚ',180.00,'120fz',4,'Sheyla Lyra'),(183,'2020-01-24','',10,'Costura Externa',78,'Fátima Cristina',6,'ITAÚ',300.00,'30 plaite',4,'Sheyla Lyra'),(192,'2020-02-04','',10,'Costura Externa',84,'Jaqueline Leão',4,'COFRE',30.00,'uber',4,'Sheyla Lyra'),(193,'2020-02-04','',4,'Custo Fixo',79,'Alimentação',4,'COFRE',42.00,'',4,'Sheyla Lyra'),(194,'2020-02-04','',10,'Costura Externa',76,'Eliane Vandramini',6,'ITAÚ',950.00,'95 coletes 03/02',4,'Sheyla Lyra'),(195,'2020-02-04','',10,'Costura Externa',89,'Angela',6,'ITAÚ',288.00,'240 bm 03/02',4,'Sheyla Lyra'),(196,'2020-02-04','',1,'Funcionários',15,'Betchola',4,'COFRE',20.00,'passagem 03/02',4,'Sheyla Lyra'),(197,'2020-02-04','',1,'Funcionários',14,'Dodô',4,'COFRE',20.00,'passagem 03/02',4,'Sheyla Lyra'),(198,'2020-02-04','',1,'Funcionários',14,'Dodô',6,'ITAÚ',1333.00,'pagamento 03/02',4,'Sheyla Lyra'),(199,'2020-02-04','',4,'Custo Fixo',85,'combustivel',4,'COFRE',38.00,'',4,'Sheyla Lyra'),(200,'2020-02-04','',1,'Funcionários',24,'Sheyla',6,'ITAÚ',30.00,'',4,'Sheyla Lyra'),(201,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.50,'Diferença do valor para completar Caixa chris',1,'Henrique Lyra'),(202,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'13/04',1,'Henrique Lyra'),(203,'2020-04-22','',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',5.50,'13/04',1,'Henrique Lyra'),(204,'2020-04-22','',3,'Mat de Expediente',36,'Fitas Adesivas',4,'COFRE',4.90,'13/04',1,'Henrique Lyra'),(205,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'13/04 tarde',1,'Henrique Lyra'),(206,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'14/04 manhã ',1,'Henrique Lyra'),(207,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'14/04 tarde',1,'Henrique Lyra'),(208,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'15/04 manhã',1,'Henrique Lyra'),(209,'2020-04-22','',3,'Mat de Expediente',30,'Café',4,'COFRE',12.00,'Café 15/04',1,'Henrique Lyra'),(210,'2020-04-22','',3,'Mat de Expediente',31,'Açucar',4,'COFRE',3.50,'15/04',1,'Henrique Lyra'),(211,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'15/04 tarde',1,'Henrique Lyra'),(212,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'16/04 Manhã',1,'Henrique Lyra'),(213,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'16/04 tarde',1,'Henrique Lyra'),(214,'2020-04-22','',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',6.00,'16/04',1,'Henrique Lyra'),(215,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'17/04 Manhã',1,'Henrique Lyra'),(216,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'17/04 Tarde',1,'Henrique Lyra'),(217,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'20/04 Manhã',1,'Henrique Lyra'),(218,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'20/04 Tarde',1,'Henrique Lyra'),(219,'2020-04-22','',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'22/04 Manhã',1,'Henrique Lyra'),(220,'2020-04-22','',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',6.00,'',1,'Henrique Lyra'),(221,'2020-04-22','22-04-2020-17:11:37',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'',1,'Henrique Lyra'),(222,'2020-04-23','23-04-2020-11:49:30',3,'Mat de Expediente',102,'Super bonder',4,'COFRE',14.00,'2 unidades',1,'Henrique Lyra'),(223,'2020-04-23','23-04-2020-11:50:27',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(224,'2020-04-24','24-04-2020-10:50:5',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'',1,'Henrique Lyra'),(225,'2020-04-24','24-04-2020-10:50:19',3,'Mat de Expediente',36,'Fitas Adesivas',4,'COFRE',4.90,'',1,'Henrique Lyra'),(226,'2020-04-24','24-04-2020-11:57:8',3,'Mat de Expediente',103,'Papel Pardo',4,'COFRE',5.40,'3 unidades de $1.8',1,'Henrique Lyra'),(227,'2020-04-27','27-04-2020-18:18:15',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'Manhã ',1,'Henrique Lyra'),(228,'2020-04-27','27-04-2020-18:18:30',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'Tarde',1,'Henrique Lyra'),(229,'2020-04-27','27-04-2020-18:18:50',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',7.00,'',1,'Henrique Lyra'),(230,'2020-04-28','28-04-2020-9:18:18',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(231,'2020-04-28','28-04-2020-12:51:4',3,'Mat de Expediente',45,'Material Limpeza',4,'COFRE',6.00,'',1,'Henrique Lyra'),(232,'2020-04-30','30-04-2020-8:15:17',3,'Mat de Expediente',101,'Pão',4,'COFRE',5.00,'Pao da tarde 29/04',1,'Henrique Lyra'),(233,'2020-04-30','30-04-2020-8:15:33',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'',1,'Henrique Lyra'),(234,'2020-04-30','30-04-2020-8:15:50',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',5.50,'',1,'Henrique Lyra'),(235,'2020-05-04','04-05-2020-17:2:16',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'Pao manha',1,'Henrique Lyra'),(236,'2020-05-04','04-05-2020-17:2:32',3,'Mat de Expediente',35,'Folha A4',4,'COFRE',7.90,'',1,'Henrique Lyra'),(237,'2020-05-04','04-05-2020-17:2:47',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'',1,'Henrique Lyra'),(238,'2020-05-05','05-05-2020-8:33:59',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'',1,'Henrique Lyra'),(239,'2020-05-06','06-05-2020-9:48:49',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(240,'2020-05-06','06-05-2020-9:49:12',3,'Mat de Expediente',35,'Folha A4',4,'COFRE',7.90,'',1,'Henrique Lyra'),(241,'2020-05-07','07-05-2020-8:52:46',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(242,'2020-05-07','07-05-2020-8:53:0',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',8.00,'',1,'Henrique Lyra'),(243,'2020-05-12','12-05-2020-8:4:31',3,'Mat de Expediente',101,'Pão',4,'COFRE',5.00,'11/05 tarde',1,'Henrique Lyra'),(244,'2020-05-12','12-05-2020-8:4:47',3,'Mat de Expediente',31,'Açucar',4,'COFRE',3.50,'',1,'Henrique Lyra'),(245,'2020-05-12','12-05-2020-8:5:8',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(246,'2020-05-13','13-05-2020-14:9:6',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'',1,'Henrique Lyra'),(247,'2020-05-13','13-05-2020-14:9:59',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',4.00,'Lápis para corte',1,'Henrique Lyra'),(248,'2020-05-13','13-05-2020-14:10:54',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',7.00,'',1,'Henrique Lyra'),(249,'2020-05-14','14-05-2020-16:10:33',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'13-05 tarde',1,'Henrique Lyra'),(250,'2020-05-14','14-05-2020-16:10:55',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'14-05 manhã',1,'Henrique Lyra'),(251,'2020-05-14','14-05-2020-19:5:17',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',14.00,'Esparadrapo',1,'Henrique Lyra'),(252,'2020-05-15','15-05-2020-9:54:29',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'',1,'Henrique Lyra'),(253,'2020-05-15','15-05-2020-9:55:13',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'Pao da tarde 14/05',1,'Henrique Lyra'),(254,'2020-05-15','15-05-2020-9:55:25',3,'Mat de Expediente',31,'Açucar',4,'COFRE',3.50,'',1,'Henrique Lyra'),(255,'2020-05-18','18-05-2020-21:36:54',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'Pão da manhã 18/05',1,'Henrique Lyra'),(256,'2020-05-18','18-05-2020-21:37:21',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'Pão da tarde',1,'Henrique Lyra'),(257,'2020-05-19','19-05-2020-11:58:50',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(258,'2020-05-19','19-05-2020-11:59:10',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',14.00,'Esparadrapo',1,'Henrique Lyra'),(259,'2020-05-21','21-05-2020-14:26:49',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(260,'2020-05-25','25-05-2020-8:39:4',10,'Costura Externa',84,'Jaqueline Leão',4,'COFRE',80.00,'Uber 2 viagens',1,'Henrique Lyra'),(261,'2020-05-25','25-05-2020-8:39:23',10,'Costura Externa',67,'Adriana Rodrigues',4,'COFRE',20.00,'Ajuda no gás ',1,'Henrique Lyra'),(262,'2020-05-25','25-05-2020-8:43:2',10,'Costura Externa',78,'Fátima Cristina',4,'COFRE',30.00,'',1,'Henrique Lyra'),(263,'2020-06-01','01-06-2020-16:34:5',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',7.00,'Piloto',1,'Henrique Lyra'),(264,'2020-06-01','01-06-2020-16:34:50',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(265,'2020-06-01','01-06-2020-16:35:39',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',6.50,'Fita dupla face',1,'Henrique Lyra'),(266,'2020-06-01','01-06-2020-16:57:33',3,'Mat de Expediente',30,'Café',4,'COFRE',12.00,'',1,'Henrique Lyra'),(267,'2020-06-01','01-06-2020-16:57:53',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'',1,'Henrique Lyra'),(268,'2020-06-01','01-06-2020-16:59:8',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',12.60,'Parafusos para maquina de botao',1,'Henrique Lyra'),(269,'2020-06-03','03-06-2020-23:17:31',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'Pão manhã ',1,'Henrique Lyra'),(270,'2020-06-03','03-06-2020-23:17:50',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'Pão tarde',1,'Henrique Lyra'),(271,'2020-06-03','03-06-2020-23:18:16',3,'Mat de Expediente',45,'Material Limpeza',4,'COFRE',6.00,'Soda cáustica ',1,'Henrique Lyra'),(272,'2020-06-03','03-06-2020-23:20:11',13,'Despesas Extras',104,'Motoboy',4,'COFRE',30.00,'Buscar Fz na Luceni ',1,'Henrique Lyra'),(273,'2020-06-03','03-06-2020-23:22:11',10,'Costura Externa',78,'Fátima Cristina',4,'COFRE',40.00,'Uber',1,'Henrique Lyra'),(274,'2020-06-03','03-06-2020-23:22:32',10,'Costura Externa',89,'Angela',4,'COFRE',20.00,'Ajuda no gás ',1,'Henrique Lyra'),(275,'2020-07-03','03-07-2020-12:29:16',3,'Mat de Expediente',39,'Saco Bobina',4,'COFRE',28.00,'',1,'Henrique Lyra'),(276,'2020-07-03','03-07-2020-12:30:16',10,'Costura Externa',105,'Solange',4,'COFRE',95.00,'',1,'Henrique Lyra'),(277,'2020-07-04','04-07-2020-16:33:20',4,'Custo Fixo',85,'combustivel',4,'COFRE',30.00,'Uber pra Eliane',1,'Henrique Lyra'),(278,'2020-07-06','06-07-2020-11:14:38',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Gás Adriana externa',1,'Henrique Lyra'),(279,'2020-07-07','07-07-2020-11:25:21',4,'Custo Fixo',85,'combustivel',4,'COFRE',15.00,'Passagem Kezia levar serviço ',1,'Henrique Lyra'),(280,'2020-07-08','08-07-2020-10:39:45',10,'Costura Externa',106,'Carla',4,'COFRE',130.00,'Pagamento em dinheiro',1,'Henrique Lyra'),(281,'2020-07-09','09-07-2020-18:8:39',4,'Custo Fixo',85,'combustivel',4,'COFRE',35.00,'Uber pra Eliane anchieta',1,'Henrique Lyra'),(282,'2020-07-09','09-07-2020-18:9:33',3,'Mat de Expediente',45,'Material Limpeza',4,'COFRE',2.00,'Detergente',1,'Henrique Lyra'),(283,'2020-07-09','09-07-2020-18:9:59',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(284,'2020-07-10','10-07-2020-9:35:34',3,'Mat de Expediente',30,'Café',4,'COFRE',13.00,'',1,'Henrique Lyra'),(285,'2020-07-10','10-07-2020-9:35:55',3,'Mat de Expediente',45,'Material Limpeza',4,'COFRE',8.00,'Vassoura',1,'Henrique Lyra'),(286,'2020-07-10','10-07-2020-12:58:47',3,'Mat de Expediente',39,'Saco Bobina',4,'COFRE',28.00,'',1,'Henrique Lyra'),(287,'2020-07-10','10-07-2020-17:19:57',4,'Custo Fixo',85,'combustivel',4,'COFRE',30.00,'Uber madureira',1,'Henrique Lyra'),(288,'2020-07-10','10-07-2020-17:20:11',3,'Mat de Expediente',101,'Pão',4,'COFRE',2.00,'',1,'Henrique Lyra'),(289,'2020-07-13','13-07-2020-18:2:17',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'Manhã ',1,'Henrique Lyra'),(290,'2020-07-13','13-07-2020-18:2:35',3,'Mat de Expediente',31,'Açucar',4,'COFRE',5.00,'',1,'Henrique Lyra'),(291,'2020-07-13','13-07-2020-18:3:8',10,'Costura Externa',105,'Solange',4,'COFRE',112.00,'',1,'Henrique Lyra'),(292,'2020-07-13','13-07-2020-18:5:43',10,'Costura Externa',84,'Jaqueline Leão',4,'COFRE',40.00,'Uber',1,'Henrique Lyra'),(293,'2020-07-14','14-07-2020-13:9:36',3,'Mat de Expediente',36,'Fitas Adesivas',4,'COFRE',4.90,'Durex',1,'Henrique Lyra'),(294,'2020-07-14','14-07-2020-17:6:26',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',4.50,'Giz de cera',1,'Henrique Lyra'),(295,'2020-07-14','14-07-2020-17:7:8',3,'Mat de Expediente',101,'Pão',4,'COFRE',4.00,'',1,'Henrique Lyra'),(296,'2020-07-15','15-07-2020-16:18:55',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Adriana externa gás ',1,'Henrique Lyra'),(297,'2020-07-15','15-07-2020-17:32:18',3,'Mat de Expediente',101,'Pão',4,'COFRE',6.00,'Pão da tarde',1,'Henrique Lyra'),(298,'2020-07-16','16-07-2020-22:48:34',13,'Despesas Extras',104,'Motoboy',4,'COFRE',70.00,'Sacolas ML/Rosimere/Sabrina/paulo',1,'Henrique Lyra'),(299,'2020-07-17','17-07-2020-16:35:40',4,'Custo Fixo',85,'combustivel',9,'CHEQUE',40.00,'Uber madureira',1,'Henrique Lyra'),(300,'2020-07-17','17-07-2020-18:38:47',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',6.00,'4 canetas',1,'Henrique Lyra'),(301,'2020-07-17','17-07-2020-18:39:5',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'Pão da manhã ',1,'Henrique Lyra'),(302,'2020-07-19','19-07-2020-0:4:6',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Combustível Luceni Gandra',1,'Henrique Lyra'),(303,'2020-07-19','19-07-2020-0:6:10',13,'Despesas Extras',104,'Motoboy',4,'COFRE',20.00,'Solange',1,'Henrique Lyra'),(304,'2020-07-19','19-07-2020-0:9:31',10,'Costura Externa',105,'Solange',4,'COFRE',121.00,'(90+71-10)*0,8=121,00',1,'Henrique Lyra'),(305,'2020-07-23','23-07-2020-16:23:17',3,'Mat de Expediente',45,'Material Limpeza',4,'COFRE',5.00,'Cloro / detergente',1,'Henrique Lyra'),(306,'2020-07-24','24-07-2020-2:43:23',13,'Despesas Extras',104,'Motoboy',4,'COFRE',150.00,'Moisés - Dia 23/07',1,'Henrique Lyra'),(307,'2020-07-24','24-07-2020-2:44:44',3,'Mat de Expediente',101,'Pão',4,'COFRE',15.00,'Pão do dia 24/07',1,'Henrique Lyra'),(308,'2020-07-24','24-07-2020-12:53:15',4,'Custo Fixo',85,'combustivel',4,'COFRE',50.00,'Uber jaqueline',1,'Henrique Lyra'),(309,'2020-07-28','28-07-2020-18:30:22',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Dailane',1,'Henrique Lyra'),(310,'2020-07-28','28-07-2020-18:30:43',3,'Mat de Expediente',31,'Açucar',4,'COFRE',3.65,'',1,'Henrique Lyra'),(311,'2020-07-28','28-07-2020-18:31:0',3,'Mat de Expediente',30,'Café',4,'COFRE',12.90,'',1,'Henrique Lyra'),(312,'2020-07-28','28-07-2020-18:31:15',3,'Mat de Expediente',101,'Pão',4,'COFRE',6.00,'',1,'Henrique Lyra'),(313,'2020-07-29','29-07-2020-9:40:10',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Ângela ',1,'Henrique Lyra'),(314,'2020-07-29','29-07-2020-15:32:11',3,'Mat de Expediente',101,'Pão',4,'COFRE',8.40,'',1,'Henrique Lyra'),(315,'2020-07-29','29-07-2020-15:32:26',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',7.50,'',1,'Henrique Lyra'),(316,'2020-07-30','30-07-2020-15:50:55',3,'Mat de Expediente',101,'Pão',4,'COFRE',8.40,'',1,'Henrique Lyra'),(317,'2020-07-30','30-07-2020-15:51:19',3,'Mat de Expediente',31,'Açucar',4,'COFRE',3.65,'',1,'Henrique Lyra'),(318,'2020-07-30','30-07-2020-15:51:42',3,'Mat de Expediente',30,'Café',4,'COFRE',12.90,'',1,'Henrique Lyra'),(319,'2020-07-31','31-07-2020-9:30:5',7,'Máquinas',108,'Óleo',4,'COFRE',29.70,'Fabiano',1,'Henrique Lyra'),(320,'2020-07-31','31-07-2020-10:0:57',3,'Mat de Expediente',45,'Material Limpeza',4,'COFRE',3.50,'Pano de chão',1,'Henrique Lyra'),(321,'2020-07-31','31-07-2020-10:12:13',3,'Mat de Expediente',109,'Giz de cera',4,'COFRE',6.00,'',1,'Henrique Lyra'),(322,'2020-07-31','31-07-2020-10:13:1',3,'Mat de Expediente',46,'Almoxerifado',4,'COFRE',4.50,'Caneta piloto corte cadarço ',1,'Henrique Lyra'),(323,'2020-07-31','31-07-2020-13:20:1',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Uber Mariane (Cinto/Algema/BG)',1,'Henrique Lyra'),(324,'2020-08-03','03-08-2020-15:29:53',3,'Mat de Expediente',101,'Pão',4,'COFRE',7.00,'Pão 31/07 e 01/08',1,'Henrique Lyra'),(325,'2020-08-03','03-08-2020-15:30:20',3,'Mat de Expediente',101,'Pão',4,'COFRE',6.00,'',1,'Henrique Lyra'),(326,'2020-08-04','04-08-2020-10:14:47',3,'Mat de Expediente',39,'Saco Bobina',4,'COFRE',30.60,'Saco transparente',1,'Henrique Lyra'),(327,'2020-08-04','04-08-2020-16:22:53',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'',1,'Henrique Lyra'),(328,'2020-08-04','04-08-2020-19:12:28',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Uber Mariana ',1,'Henrique Lyra'),(329,'2020-08-04','04-08-2020-19:13:43',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Fabiano madureira ',1,'Henrique Lyra'),(330,'2020-08-05','05-08-2020-16:14:58',3,'Mat de Expediente',101,'Pão',4,'COFRE',3.00,'Pão 04/08',1,'Henrique Lyra'),(331,'2020-08-05','05-08-2020-16:15:10',3,'Mat de Expediente',101,'Pão',4,'COFRE',6.00,'Pão da manhã ',1,'Henrique Lyra'),(332,'2020-08-05','05-08-2020-16:15:31',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',7.50,'',1,'Henrique Lyra'),(333,'2020-08-05','05-08-2020-16:15:45',3,'Mat de Expediente',101,'Pão',4,'COFRE',7.80,'',1,'Henrique Lyra'),(334,'2020-08-07','07-08-2020-12:46:5',4,'Custo Fixo',85,'combustivel',4,'COFRE',26.00,'Uber madureira',1,'Henrique Lyra'),(335,'2020-08-10','10-08-2020-10:20:37',3,'Mat de Expediente',30,'Café',4,'COFRE',6.19,'',1,'Henrique Lyra'),(336,'2020-08-10','10-08-2020-10:20:57',3,'Mat de Expediente',31,'Açucar',4,'COFRE',3.09,'',1,'Henrique Lyra'),(337,'2020-08-10','10-08-2020-11:17:27',10,'Costura Externa',89,'Angela',4,'COFRE',300.00,'Pagamento Ângela (recebeu pro dia dos pais)',1,'Henrique Lyra'),(338,'2020-08-10','10-08-2020-11:17:59',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Mariana uber',1,'Henrique Lyra'),(339,'2020-08-11','11-08-2020-18:23:9',4,'Custo Fixo',85,'combustivel',4,'COFRE',25.00,'Motoboy Solange',1,'Henrique Lyra'),(340,'2020-08-12','12-08-2020-14:54:13',3,'Mat de Expediente',36,'Fitas Adesivas',4,'COFRE',15.00,'Esparadrapo',1,'Henrique Lyra'),(341,'2020-08-12','12-08-2020-15:8:6',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',5.00,'',1,'Henrique Lyra'),(342,'2020-08-12','12-08-2020-15:8:30',3,'Mat de Expediente',101,'Pão',4,'COFRE',12.00,'Manhã e tarde 11/08',1,'Henrique Lyra'),(343,'2020-08-12','12-08-2020-15:8:44',3,'Mat de Expediente',101,'Pão',4,'COFRE',6.00,'',1,'Henrique Lyra'),(344,'2020-08-13','13-08-2020-15:32:22',3,'Mat de Expediente',32,'Manteiga',4,'COFRE',2.75,'',1,'Henrique Lyra'),(345,'2020-08-13','13-08-2020-15:32:42',3,'Mat de Expediente',101,'Pão',4,'COFRE',6.00,'',1,'Henrique Lyra'),(346,'2020-08-14','14-08-2020-14:31:49',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Uber Mariane Bolsa G',1,'Henrique Lyra'),(347,'2020-08-14','14-08-2020-14:33:16',3,'Mat de Expediente',39,'Saco Bobina',4,'COFRE',34.90,'',1,'Henrique Lyra'),(348,'2020-08-15','15-08-2020-21:2:26',10,'Costura Externa',89,'Angela',4,'COFRE',100.00,'',1,'Henrique Lyra'),(349,'2020-08-15','15-08-2020-21:2:47',4,'Custo Fixo',85,'combustivel',4,'COFRE',20.00,'Dailane combustível ',1,'Henrique Lyra');
/*!40000 ALTER TABLE `financial_outcome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_outcome_category`
--

DROP TABLE IF EXISTS `financial_outcome_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_outcome_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome_category`
--

LOCK TABLES `financial_outcome_category` WRITE;
/*!40000 ALTER TABLE `financial_outcome_category` DISABLE KEYS */;
INSERT INTO `financial_outcome_category` VALUES (10,'Costura Externa'),(4,'Custo Fixo'),(13,'Despesas Extras'),(5,'Fisco'),(1,'Funcionários'),(7,'Máquinas'),(6,'Marketing'),(3,'Mat de Expediente'),(2,'Materia Prima'),(8,'Mercado Livre'),(12,'Produtos Loja'),(11,'Saque'),(9,'Site');
/*!40000 ALTER TABLE `financial_outcome_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_outcome_origin`
--

DROP TABLE IF EXISTS `financial_outcome_origin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_outcome_origin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=110 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome_origin`
--

LOCK TABLES `financial_outcome_origin` WRITE;
/*!40000 ALTER TABLE `financial_outcome_origin` DISABLE KEYS */;
INSERT INTO `financial_outcome_origin` VALUES (1,4,'Aluguel Loja'),(2,4,'Aluguel Fábrica'),(3,4,'Água Loja'),(4,4,'Água Fábrica'),(5,4,'Luz Loja'),(6,4,'Luz Fábrica'),(7,4,'Telefone Loja'),(8,4,'Contador'),(9,1,'Daniel'),(10,1,'Henrique'),(11,1,'Fabiano'),(13,1,'Josefa'),(14,1,'Dodô'),(15,1,'Betchola'),(16,1,'Daniel Boca'),(17,1,'Danrlei'),(18,1,'Caio'),(19,1,'Luis Henrique'),(20,1,'Luana'),(21,1,'Chris'),(22,1,'Anny'),(23,1,'Jean'),(24,1,'Sheyla'),(25,5,'Nota Fiscal'),(26,5,'FGTS'),(27,5,'GPS'),(28,6,'Agência Macro'),(29,6,'Vídeos'),(30,3,'Café'),(31,3,'Açucar'),(32,3,'Manteiga'),(34,3,'Churrasco'),(35,3,'Folha A4'),(36,3,'Fitas Adesivas'),(37,3,'Sacola JA'),(38,3,'Saco de Lixo'),(39,3,'Saco Bobina'),(40,3,'Saco Merc Livre'),(41,3,'Saco Nota Fiscal'),(42,3,'Papel Higiênico'),(43,3,'Tinta Impressora'),(44,3,'Tonner Impressora'),(45,3,'Material Limpeza'),(46,3,'Almoxerifado'),(47,7,'Agulhas'),(48,7,'Peças'),(49,7,'Compra de Máquina'),(50,2,'Luã'),(51,2,'China'),(52,2,'Eduardo'),(53,2,'Adina'),(54,2,'Oiapoc'),(55,2,'Brasmac'),(56,2,'Jorge Etiqueta'),(57,2,'Cordon Textil'),(59,2,'Santex'),(60,2,'Rogério Emborrachado'),(61,8,'Devolução Chris'),(62,8,'Devolução JC'),(64,9,'Devolução Tray'),(65,10,'Wilton Silva'),(66,10,'Míriam Braga Amorim'),(67,10,'Adriana Rodrigues '),(68,10,'Lucení Gandra'),(69,10,'Maria Graças'),(70,10,'Denise Regina'),(71,10,'Lucilene Domingos'),(72,10,'Sandra Liz'),(73,10,'Denise Telles'),(74,10,'André Ferreira'),(75,10,'Lídia Carvalho'),(76,10,'Eliane Vandramini'),(77,10,'Vera Lúcia'),(78,10,'Fátima Cristina'),(79,4,'Alimentação'),(80,4,'MDLivre'),(81,1,'Rose'),(82,4,'Servidor'),(83,10,'Paulo Roberto'),(84,10,'Jaqueline Leão'),(85,4,'combustivel'),(86,4,'Correios'),(87,4,'marketing'),(88,4,'Colegio JJ'),(89,10,'Angela'),(91,12,'Centro'),(92,13,'Material Construção'),(93,4,'Seguro'),(96,4,'Aluguel casa'),(97,4,'Net casa'),(98,4,'Luz casa'),(99,4,'Faculdade'),(100,4,'Curso'),(101,3,'Pão'),(102,3,'Super bonder'),(103,3,'Papel Pardo'),(104,13,'Motoboy'),(105,10,'Solange'),(106,10,'Carla'),(107,3,'Água Mineral'),(108,7,'Óleo'),(109,3,'Giz de cera');
/*!40000 ALTER TABLE `financial_outcome_origin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `color` varchar(3) NOT NULL,
  `size` varchar(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (3,1,'Colete Modular Close','pt','P'),(4,51,'Colete Modular Close','vd','P'),(5,101,'Colete Modular Close','tan','P'),(6,2,'Colete Modular Close','pt','M'),(7,3,'Colete Modular Close','pt','G'),(8,11,'Colete Modular Plate Carrier','pt','ST'),(9,61,'Colete Modular Plate Carrier','vd','ST'),(10,111,'Colete Modular Plate Carrier','tan','ST'),(11,52,'Colete Modular Close','vd','M'),(12,53,'Colete Modular Close','vd','G'),(13,102,'Colete Modular Close','tan','M'),(14,103,'Colete Modular Close','tan','G'),(16,55,'Colete Modular JA3','vd','P'),(17,6,'Colete Modular JA3','pt','M'),(18,7,'Colete Modular JA3','pt','G'),(20,56,'Colete Modular JA3','vd','M'),(21,57,'Colete Modular JA3','vd','G'),(22,105,'Colete Modular JA3','tan','P'),(23,106,'Colete Modular JA3','tan','M'),(24,107,'Colete Modular JA3','tan','G'),(25,5,'Colete Modular JA3','pt','P'),(26,501,'Porta Camelback Modular','pt','ST'),(27,502,'Bolsa P Modular','pt','ST'),(28,503,'Bolsa M Modular','pt','ST'),(29,504,'Bolsa G Modular','pt','ST'),(30,505,'Porta Carregador Fuzil Velcro','pt','ST'),(31,506,'Porta Carregador Fuzil Tic Tac','pt','ST'),(32,507,'Porta Carregador Fuzil Elástic','pt','ST'),(33,508,'Porta Carregador Pistola Duplo','pt','ST'),(34,509,'Porta Carregador SMT/UMP','pt','ST'),(35,510,'Porta Carregador Calibre 12','pt','ST'),(36,511,'Coldre Modular Universal D','pt','ST'),(37,512,'Coldre Modular Universal C','pt','ST'),(38,513,'Porta Rádio/HT','pt','ST'),(39,551,'Porta Camelback Modular','vd','ST'),(40,552,'Bolsa P Modular','vd','ST'),(41,553,'Bolsa M Modular','vd','ST'),(42,554,'Bolsa G Modular','vd','ST'),(43,555,'Porta Carregador Fuzil Velcro','vd','ST'),(44,556,'Porta Carregador Fuzil Tic Tac','vd','ST'),(45,557,'Porta Carregador Fuzil Elástic','vd','ST'),(46,558,'Porta Carregador Pistola Duplo','vd','ST'),(47,559,'Porta Carregador SMT/UMP','vd','ST'),(48,560,'Porta Carregador Calibre 12','vd','ST'),(49,561,'Coldre Modular Universal D','vd','ST'),(50,562,'Coldre Modular Universal C','vd','ST'),(51,563,'Porta Rádio/HT','vd','ST'),(52,601,'Porta Camelback Modular','tan','ST'),(53,602,'Bolsa P Modular','tan','ST'),(54,603,'Bolsa M Modular','tan','ST'),(55,604,'Bolsa G Modular','tan','ST'),(56,605,'Porta Carregador Fuzil Velcro','tan','ST'),(57,606,'Porta Carregador Fuzil Tic Tac','tan','ST'),(58,607,'Porta Carregador Fuzil Elástic','tan','ST'),(59,608,'Porta Carregador Pistola Duplo','tan','ST'),(60,609,'Porta Carregador SMT/UMP','tan','ST'),(61,610,'Porta Carregador Calibre 12','tan','ST'),(62,611,'Coldre Modular Universal D','tan','ST'),(63,612,'Coldre Modular Universal C','tan','ST'),(64,613,'Porta Rádio/HT','tan','ST'),(65,1001,'Coldre de Perna Universal D','pt','ST'),(66,1002,'Coldre de Perna Universal C','pt','ST'),(67,1051,'Coldre de Perna Universal D','vd','ST'),(68,1052,'Coldre de Perna Universal C','vd','ST'),(69,1101,'Coldre de Perna Universal D','tan','ST'),(70,1102,'Coldre de Perna Universal C','tan','ST'),(71,1501,'Cinto Tático Fivela Plástico','pt','ST'),(72,1502,'Cinto Tático NA','pt','ST'),(73,1551,'Cinto Tático Fivela Plástico','vd','ST'),(74,1552,'Cinto Tático NA','vd','ST'),(75,1601,'Cinto Tático Fivela Plástico','tan','ST'),(76,1602,'Cinto Tático NA','tan','ST'),(77,2001,'Bornal Fuzil Tic Tac','pt','ST'),(78,2002,'Bornal 3 PST','pt','ST'),(79,2051,'Bornal Fuzil Tic Tac','vd','ST'),(80,2052,'Bornal 3 PST','vd','ST'),(81,2101,'Bornal Fuzil Tic Tac','tan','ST'),(82,2102,'Bornal 3 PST','tan','ST'),(83,2501,'Bandoleira J.A 1 ponto','pt','ST'),(84,2551,'Bandoleira J.A 1 ponto','vd','ST'),(85,2601,'Bandoleira J.A 1 ponto','tan','ST'),(86,514,'Porta Algemas','pt','ST'),(87,564,'Porta Algemas','vd','ST'),(88,614,'Porta Algemas','tan','ST'),(92,5401,'Shemagh simples','S/C','ST'),(93,3001,'Mochila pequena','S/C','ST'),(94,3002,'Mochila média','S/C','ST'),(95,3003,'Mochila Grande','S/C','ST'),(96,5801,'Suporte Celular braço ','S/C','ST'),(97,5701,'Kit cantil ','S/C','ST'),(98,3701,'Refil Camelback 2.5L','S/C','ST'),(99,3901,'Farda exército','cvd','P'),(100,3902,'Farda Exército','cvd','M'),(101,3903,'Farda Exército ','cvd','G'),(102,3904,'Farda Exército','cvd','GG'),(103,4701,'Gorro','S/C','ST'),(104,4001,'Faca Tática','S/C','ST'),(105,4101,'Canivete Pequeno','S/C','ST'),(106,4102,'Canivete médio','S/C','ST'),(107,4103,'Canivete Grande','S/C','ST'),(108,4104,'Multiuso talher','S/C','ST'),(109,4901,'Bússola simples','S/C','ST'),(110,4201,'Mini lanterna','S/C','ST'),(111,4202,'Lanterna Pequena','S/C','ST'),(112,4203,'Lanterna Choque','S/C','ST'),(113,4204,'Lanterna Tática','S/C','ST'),(114,5001,'Par de Bombacho','S/C','ST'),(115,5101,'Cadeado pequeno','S/C','ST'),(116,4401,'Pulseira c/ Bússola','S/C','ST'),(117,4801,'Capacete Básico','S/C','ST'),(118,5301,'Máscara Tática','S/C','ST'),(119,4501,'Boné simples','S/C','ST'),(120,3801,'Fiel Aspiral','S/C','ST'),(121,5501,'Gandoleta','S/C','ST'),(122,4301,'Mochila Camelback','S/C','ST'),(123,5601,'Bolsa Velame','S/C','ST'),(124,4601,'Chapéu caçador','S/C','ST'),(125,3601,'Kit Cotoveleira e Joelheira','pt','ST'),(126,3602,'Kit Cotoveleira e Joelheira','vd','ST'),(127,3603,'Kit Cotoveleira e Joelheira','tan','ST'),(128,1503,'Cinto Tático Black Hawk','pt','ST'),(129,1553,'Cinto Tático Black Hawk','vd','ST'),(130,1603,'Cinto Tático Black Hawk','tan','ST'),(131,1003,'Mini Coldre p/ Cinto D','pt','ST'),(132,1053,'Mini Coldre p/ Cinto D','vd','ST'),(133,1103,'Mini Coldre p/ Cinto D','tan','ST'),(134,1504,'Protetor Acolchoado p/ Cinto','pt','ST'),(135,1554,'Protetor Acolchoado p/ Cinto','vd','ST'),(136,1604,'Protetor Acolchoado p/ Cinto','tan','ST'),(137,5901,'Corta Vento','S/C','ST'),(138,5902,'Casaco tático','S/C','ST'),(139,5903,'Malvinão','S/C','ST'),(146,4,'Colete Modular Close','pt','GG'),(147,54,'Colete Modular Close','vd','GG'),(148,104,'Colete Modular Close','tan','GG'),(154,1004,'Mini Coldre p/ Cinto C','pt','ST'),(155,1054,'Mini Coldre p/ Cinto C','vd','ST'),(156,1104,'Mini Coldre p/ Cinto C','tan','ST'),(157,2003,'Bornal Compact','pt','ST'),(158,2053,'Bornal Compact','vd','ST'),(159,2103,'Bornal Compact','tan','ST'),(160,14,'Colete Gola','pt','P'),(161,18,'Colete Bope','pt','P'),(162,19,'Colete Bope','pt','M'),(163,20,'Colete Bope','pt','G'),(164,12,'Lateral Plate/JA3','pt','ST'),(165,13,'Ombreira Plate/JA3','pt','ST'),(166,62,'Lateral Plate/JA3','vd','ST'),(167,63,'Ombreira Plate/JA3','vd','ST'),(168,112,'Lateral Plate/JA3','tan','ST'),(169,113,'Ombreira Plate/JA3','tan','ST'),(170,161,'Colete Modular Plate Carrier','mtc','ST'),(171,211,'Colete Modular Plate Carrier','mpt','ST'),(172,1005,'Coldre de Perna Robocop D','pt','ST'),(173,1006,'Coldre de Perna Robocop E','pt','ST');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `shortcut` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (1,'Colete','Colete'),(2,'Peça Modular','Peça_mod'),(4,'Coldre','Coldre'),(5,'Cinto','Cinto'),(6,'Bornal','Bornal'),(7,'Bandoleira','Bandolei'),(9,'Mochila','Mochila'),(10,'Luva','Luva'),(11,'Cotoveleira e j','Cot/joel'),(12,'Refil Camelback','Ref. Cam'),(13,'Fiel','Fiel'),(14,'Farda','Farda'),(15,'Faca','Faca'),(16,'Canivete','Canivete'),(17,'Lanterna','Lanterna'),(18,'Camelback','Camelbac'),(19,'Pulseira','Pulseira'),(20,'Boné','Boné'),(21,'Chapéu','Chapéu'),(22,'Gorro','Gorro'),(23,'Capacete','Capacete'),(24,'Bússola','Bússola'),(25,'Bombacho','Bombacho'),(26,'Cadeado','Cadeado'),(27,'Alicate','Alicate'),(28,'Máscara','Máscara'),(29,'Shemagh','Shemagh'),(30,'Gandoleta','Gandolet'),(31,'Bolsa','Bolsa'),(32,'Cantil','Cantil'),(33,'Sup. Celular','Sup. Cel'),(34,'Casaco','Casaco');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_color`
--

DROP TABLE IF EXISTS `product_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_color` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `shortcut` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_color`
--

LOCK TABLES `product_color` WRITE;
/*!40000 ALTER TABLE `product_color` DISABLE KEYS */;
INSERT INTO `product_color` VALUES (1,'Sem Cor','S/C'),(2,'Preto','pt'),(3,'Verde','vd'),(4,'Tan','tan'),(5,'Camoflado verde','cvd'),(6,'Multicam','mtc'),(7,'Marpat','mpt');
/*!40000 ALTER TABLE `product_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_feedstock`
--

DROP TABLE IF EXISTS `product_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_feedstock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `feedstock_id` int NOT NULL,
  `uom` varchar(5) NOT NULL,
  `amount` int unsigned NOT NULL,
  `measure` decimal(15,2) unsigned NOT NULL DEFAULT '1.00',
  `category` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_product_feedstock` (`product_id`),
  KEY `fk_feedstock_product` (`feedstock_id`),
  CONSTRAINT `fk_feedstock_product` FOREIGN KEY (`feedstock_id`) REFERENCES `feedstock` (`id`),
  CONSTRAINT `fk_product_feedstock` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_feedstock`
--

LOCK TABLES `product_feedstock` WRITE;
/*!40000 ALTER TABLE `product_feedstock` DISABLE KEYS */;
INSERT INTO `product_feedstock` VALUES (1,8,28,'cm',1,17.00,NULL),(2,8,28,'cm',2,34.50,NULL),(3,8,28,'cm',2,7.00,NULL),(4,8,28,'cm',3,34.50,NULL),(5,8,34,'cm',1,37.00,NULL),(6,8,34,'cm',2,60.00,NULL),(7,8,34,'cm',2,15.00,NULL),(8,8,28,'cm',6,32.50,NULL),(9,8,28,'cm',6,32.50,NULL);
/*!40000 ALTER TABLE `product_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_product_image` (`product_id`),
  CONSTRAINT `fk_product_image` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=345 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (27,26,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_818244-MLB31498972733_072019-F.webp'),(28,26,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_986789-MLB31498988535_072019-F.webp'),(29,39,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_994834-MLB31637343115_072019-F.webp'),(30,39,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_880382-MLB31637343617_072019-F.webp'),(31,52,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_968416-MLB31498980211_072019-F.webp'),(32,52,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_676363-MLB31498978737_072019-F.webp'),(36,27,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_914251-MLB31499264300_072019-F.webp'),(37,27,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_893776-MLB31499243475_072019-F.webp'),(38,27,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_944210-MLB31499259856_072019-F.webp'),(39,40,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_647582-MLB31637418984_072019-O.webp'),(40,40,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_922406-MLB31637438834_072019-F.webp'),(41,53,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_844052-MLB31499287530_072019-O.webp'),(42,53,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_920649-MLB31499267855_072019-F.webp'),(43,53,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_626313-MLB31499290505_072019-F.webp'),(46,28,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_686256-MLB31499295947_072019-F.webp'),(47,28,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_929677-MLB31499325059_072019-F.webp'),(48,28,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_725307-MLB31499330511_072019-F.webp'),(49,41,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_638411-MLB31637475175_072019-F.webp'),(50,41,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_827291-MLB31637491050_072019-F.webp'),(51,54,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_913216-MLB31499309648_072019-F.webp'),(52,54,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_664313-MLB31499300808_072019-F.webp'),(53,54,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_949365-MLB31499307181_072019-O.webp'),(54,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_757661-MLB31489198431_072019-F.webp'),(55,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_635423-MLB31489210626_072019-F.webp'),(56,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_968130-MLB31489209645_072019-F.webp'),(57,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_946645-MLB31489194828_072019-F.webp'),(58,56,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_992259-MLB31489216682_072019-F.webp'),(59,56,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_867231-MLB31489228091_072019-F.webp'),(60,56,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_956261-MLB31489198491_072019-F.webp'),(61,43,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_944890-MLB31489198379_072019-F.webp'),(65,59,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_938060-MLB31498783777_072019-F.webp'),(66,59,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_887875-MLB31498792678_072019-F.webp'),(67,59,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_712652-MLB31498763885_072019-F.webp'),(68,33,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_991989-MLB31498767755_072019-F.webp'),(69,33,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_606526-MLB31498763787_072019-F.webp'),(70,33,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_961302-MLB31498789118_072019-F.webp'),(71,46,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_855674-MLB31637386042_072019-O.webp'),(72,36,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_614333-MLB31188151337_062019-F.webp'),(73,37,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_614333-MLB31188151337_062019-F.webp'),(74,36,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_637125-MLB31188157169_062019-F.webp'),(75,37,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_637125-MLB31188157169_062019-F.webp'),(76,36,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_630382-MLB31188161413_062019-F.webp'),(77,37,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_630382-MLB31188161413_062019-F.webp'),(78,62,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_740157-MLB31116893591_062019-O.webp'),(83,63,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_740157-MLB31116893591_062019-F.webp'),(84,62,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_699296-MLB31116881470_062019-F.webp'),(85,63,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_699296-MLB31116881470_062019-F.webp'),(86,62,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_938859-MLB31116882843_062019-F.webp'),(87,63,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_938859-MLB31116882843_062019-F.webp'),(88,49,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_891206-MLB31637493260_072019-F.webp'),(89,50,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_891206-MLB31637493260_072019-F.webp'),(90,49,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_910947-MLB31637511578_072019-F.webp'),(91,50,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_910947-MLB31637511578_072019-F.webp'),(92,38,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_656091-MLB31498880362_072019-F.webp'),(93,38,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_699347-MLB31498880360_072019-F.webp'),(95,64,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_812664-MLB31498880408_072019-F.webp'),(96,64,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_911695-MLB31498887753_072019-F.webp'),(97,51,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_753711-MLB31637402319_072019-F.webp'),(99,83,'https://http2.mlstatic.com/bandoleira-operacional-1-ponto-ja-rio-militar-D_NQ_NP_784857-MLB31117454275_062019-F.webp'),(100,65,'https://i.imgur.com/PElazsL.jpg'),(101,66,'https://i.imgur.com/PElazsL.jpg'),(102,67,'https://i.imgur.com/L6aF3oN.jpg'),(103,68,'https://i.imgur.com/L6aF3oN.jpg'),(104,69,'https://i.imgur.com/1khKOSI.jpg'),(105,70,'https://i.imgur.com/1khKOSI.jpg'),(107,77,'https://i.imgur.com/ggH6qMa.jpg'),(108,77,'https://i.imgur.com/cRSdJ3E.jpg'),(233,8,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_795041-MLB32226188282_092019-F.webp'),(234,8,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_878405-MLB32226209556_092019-F.webp'),(235,8,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_611738-MLB32226190242_092019-F.webp'),(236,8,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_776533-MLB32226197269_092019-F.webp'),(237,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_637499-MLB32171338342_092019-F.webp'),(238,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_721251-MLB32171352587_092019-F.webp'),(239,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_708078-MLB32171342795_092019-F.webp'),(240,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_642159-MLB32171327446_092019-F.webp'),(241,10,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_815666-MLB32241190069_092019-F.webp'),(242,10,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_843612-MLB32241183658_092019-F.webp'),(243,10,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_837363-MLB32241185126_092019-F.webp'),(244,10,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_775673-MLB32241162932_092019-F.webp'),(246,3,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_921376-MLB32384653424_102019-F.webp'),(247,3,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_604470-MLB32384650979_102019-F.webp'),(248,3,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_647388-MLB32384670265_102019-F.webp'),(249,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_921376-MLB32384653424_102019-F.webp'),(250,7,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_921376-MLB32384653424_102019-F.webp'),(251,146,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_921376-MLB32384653424_102019-F.webp'),(252,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_604470-MLB32384650979_102019-F.webp'),(253,7,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_604470-MLB32384650979_102019-F.webp'),(254,146,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_604470-MLB32384650979_102019-F.webp'),(255,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_647388-MLB32384670265_102019-F.webp'),(256,7,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_647388-MLB32384670265_102019-F.webp'),(257,146,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_647388-MLB32384670265_102019-F.webp'),(258,3,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_986994-MLB32384660351_102019-F.webp'),(259,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_986994-MLB32384660351_102019-F.webp'),(260,7,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_986994-MLB32384660351_102019-F.webp'),(261,146,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_986994-MLB32384660351_102019-F.webp'),(262,25,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_747405-MLB40679379565_022020-F.webp'),(263,17,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_747405-MLB40679379565_022020-F.webp'),(264,18,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_747405-MLB40679379565_022020-F.webp'),(265,25,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_759210-MLB40679388476_022020-F.webp'),(266,17,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_759210-MLB40679388476_022020-F.webp'),(267,18,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_759210-MLB40679388476_022020-F.webp'),(268,25,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_782312-MLB40679392333_022020-F.webp'),(269,17,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_782312-MLB40679392333_022020-F.webp'),(270,18,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_782312-MLB40679392333_022020-F.webp'),(271,4,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_782208-MLB31525086631_072019-F.webp'),(272,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_782208-MLB31525086631_072019-F.webp'),(273,12,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_782208-MLB31525086631_072019-F.webp'),(274,147,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_782208-MLB31525086631_072019-F.webp'),(275,4,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_633424-MLB31525091074_072019-F.webp'),(276,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_633424-MLB31525091074_072019-F.webp'),(277,12,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_633424-MLB31525091074_072019-F.webp'),(278,147,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_633424-MLB31525091074_072019-F.webp'),(279,4,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_610814-MLB31525088085_072019-F.webp'),(280,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_610814-MLB31525088085_072019-F.webp'),(281,12,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_610814-MLB31525088085_072019-F.webp'),(282,147,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_610814-MLB31525088085_072019-F.webp'),(283,4,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_895059-MLB31525069921_072019-F.webp'),(284,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_895059-MLB31525069921_072019-F.webp'),(285,147,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_895059-MLB31525069921_072019-F.webp'),(287,12,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_895059-MLB31525069921_072019-F.webp'),(288,5,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_876443-MLB31525038711_072019-F.webp'),(289,13,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_876443-MLB31525038711_072019-F.webp'),(290,14,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_876443-MLB31525038711_072019-F.webp'),(291,148,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_876443-MLB31525038711_072019-F.webp'),(292,148,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_763323-MLB31525032360_072019-F.webp'),(293,13,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_763323-MLB31525032360_072019-F.webp'),(294,14,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_763323-MLB31525032360_072019-F.webp'),(296,5,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_763323-MLB31525032360_072019-F.webp'),(297,5,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_673733-MLB31525033294_072019-F.webp'),(298,13,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_673733-MLB31525033294_072019-F.webp'),(299,14,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_673733-MLB31525033294_072019-F.webp'),(300,148,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_673733-MLB31525033294_072019-F.webp'),(301,79,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_619297-MLB40508982130_012020-F.webp'),(302,79,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_657153-MLB40508959668_012020-F.webp'),(303,81,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_792745-MLB40508981173_012020-F.webp'),(304,81,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_912854-MLB40508966607_012020-F.webp'),(305,157,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_610264-MLB40104687571_122019-O.webp'),(306,157,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_733845-MLB40104684638_122019-F.webp'),(307,158,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_677293-MLB40104691591_122019-F.webp'),(308,158,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_781911-MLB40104684689_122019-F.webp'),(309,159,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_761759-MLB40104688663_122019-F.webp'),(310,159,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_948515-MLB40104692638_122019-F.webp'),(311,86,'https://http2.mlstatic.com/porta-algema-ja-rio-militar-D_NQ_NP_935984-MLB32866315689_112019-O.webp'),(312,87,'https://http2.mlstatic.com/algema-militar-porta-D_NQ_NP_831797-MLB32866309773_112019-O.webp'),(313,88,'https://http2.mlstatic.com/porta-algema-ja-rio-militar-D_NQ_NP_653449-MLB32866311743_112019-O.webp'),(314,131,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_946742-MLB32782258810_112019-F.webp'),(317,154,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_946742-MLB32782258810_112019-F.webp'),(318,132,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_701109-MLB32782262773_112019-F.webp'),(319,155,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_701109-MLB32782262773_112019-F.webp'),(320,133,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_809649-MLB32782258915_112019-F.webp'),(321,156,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_809649-MLB32782258915_112019-F.webp'),(322,110,'https://http2.mlstatic.com/mini-lanterna-D_NQ_NP_821008-MLB32800044326_112019-O.webp'),(323,110,'https://http2.mlstatic.com/mini-lanterna-D_NQ_NP_641893-MLB32800044329_112019-F.webp'),(324,161,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_641618-MLB41153254173_032020-F.webp'),(325,162,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_641618-MLB41153254173_032020-F.webp'),(326,163,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_641618-MLB41153254173_032020-F.webp'),(328,162,'https://http2.mlstatic.com/colete-tatico-militar-D_NQ_NP_721717-MLB41153212885_032020-F.webp'),(329,163,'https://http2.mlstatic.com/colete-tatico-militar-D_NQ_NP_721717-MLB41153212885_032020-F.webp'),(330,161,'https://http2.mlstatic.com/colete-tatico-militar-D_NQ_NP_721717-MLB41153212885_032020-F.webp'),(331,161,'https://http2.mlstatic.com/tatico-militar-colete-D_NQ_NP_902786-MLB41153214852_032020-F.webp'),(332,162,'https://http2.mlstatic.com/tatico-militar-colete-D_NQ_NP_902786-MLB41153214852_032020-F.webp'),(333,163,'https://http2.mlstatic.com/tatico-militar-colete-D_NQ_NP_902786-MLB41153214852_032020-F.webp'),(334,161,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_885203-MLB41153212887_032020-F.webp'),(335,162,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_885203-MLB41153212887_032020-F.webp'),(336,163,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_885203-MLB41153212887_032020-F.webp'),(337,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_726845-MLB32284302010_092019-F.webp'),(338,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_959845-MLB32284284237_092019-O.webp'),(339,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_781689-MLB32284300538_092019-F.webp'),(340,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_657593-MLB32284300536_092019-O.webp'),(341,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_774858-MLB32503554703_102019-F.webp'),(342,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_666104-MLB32503557188_102019-O.webp'),(343,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_967476-MLB32503551722_102019-O.webp'),(344,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_751732-MLB32503496995_102019-O.webp');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_production`
--

DROP TABLE IF EXISTS `product_production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_production` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` varchar(15) NOT NULL,
  `full_date` varchar(25) NOT NULL,
  `storage_id` int NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'Pedido solicitado',
  `user` varchar(45) NOT NULL,
  `confirmation_user` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_production`
--

LOCK TABLES `product_production` WRITE;
/*!40000 ALTER TABLE `product_production` DISABLE KEYS */;
INSERT INTO `product_production` VALUES (1,'2020-08-24','24-08-2020-23:30:46',1,'Pedido solicitado','Henrique Lyra',NULL),(2,'2020-08-24','24-08-2020-23:33:46',1,'Pedido solicitado','Henrique Lyra',NULL),(3,'2020-08-24','24-08-2020-23:37:1',1,'Pedido solicitado','Henrique Lyra',NULL),(4,'2020-08-24','24-08-2020-23:44:6',1,'Pedido solicitado','Henrique Lyra',NULL);
/*!40000 ALTER TABLE `product_production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_production_feedstock`
--

DROP TABLE IF EXISTS `product_production_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_production_feedstock` (
  `id` int NOT NULL AUTO_INCREMENT,
  `production_id` int NOT NULL,
  `feedstock_id` int NOT NULL,
  `feedstock_info` varchar(45) NOT NULL,
  `feedstock_uom` varchar(2) NOT NULL,
  `standard` decimal(15,2) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `released_amount` decimal(15,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_production_feedstock`
--

LOCK TABLES `product_production_feedstock` WRITE;
/*!40000 ALTER TABLE `product_production_feedstock` DISABLE KEYS */;
INSERT INTO `product_production_feedstock` VALUES (1,1,16,'401 CA 25 pt','cm',5000.00,0.21,0.00),(2,1,17,'1751 Cursor pt','un',500.00,10.00,0.00),(3,1,18,'1001 Botão S/C','cm',200.00,0.10,0.00),(4,1,632,'651 HXL pt','cm',10000.00,0.13,0.00),(5,1,637,'751 Zíper pt','cm',100.00,3.10,0.00),(6,1,737,'1 Córdoba Ripstop 300 pt','cm',100.00,0.70,0.00),(7,1,738,'51 Duratran pt','cm',100.00,0.40,0.00),(8,1,28,'301 Velcro 50 F (light) pt','cm',2500.00,0.08,0.00),(9,2,16,'401 CA 25 pt','cm',5000.00,0.00,0.00),(10,2,17,'1751 Cursor pt','un',500.00,10.00,0.00),(11,2,18,'1001 Botão S/C','cm',200.00,0.00,0.00),(12,2,632,'651 HXL pt','cm',10000.00,0.00,0.00),(13,2,637,'751 Zíper pt','cm',100.00,3.00,0.00),(14,2,737,'1 Córdoba Ripstop 300 pt','cm',100.00,1.00,0.00),(15,2,738,'51 Duratran pt','cm',100.00,0.00,0.00),(16,2,28,'301 Velcro 50 F (light) pt','cm',2500.00,0.00,0.00),(17,3,16,'401 CA 25 pt','cm',5000.00,2.23,0.00),(18,3,17,'1751 Cursor pt','un',500.00,96.00,0.00),(19,3,18,'1001 Botão S/C','cm',200.00,0.96,0.00),(20,3,632,'651 HXL pt','cm',10000.00,1.17,0.00),(21,3,637,'751 Zíper pt','cm',100.00,27.84,0.00),(22,3,737,'1 Córdoba Ripstop 300 pt','cm',100.00,5.76,0.00),(23,3,738,'51 Duratran pt','cm',100.00,2.88,0.00),(24,4,16,'401 CA 25 pt','cm',5000.00,2.00,0.00),(25,4,17,'1751 Cursor pt','un',500.00,96.00,0.00),(26,4,18,'1001 Botão S/C','cm',200.00,1.00,0.00),(27,4,632,'651 HXL pt','cm',10000.00,1.00,0.00),(28,4,637,'751 Zíper pt','cm',100.00,28.00,0.00),(29,4,737,'1 Córdoba Ripstop 300 pt','cm',100.00,6.00,0.00),(30,4,738,'51 Duratran pt','cm',100.00,3.00,0.00);
/*!40000 ALTER TABLE `product_production_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_production_product`
--

DROP TABLE IF EXISTS `product_production_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_production_product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `production_id` int NOT NULL,
  `product_id` int NOT NULL,
  `product_info` varchar(60) NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_product_productionProduct` (`product_id`),
  CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_product_productionProduct` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_production_product`
--

LOCK TABLES `product_production_product` WRITE;
/*!40000 ALTER TABLE `product_production_product` DISABLE KEYS */;
INSERT INTO `product_production_product` VALUES (1,1,27,'502 Bolsa P Modular pt ST',5),(2,1,28,'503 Bolsa M Modular pt ST',5),(3,2,27,'502 Bolsa P Modular pt ST',5),(4,2,28,'503 Bolsa M Modular pt ST',5),(5,3,27,'502 Bolsa P Modular pt ST',96),(6,4,27,'502 Bolsa P Modular pt ST',96);
/*!40000 ALTER TABLE `product_production_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_value`
--

DROP TABLE IF EXISTS `product_value`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_value` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `value` decimal(7,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_value`
--

LOCK TABLES `product_value` WRITE;
/*!40000 ALTER TABLE `product_value` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_value` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `received_production`
--

DROP TABLE IF EXISTS `received_production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `received_production` (
  `id` int NOT NULL AUTO_INCREMENT,
  `production_id` int NOT NULL,
  `date` varchar(45) NOT NULL,
  `product_id` int NOT NULL,
  `product_info` varchar(45) NOT NULL,
  `amount` int NOT NULL,
  `transporter_id` int NOT NULL,
  `transporter_name` varchar(45) NOT NULL,
  `lecturer_id` int NOT NULL,
  `lecturer_name` varchar(45) NOT NULL,
  `note` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `received_production`
--

LOCK TABLES `received_production` WRITE;
/*!40000 ALTER TABLE `received_production` DISABLE KEYS */;
/*!40000 ALTER TABLE `received_production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `email` varchar(60) NOT NULL,
  `password` varchar(60) NOT NULL,
  `phone` varchar(11) DEFAULT NULL,
  `birth` varchar(20) DEFAULT NULL,
  `department` varchar(60) DEFAULT NULL,
  `role` varchar(60) DEFAULT NULL,
  `access` varchar(7) DEFAULT 'aaa-aaa',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Henrique Lyra','hlyras1994@gmail.com','$2a$10$8dN9AX0Vz4yl2En5CwaHFOfJKOVmeF2SF5k/MgKWxmvNPR/7E14IW','33999999961',NULL,'000','000','adm'),(2,'Luis Henrique','lh@gmail.com','$2a$10$8dN9AX0Vz4yl2En5CwaHFOfJKOVmeF2SF5k/MgKWxmvNPR/7E14IW','21000000000',NULL,'000','000','COR-GER'),(3,'Anny Carvalho','anny@gmail.com','$2a$10$MIuYKn.pJAhHckvcsbE32eZ00lTrCphCb.2LKbuznSCbGHPVRAsfO','21993293532',NULL,'000','000','fin'),(4,'Sheyla Lyra','sl@gmail.com','$2a$10$fLuNiwQuMPhtGALH0MDoPu7ilkAonVgmsbftmkCzwgszaNWaiBc1i','21000000000',NULL,'000','000','fin'),(5,'Chris Carvalho','christihellenferreira2015@gmail.com','$2a$10$Z8XAieh8XPm8rLbG/mWkguxJHG4xeC7ZbDKwJwlOBM4L7ecmqOA6G','21999999999',NULL,'000','000','COR-GER'),(6,'Jean Carvalho','jc@gmail.com','$2a$10$m03Trx38ceWUsfpmIvdl3.Pt.FI7e8k2nsD7zbEklAtQc75r79VqK','21000000000',NULL,'000','000','adm'),(7,'Daniel Anderson','dl@gmail.com','$2a$10$kA.Jld4rVegBSt7j/HYqX.kiEV15pl6KVjHA.hABOYBMEO.nltrku','21970294824',NULL,'000','000','man'),(8,'Rodrigo Salazar','rs@gmail.com','$2a$10$5ckhEIigDqI3K8UyGGCRaOz6E/QH70hz6PwcFIsMCxzuTdUR0IQyK','21999999999',NULL,'000','000','sto'),(9,'Douglas Luis','dodo@gmail.com','$2a$10$FD/TiypfiTummm.0VGo4z.072vQc/xLYiIyMfsMuNW.2d3.hTfUE6','21000000000',NULL,'000','000','cut'),(10,'Danrlei Henrique','dh@gmail.com','$2a$10$AHBBkmHMjalag3ufnE4sy.yvc9qw8wAHzuDVlxVV8YlACNYNShW4y','21000000000',NULL,'000','000','adm'),(11,'Daniel Luís','dluis@gmail.com','$2a$10$TCUGUeKkdd57AuLk1q.SK.mjDZsyap1tQxS4i0Vy3bDgW8ZUAfY0q','21999999999',NULL,'000','000','cut'),(12,'Caio César','cc@gmail.com','$2a$10$PG3SuWUHdT.HBAUF3LSai.z3AbreZfkoElJL8DpiaYMRVv0zJFWKG','21966261166',NULL,'000','000','cut');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'cms_wt_erp'
--

--
-- Dumping routines for database 'cms_wt_erp'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-05  7:20:10
