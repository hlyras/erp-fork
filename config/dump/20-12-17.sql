-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: mysql669.umbler.com    Database: cms_wt_erp
-- ------------------------------------------------------
-- Server version	5.6.40

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
-- Table structure for table `customer`
--

DROP TABLE IF EXISTS `customer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `trademark` varchar(100) DEFAULT NULL,
  `brand` varchar(100) DEFAULT NULL,
  `cnpj` varchar(14) NOT NULL,
  `ie` varchar(9) NOT NULL DEFAULT 'ISENTO',
  `email` varchar(60) DEFAULT NULL,
  `phone` varchar(13) DEFAULT NULL,
  `cellphone` varchar(14) DEFAULT NULL,
  `password` varchar(60) DEFAULT NULL,
  `access` varchar(3) NOT NULL DEFAULT 'ctm',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `cnpj_UNIQUE` (`cnpj`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer`
--

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES (1,'Jean Coelho Carvalho','JC Carvalho ME','JA Rio Militar','14114604000173','182381283','jean@jariomilitar.com.br','552134499000','','undefined','ctm'),(4,'Lucas Correa Duarte','','','08088569958','','','','43996350874','undefined','ctm');
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  `color` varchar(20) NOT NULL,
  `standard` int(11) NOT NULL,
  `uom` varchar(2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=195 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock`
--

LOCK TABLES `feedstock` WRITE;
/*!40000 ALTER TABLE `feedstock` DISABLE KEYS */;
INSERT INTO `feedstock` VALUES (1,1,'Córdoba Ripstop 300','pt',100,'cm'),(2,2,'Córdoba Ripstop 300','vd',100,'cm'),(3,3,'Córdoba Ripstop 300','tan',100,'cm'),(10,4,'Córdoba Ripstop 300','cvd',100,'cm'),(11,51,'Duratran','pt',100,'cm'),(12,52,'Duratran','vd',100,'cm'),(13,53,'Duratran','tan',100,'cm'),(14,101,'Aerado','pt',100,'cm'),(16,201,'Velcro 25 F (light)','pt',2500,'cm'),(17,202,'Velcro 25 M (light)','pt',2500,'cm'),(18,203,'Velcro 25 F (light)','vd',2500,'cm'),(19,251,'Velcro 40 F (light)','pt',2500,'cm'),(20,252,'Velcro 40 M (light)','pt',2500,'cm'),(21,253,'Velcro 40 F (light)','vd',2500,'cm'),(22,301,'Velcro 50 F (light)','pt',2500,'cm'),(23,302,'Velcro 50 M (light)','pt',2500,'cm'),(24,303,'Velcro 50 F (light)','vd',2500,'cm'),(25,351,'Velcro 100 F (light)','pt',2500,'cm'),(26,352,'Velcro 100 M (light)','pt',2500,'cm'),(27,353,'Velcro 100 F (light)','vd',2500,'cm'),(28,401,'CA 25','pt',5000,'cm'),(29,402,'CA 25','vd',5000,'cm'),(30,403,'CA 25','tan',5000,'cm'),(31,451,'CA 40','pt',5000,'cm'),(32,452,'CA 40','vd',5000,'cm'),(33,453,'CA 40','tan',5000,'cm'),(34,501,'CA 50','pt',5000,'cm'),(35,502,'CA 50','vd',5000,'cm'),(36,503,'CA 50','tan',5000,'cm'),(37,551,'CA 70','pt',5000,'cm'),(38,552,'CA 70','vd',5000,'cm'),(39,553,'CA 70','tan',5000,'cm'),(40,601,'CA 100','pt',5000,'cm'),(41,602,'CA 100','vd',5000,'cm'),(42,603,'CA 100','tan',5000,'cm'),(43,651,'HXL','pt',10000,'cm'),(44,701,'Gorgurão','pt',10000,'cm'),(45,702,'Gorgurão','vd',10000,'cm'),(46,703,'Gorgurão','tan',10000,'cm'),(47,751,'Zíper','pt',100,'cm'),(48,752,'Zíper','vd',100,'cm'),(49,753,'Zíper','tan',100,'cm'),(50,801,'Elástico 25','pt',2500,'cm'),(51,851,'Tic Tac 25','pt',500,'un'),(52,852,'Tic Tac 25','vd',500,'un'),(53,853,'Tic Tac 25','tan',500,'un'),(54,901,'Tic Tac 40','pt',500,'un'),(55,902,'Tic Tac 40','vd',500,'un'),(56,903,'Tic Tac 40','tan',500,'un'),(57,951,'Tic Tac 50','pt',250,'un'),(58,952,'Tic Tac 50','vd',250,'un'),(59,953,'Tic Tac 50','tan',250,'un'),(60,1001,'Botão','S/C',200,'cm'),(61,1051,'Argola 25','pt',500,'un'),(62,1052,'Argola 25','vd',500,'un'),(63,1053,'Argola 25','tan',500,'un'),(64,1101,'Argola 40','pt',500,'un'),(65,1102,'Argola 40','vd',500,'un'),(66,1103,'Argola 40','tan',500,'un'),(67,1151,'Argola 50','pt',500,'un'),(68,1152,'Argola 50','vd',500,'un'),(69,1153,'Argola 50','tan',500,'un'),(70,1201,'Meia argola 25','pt',500,'un'),(71,1202,'Meia argola 25','vd',500,'un'),(72,1203,'Meia argola 25','tan',500,'un'),(73,1251,'Meia argola 40','pt',500,'un'),(74,1252,'Meia argola 40','vd',500,'un'),(75,1253,'Meia argola 40','tan',500,'un'),(76,1301,'Meia argola 50','pt',500,'un'),(77,1302,'Meia Argola 50','vd',500,'un'),(78,1303,'Meia argola 50','tan',500,'un'),(79,1351,'Ponteira','pt',500,'un'),(80,1352,'Ponteira','vd',500,'un'),(81,1353,'Ponteira','tan',500,'un'),(82,161,'Prateado','S/C',5000,'cm'),(83,151,'Bidin','pt',2000,'cm'),(84,1501,'Regulador 25','pt',500,'un'),(85,1502,'Regulador 25','vd',500,'un'),(86,1503,'Regulador 25','tan',500,'un'),(87,1551,'Regulador 40','pt',500,'un'),(88,1552,'Regulador 40','vd',500,'un'),(89,1553,'Regulador 40','tan',500,'un'),(90,1601,'Regulador 50','pt',500,'un'),(91,1602,'Regulador 50','vd',500,'un'),(92,1603,'Regulador 50','tan',500,'un'),(93,1651,'Triângulo 25','S/C',500,'un'),(94,1652,'Triângulo 40','S/C',500,'un'),(95,1653,'Mosquetão triângulo','S/C',500,'un'),(96,1701,'Enforcador','pt',500,'un'),(97,1710,'Terminal enforcador','pt',1000,'un'),(99,103,'Aerado','tan',100,'cm'),(100,1751,'Cursor','pt',500,'un'),(101,1811,'Etiqueta tamanho P','S/C',1000,'un'),(102,1802,'Etiqueta Marca pano','S/C',1000,'un'),(103,1803,'Etiqueta Marca embor','S/C',1000,'un'),(104,1851,'Emborrachado trapézi','pt',1000,'un'),(105,1852,'Emborrachado trapézi','vd',1000,'un'),(106,1853,'Emborrachado trapézi','tan',1000,'un'),(107,204,'Velcro 25 M (light)','vd',2500,'cm'),(108,205,'Velcro 25 F (light)','tan',2500,'cm'),(109,206,'Velcro 25 M (light)','tan',2500,'cm'),(110,254,'Velcro 40 M (light)','vd',2500,'cm'),(111,255,'Velcro 40 F (light)','tan',2500,'cm'),(112,256,'Velcro 40 M (light)','tan',2500,'cm'),(113,304,'Velcro 50 M (light)','vd',2500,'cm'),(114,305,'Velcro 50 F (light)','tan',2500,'cm'),(115,306,'Velcro 50 M (light)','tan',2500,'cm'),(116,211,'Velcro 25 F (veltor)','pt',2500,'cm'),(117,212,'Velcro 25 M (veltor)','pt',2500,'cm'),(118,213,'Velcro 25 F (veltor)','vd',2500,'cm'),(119,214,'Velcro 25 M (veltor)','vd',2500,'cm'),(120,215,'Velcro 25 F (veltor)','tan',2500,'cm'),(121,216,'Velcro 25 M (veltor)','tan',2500,'cm'),(122,261,'Velcro 40 F (veltor)','pt',2500,'cm'),(123,262,'Velcro 40 M (veltor)','pt',2500,'cm'),(124,263,'Velcro 40 F (veltor)','vd',2500,'cm'),(125,264,'Velcro 40 M (veltor)','vd',2500,'cm'),(126,265,'Velcro 40 F (veltor)','tan',2500,'cm'),(127,266,'Velcro 40 M (veltor)','tan',2500,'cm'),(128,311,'Velcro 50 F (veltor)','pt',2500,'cm'),(129,312,'Velcro 50 M (veltor)','pt',2500,'cm'),(130,313,'Velcro 50 F (veltor)','vd',2500,'cm'),(131,314,'Velcro 50 M (veltor)','vd',2500,'cm'),(132,315,'Velcro 50 F (veltor)','tan',2500,'cm'),(133,316,'Velcro 50 M (veltor)','tan',2500,'cm'),(134,354,'Velcro 100 M (light)','vd',2500,'cm'),(135,355,'Velcro 100 F (light)','tan',2500,'cm'),(136,356,'Velcro 100 M (light)','tan',2500,'cm'),(137,361,'Velcro 100 F(veltor)','pt',2500,'cm'),(138,362,'Velcro 100 M(veltor)','pt',2500,'cm'),(139,363,'Velcro 100 F(veltor)','vd',2500,'cm'),(140,364,'Velcro 100 M(veltor)','vd',2500,'cm'),(141,365,'Velcro 100 F(velcro)','tan',2500,'cm'),(142,366,'Velcro 100 M(veltor)','tan',2500,'cm'),(143,23,'Cordurex','tan',10000,'cm'),(144,102,'Aerado','vd',100,'cm'),(145,811,'Elástico 80','pt',2500,'cm'),(150,1901,'Alça Bob','pt',200,'un'),(151,1902,'Alça Bob','vd',200,'un'),(152,1903,'Alça Bob','tan',200,'un'),(153,1951,'Etaflon','S/C',2000,'cm'),(154,821,'Elástico Roliço','pt',100,'cm'),(155,822,'Elástico Roliço','vd',100,'cm'),(156,823,'Elástico Roliço','tan',100,'cm'),(157,812,'Elástico 80','vd',2500,'cm'),(158,813,'Elástico 80','tan',2500,'cm'),(164,411,'Cadarço Tubular','pt',5000,'cm'),(165,461,'Cadarço Tubular','vd',5000,'cm'),(166,511,'Cadarço Tubular','tan',5000,'cm'),(167,1711,'Terminal enforcador','vd',1000,'un'),(168,1712,'Terminal enforcador','tan',1000,'un'),(169,802,'Elástico 40 branc','S/C',2500,'cm'),(170,405,'CA 25 ','mtc',5000,'cm'),(171,455,'CA 40','mtc',5000,'cm'),(172,505,'CA 50','mtc',5000,'cm'),(173,555,'CA 70','mtc',5000,'cm'),(174,2001,'Linha','pt',10,'un'),(175,2002,'Linha','vd',10,'un'),(176,2003,'Linha','tan',10,'un'),(177,803,'Elástico 40','pt',2500,'cm'),(178,1854,'Emborrachado coldre','pt',50,'un'),(179,1855,'Emborrachado coldre','vd',50,'un'),(180,1856,'Emborrachado coldre','tan',50,'un'),(181,1857,'Emborrachado botão ','pt',50,'un'),(182,1861,'Emborrachado cinto','pt',50,'un'),(183,1862,'Emborrachado cinto','vd',50,'un'),(184,1863,'Emborrachado cinto','tan',50,'un'),(185,1654,'Mosquetão gancho','S/C',500,'un'),(186,804,'Elástico 15 branco','S/C',2500,'cm'),(187,1812,'Etiqueta tamanho M','S/C',1000,'un'),(188,1813,'Etiqueta tamanho G','S/C',1000,'un'),(189,1864,'Emborrachado Robocop','pt',250,'un'),(190,713,'CD 25','tan',5000,'cm'),(191,21,'Cordurex','pt',10000,'cm'),(192,22,'Cordurex','vd',10000,'cm'),(193,2051,'Fibra p/ modular','S/C',100,'un'),(194,5,'aaa','S/C',3,'un');
/*!40000 ALTER TABLE `feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_color`
--

DROP TABLE IF EXISTS `feedstock_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_color` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(10) NOT NULL,
  `full_date` varchar(25) NOT NULL,
  `supplier_id` int(11) NOT NULL,
  `supplier_name` varchar(20) NOT NULL,
  `value` decimal(11,2) NOT NULL DEFAULT '0.00',
  `storage_id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Pedido solicitado',
  `user` varchar(45) NOT NULL,
  `confirmation_user` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_purchase`
--

LOCK TABLES `feedstock_purchase` WRITE;
/*!40000 ALTER TABLE `feedstock_purchase` DISABLE KEYS */;
INSERT INTO `feedstock_purchase` VALUES (1,'2020-03-25','25-03-2020-17:8:12',4,'Eduardo Cadarço',836.00,1,'Pedido confirmado','Daniel Anderson','Rodrigo Salazar'),(2,'2020-03-26','26-03-2020-16:53:29',3,'Adina',1190.00,1,'Pedido confirmado','Daniel Anderson','Henrique Lyra'),(3,'2020-03-27','27-03-2020-16:5:5',1,'China',1330.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(4,'2020-03-30','30-03-2020-14:17:49',4,'Eduardo Cadarço',3063.57,1,'Pedido confirmado','Daniel Anderson','Rodrigo Salazar'),(5,'2020-03-31','31-03-2020-15:40:57',5,'Rogério Emborrachado',2104.70,1,'Pedido confirmado','Daniel Anderson','Henrique Lyra'),(6,'2020-04-06','06-04-2020-13:7:34',8,'Madumac',1272.50,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(7,'2020-04-08','08-04-2020-16:19:53',3,'Adina',2725.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(8,'2020-04-09','09-04-2020-17:35:42',4,'Eduardo Cadarço',2675.50,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(9,'2020-04-14','14-04-2020-10:34:37',2,'Luã',445.50,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(10,'2020-04-16','16-04-2020-13:8:15',1,'China',360.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(11,'2020-04-16','16-04-2020-17:40:48',4,'Eduardo Cadarço',1381.50,1,'Pedido cancelado','Henrique Lyra',NULL),(12,'2020-04-16','16-04-2020-17:42:23',4,'Eduardo Cadarço',1437.50,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(13,'2020-04-20','20-04-2020-15:25:4',8,'Madumac',1680.00,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(14,'2020-04-24','24-04-2020-11:27:39',8,'Madumac',1410.75,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(15,'2020-04-24','24-04-2020-13:16:40',3,'Adina',4610.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(16,'2020-04-27','27-04-2020-18:12:59',1,'China',10656.94,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(17,'2020-04-27','27-04-2020-18:17:35',4,'Eduardo Cadarço',443.28,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(18,'2020-04-29','29-04-2020-9:14:10',2,'Luã',433.68,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(19,'2020-05-05','05-05-2020-14:59:49',1,'China',300.00,1,'Pedido confirmado','Henrique Lyra','Rodrigo Salazar'),(20,'2020-05-15','15-05-2020-14:57:34',2,'Luã',7266.00,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(21,'2020-07-30','30-07-2020-22:44:17',2,'Luã',2402.50,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra'),(22,'2020-09-21','21-09-2020-21:44:18',2,'Luã',3457.00,1,'Pedido confirmado','Henrique Lyra','Henrique Lyra');
/*!40000 ALTER TABLE `feedstock_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_purchase_feedstock`
--

DROP TABLE IF EXISTS `feedstock_purchase_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_purchase_feedstock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `purchase_id` int(11) NOT NULL,
  `feedstock_id` int(11) NOT NULL,
  `feedstock_info` varchar(60) NOT NULL,
  `amount` decimal(15,2) NOT NULL,
  `feedstock_uom` varchar(2) NOT NULL,
  `feedstock_value` decimal(15,2) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_feedstock_purchase` (`feedstock_id`),
  CONSTRAINT `fk_feedstock_purchase` FOREIGN KEY (`feedstock_id`) REFERENCES `feedstock` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_purchase_feedstock`
--

LOCK TABLES `feedstock_purchase_feedstock` WRITE;
/*!40000 ALTER TABLE `feedstock_purchase_feedstock` DISABLE KEYS */;
INSERT INTO `feedstock_purchase_feedstock` VALUES (1,1,28,'401 | CA 25 | pt',135000.00,'cm',0.40),(2,1,31,'451 | CA 40 | pt',40000.00,'cm',0.74),(3,2,144,'102 | Aerado | vd',10000.00,'cm',11.90),(4,3,51,'851 | Tic Tac 25 | pt',1500.00,'un',0.15),(5,3,57,'951 | Tic Tac 50 | pt',500.00,'un',0.45),(6,3,70,'1201 | Meia argola 25 | pt',1000.00,'un',0.07),(7,3,97,'1710 | Terminal enforcador | pt',1000.00,'un',0.23),(8,3,150,'1901 | Alça Bob | pt',1000.00,'un',0.58),(9,4,28,'401 | CA 25 | pt',220000.00,'cm',0.40),(10,4,29,'402 | CA 25 | vd',80000.00,'cm',0.51),(11,4,30,'403 | CA 25 | tan',80000.00,'cm',0.51),(12,4,31,'451 | CA 40 | pt',35000.00,'cm',0.74),(13,4,32,'452 | CA 40 | vd',10000.00,'cm',0.82),(14,4,34,'501 | CA 50 | pt',25000.00,'cm',0.93),(15,4,35,'502 | CA 50 | vd',5000.00,'cm',1.02),(16,4,37,'551 | CA 70 | pt',30000.00,'cm',1.29),(17,4,39,'553 | CA 70 | tan',24900.00,'cm',1.43),(18,5,178,'1854 | Emborrachado coldre | pt',405.00,'un',1.10),(19,5,179,'1855 | Emborrachado coldre | vd',208.00,'un',1.10),(20,5,180,'1856 | Emborrachado coldre | tan',204.00,'un',1.10),(21,5,181,'1857 | Emborrachado botão | pt',1005.00,'un',1.20),(22,6,43,'651 | HXL | pt',500000.00,'cm',0.18),(23,6,45,'702 | Gorgurão | vd',200000.00,'cm',0.17),(24,6,186,'804 | Elástico 15 branco | S/C',12500.00,'cm',0.26),(25,7,116,'211 | Velcro 25 F (veltor) | pt',50000.00,'cm',1.03),(26,7,128,'311 | Velcro 50 F (veltor) | pt',50000.00,'cm',2.02),(27,7,130,'313 | Velcro 50 F (veltor) | vd',50000.00,'cm',2.40),(28,8,28,'401 | CA 25 | pt',270000.00,'cm',0.40),(29,8,31,'451 | CA 40 | pt',35000.00,'cm',0.74),(30,8,32,'452 | CA 40 | vd',30000.00,'cm',0.82),(31,8,33,'453 | CA 40 | tan',30000.00,'cm',0.82),(32,8,34,'501 | CA 50 | pt',25000.00,'cm',0.93),(33,8,35,'502 | CA 50 | vd',30000.00,'cm',1.02),(34,8,36,'503 | CA 50 | tan',30000.00,'cm',1.02),(35,9,100,'1751 | Cursor | pt',1350.00,'un',0.33),(36,10,87,'1551 | Regulador 40 | pt',6000.00,'un',0.06),(37,11,28,'401 | CA 25 | pt',255000.00,'cm',0.40),(38,11,31,'451 | CA 40 | pt',30000.00,'cm',0.74),(39,11,34,'501 | CA 50 | pt',15000.00,'cm',0.93),(40,12,28,'401 | CA 25 | pt',255000.00,'cm',0.40),(41,12,31,'451 | CA 40 | pt',25000.00,'cm',0.74),(42,12,34,'501 | CA 50 | pt',25000.00,'cm',0.93),(43,13,14,'101 | Aerado | pt',10000.00,'cm',12.95),(44,13,16,'201 | Velcro 25 F (light) | pt',25000.00,'cm',0.33),(45,13,17,'202 | Velcro 25 M (light) | pt',25000.00,'cm',0.33),(46,13,47,'751 | Zíper | pt',40000.00,'cm',0.55),(47,14,100,'1751 | Cursor | pt',4275.00,'un',0.33),(48,15,16,'201 | Velcro 25 F (light) | pt',200000.00,'cm',1.03),(49,15,22,'301 | Velcro 50 F (light) | pt',200000.00,'cm',0.77),(50,15,128,'311 | Velcro 50 F (veltor) | pt',50000.00,'cm',2.02),(51,16,52,'852 | Tic Tac 25 | vd',4500.00,'un',0.27),(52,16,53,'853 | Tic Tac 25 | tan',4500.00,'un',0.27),(53,16,71,'1202 | Meia argola 25 | vd',4000.00,'un',0.11),(54,16,72,'1203 | Meia argola 25 | tan',4000.00,'un',0.11),(55,16,80,'1352 | Ponteira | vd',4000.00,'un',0.28),(56,16,81,'1353 | Ponteira | tan',4000.00,'un',0.28),(57,16,85,'1502 | Regulador 25 | vd',4000.00,'un',0.07),(58,16,86,'1503 | Regulador 25 | tan',4000.00,'un',0.07),(59,16,90,'1601 | Regulador 50 | pt',2000.00,'un',0.22),(60,16,91,'1602 | Regulador 50 | vd',2508.00,'un',0.31),(61,16,92,'1603 | Regulador 50 | tan',2606.00,'un',0.31),(62,16,151,'1902 | Alça Bob | vd',1940.00,'un',0.64),(63,16,152,'1903 | Alça Bob | tan',2000.00,'un',0.64),(64,17,30,'403 | CA 25 | tan',60000.00,'cm',0.51),(65,17,190,'713 | CD 25 | tan',52800.00,'cm',0.26),(66,18,99,'103 | Aerado | tan',2720.00,'cm',11.90),(67,18,47,'751 | Zíper | pt',20000.00,'cm',0.55),(68,19,51,'851 | Tic Tac 25 | pt',2000.00,'un',0.15),(69,20,1,'1 | Córdoba Ripstop 300 | pt',10000.00,'cm',17.50),(70,20,143,'23 | Cordurex | tan',10000.00,'cm',13.00),(71,20,14,'101 | Aerado | pt',10000.00,'cm',11.90),(72,20,108,'205 | Velcro 25 F (light) | tan',25000.00,'cm',1.08),(73,20,29,'402 | CA 25 | vd',50000.00,'cm',1.00),(74,20,30,'403 | CA 25 | tan',50000.00,'cm',1.00),(75,20,33,'453 | CA 40 | tan',30000.00,'cm',1.00),(76,20,34,'501 | CA 50 | pt',50000.00,'cm',1.00),(77,20,35,'502 | CA 50 | vd',50000.00,'cm',1.00),(78,20,36,'503 | CA 50 | tan',10000.00,'cm',1.00),(79,20,60,'1001 | Botão | S/C',2000.00,'cm',0.30),(80,20,174,'2001 | Linha | pt',30.00,'un',5.00),(81,20,175,'2002 | Linha | vd',30.00,'un',5.00),(82,20,176,'2003 | Linha | tan',10.00,'un',5.00),(83,21,143,'23 | Cordurex | tan',12500.00,'cm',16.50),(84,21,13,'53 | Duratran | tan',5000.00,'cm',6.80),(85,22,143,'23 | Cordurex | tan',13000.00,'cm',13.00),(86,22,13,'53 | Duratran | tan',5000.00,'cm',6.80),(87,22,99,'103 | Aerado | tan',10000.00,'cm',11.90),(88,22,83,'151 | Bidin | pt',600.00,'cm',22.00),(89,22,82,'161 | Prateado | S/C',1500.00,'cm',7.00);
/*!40000 ALTER TABLE `feedstock_purchase_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_regress`
--

DROP TABLE IF EXISTS `feedstock_regress`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_regress` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `full_date` varchar(45) NOT NULL,
  `storage_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `regress_id` int(11) NOT NULL,
  `feedstock_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(45) NOT NULL,
  `full_date` varchar(45) NOT NULL,
  `storage_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `request_id` int(11) NOT NULL,
  `feedstock_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `storage_id` int(11) NOT NULL,
  `feedstock_id` int(11) NOT NULL,
  `amount` decimal(11,0) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=185 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `feedstock_storage`
--

LOCK TABLES `feedstock_storage` WRITE;
/*!40000 ALTER TABLE `feedstock_storage` DISABLE KEYS */;
INSERT INTO `feedstock_storage` VALUES (1,1,1,19600),(2,1,2,20000),(3,1,3,0),(4,1,10,0),(5,1,143,35000),(6,1,11,1100),(7,1,12,0),(8,1,13,7900),(9,1,14,10600),(10,1,144,0),(11,1,99,4220),(12,1,83,100000),(13,1,82,100000),(14,1,16,1000),(15,1,17,542500),(16,1,18,15000),(17,1,107,550000),(18,1,108,30000),(19,1,109,495000),(20,1,116,52500),(21,1,117,95000),(22,1,118,0),(23,1,119,95000),(24,1,120,0),(25,1,121,0),(26,1,19,75000),(27,1,20,492500),(28,1,21,0),(29,1,110,0),(30,1,111,0),(31,1,112,0),(32,1,122,0),(33,1,123,0),(34,1,124,0),(35,1,125,0),(36,1,126,0),(37,1,127,0),(38,1,22,25000),(39,1,23,467500),(40,1,24,92500),(41,1,113,482500),(42,1,114,30000),(43,1,115,462500),(44,1,128,0),(45,1,129,462500),(46,1,130,5000),(47,1,131,35000),(48,1,132,0),(49,1,133,0),(50,1,25,5000),(51,1,26,0),(52,1,27,0),(53,1,134,0),(54,1,135,0),(55,1,136,0),(56,1,137,0),(57,1,138,0),(58,1,139,0),(59,1,140,0),(60,1,141,0),(61,1,142,0),(62,1,28,125000),(63,1,29,130000),(64,1,30,135000),(65,1,31,100000),(66,1,32,60000),(67,1,33,85000),(68,1,34,195000),(69,1,35,45000),(70,1,36,30000),(71,1,37,15000),(72,1,38,50000),(73,1,39,20000),(74,1,40,0),(75,1,41,0),(76,1,42,0),(77,1,43,160000),(78,1,44,0),(79,1,45,200000),(80,1,46,10000),(81,1,47,18800),(82,1,48,46700),(83,1,49,36100),(84,1,50,75000),(85,1,145,35000),(86,1,51,268),(87,1,52,4200),(88,1,53,5600),(89,1,54,428),(90,1,55,0),(91,1,56,0),(92,1,57,528),(93,1,58,0),(94,1,59,0),(95,1,60,2000),(96,1,61,0),(97,1,62,0),(98,1,63,35000),(99,1,64,0),(100,1,65,0),(101,1,66,0),(102,1,67,0),(103,1,68,0),(104,1,69,0),(105,1,70,1892),(106,1,71,6200),(107,1,72,7900),(108,1,73,0),(109,1,74,0),(110,1,75,0),(111,1,76,0),(112,1,77,0),(113,1,78,0),(114,1,79,1448),(115,1,80,5197),(116,1,81,3398),(117,1,84,896),(118,1,85,3899),(119,1,86,6294),(120,1,87,2201),(121,1,88,0),(122,1,89,0),(123,1,90,1200),(124,1,91,2000),(125,1,92,2050),(126,1,93,0),(127,1,94,0),(128,1,95,358),(129,1,96,1000000),(130,1,97,1000),(131,1,100,1997),(132,1,101,1548),(133,1,102,2132),(134,1,103,13557),(135,1,104,302),(136,1,105,1242),(137,1,106,675),(142,1,150,1498),(143,1,151,2593),(144,1,152,2200),(145,1,153,1000000),(146,1,154,8300),(147,1,155,0),(148,1,156,5000),(149,1,157,70000),(150,1,158,70000),(154,1,164,190000),(155,1,165,50000),(156,1,166,75000),(157,1,167,2955),(158,1,168,1985),(159,1,169,10000),(160,1,170,325000),(161,1,171,70000),(162,1,172,40000),(163,1,173,15000),(164,1,174,12),(165,1,175,33),(166,1,176,40),(167,1,177,7500),(168,1,178,150),(169,1,179,149),(170,1,180,204),(171,1,181,764),(172,1,182,546),(173,1,183,0),(174,1,184,0),(175,1,185,9),(176,1,186,12500),(177,1,187,476),(178,1,188,0),(179,1,189,452),(180,1,190,52800),(181,1,191,0),(182,1,192,0),(183,1,193,0),(184,1,194,0);
/*!40000 ALTER TABLE `feedstock_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `feedstock_storage_instance`
--

DROP TABLE IF EXISTS `feedstock_storage_instance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `feedstock_storage_instance` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `supplier_id` int(11) NOT NULL,
  `feedstock_id` int(11) NOT NULL,
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
INSERT INTO `feedstock_supplier_storage` VALUES (1,2,1,20.00),(15,2,11,6.80),(16,2,12,6.80),(17,2,13,6.80),(18,2,143,14.80),(19,2,14,14.50),(20,2,99,11.90),(21,2,82,7.00),(22,2,83,27.00),(23,2,2,17.50),(24,2,16,0.30),(25,2,17,0.30),(26,2,18,0.60),(27,2,107,0.60),(28,2,108,1.08),(29,2,109,1.08),(30,2,116,1.55),(31,2,117,1.55),(32,2,128,2.40),(33,2,129,2.40),(34,2,118,1.55),(35,2,119,1.55),(36,2,130,3.10),(37,2,131,3.10),(38,2,47,0.55),(39,2,48,1.00),(40,2,49,1.00),(43,3,1,12.11),(44,3,11,6.24),(45,3,16,0.40),(46,3,22,0.77),(47,3,116,1.03),(49,3,122,1.59),(50,3,128,2.36),(51,3,118,0.90),(52,3,130,2.40),(53,3,47,0.63),(54,3,48,0.68),(55,3,49,0.68),(56,3,100,0.25),(59,2,100,0.33),(60,2,60,0.30),(65,4,28,0.44),(66,4,29,0.56),(67,4,30,0.56),(68,4,31,0.74),(69,4,32,0.82),(70,4,33,0.82),(71,4,34,0.93),(72,4,35,1.02),(73,4,36,1.02),(74,4,37,1.29),(75,4,38,1.43),(76,4,39,1.43),(77,1,85,0.07),(78,1,86,0.07),(79,1,71,0.11),(80,1,72,0.11),(81,1,52,0.27),(82,1,53,0.27),(83,1,151,0.64),(84,1,152,0.64),(85,2,84,0.06),(86,2,150,0.60),(87,2,87,0.06),(88,2,90,0.10),(89,2,70,0.07),(90,2,95,0.45),(91,2,169,0.54),(92,2,51,0.21),(93,2,54,0.23),(94,2,57,0.46),(95,4,164,0.88),(96,4,165,0.88),(97,4,166,0.88),(98,4,170,0.51),(99,4,171,0.82),(100,4,172,1.02),(101,4,173,1.43),(102,2,43,0.25),(103,2,44,0.22),(104,2,45,0.22),(105,2,46,0.22),(106,5,104,1.30),(107,5,105,1.30),(108,5,106,1.30),(109,5,103,0.30),(110,7,101,0.10),(111,7,102,0.10),(112,1,80,0.28),(113,2,19,0.60),(114,2,22,0.60),(115,2,24,2.28),(116,2,114,2.40),(117,2,115,2.40),(118,2,20,0.60),(119,2,23,0.60),(120,2,24,1.20),(121,2,113,1.20),(122,2,108,2.16),(123,2,109,2.16),(124,2,153,8.00),(125,3,144,11.90),(126,1,51,0.15),(127,1,57,0.45),(128,1,70,0.07),(129,1,150,0.58),(130,1,97,0.23),(131,5,178,1.10),(132,5,179,1.10),(133,5,180,1.10),(134,5,181,1.20),(135,8,43,0.18),(136,8,45,0.17),(137,8,186,0.26),(138,1,87,0.06),(139,8,16,0.33),(140,8,17,0.33),(141,8,47,0.51),(142,8,14,12.95),(143,8,100,0.33),(144,1,90,0.22),(146,1,91,0.31),(147,1,92,0.31),(149,1,81,0.28),(150,4,190,0.26),(151,9,154,0.24),(152,2,174,5.00),(153,2,175,5.00),(154,2,176,5.00),(155,2,29,0.43),(156,2,30,1.00),(157,2,33,1.00),(158,2,35,1.00),(159,2,34,1.00),(160,2,36,1.00);
/*!40000 ALTER TABLE `feedstock_supplier_storage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_income`
--

DROP TABLE IF EXISTS `financial_income`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_income` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(20) NOT NULL,
  `category_id` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `origin_id` int(11) NOT NULL,
  `origin_name` varchar(20) NOT NULL,
  `value` decimal(11,2) NOT NULL,
  `obs` varchar(80) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_income`
--

LOCK TABLES `financial_income` WRITE;
/*!40000 ALTER TABLE `financial_income` DISABLE KEYS */;
/*!40000 ALTER TABLE `financial_income` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_income_category`
--

DROP TABLE IF EXISTS `financial_income_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_income_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(20) NOT NULL,
  `full_date` varchar(45) NOT NULL,
  `category_id` int(11) NOT NULL,
  `category_name` varchar(20) NOT NULL,
  `origin_id` int(11) NOT NULL,
  `origin_name` varchar(20) NOT NULL,
  `payment_id` int(11) NOT NULL,
  `payment_name` varchar(20) NOT NULL,
  `value` decimal(11,2) NOT NULL,
  `obs` varchar(80) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `user_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome`
--

LOCK TABLES `financial_outcome` WRITE;
/*!40000 ALTER TABLE `financial_outcome` DISABLE KEYS */;
INSERT INTO `financial_outcome` VALUES (1,'2020-11-10','10-11-2020-18:21:10',1,'Funcionários',14,'Dodô',3,'ML JC',337.07,'Parcela Carro Dodô',1,'Henrique Lyra'),(2,'2020-11-10','10-11-2020-18:21:37',1,'Funcionários',24,'Sheyla',2,'ML CHRIS',240.00,'Vale',1,'Henrique Lyra'),(3,'2020-11-10','10-11-2020-18:22:1',1,'Funcionários',9,'Daniel',2,'ML CHRIS',454.00,'Passagem',1,'Henrique Lyra'),(4,'2020-11-10','10-11-2020-18:23:15',1,'Funcionários',111,'Giselly Lyra',2,'ML CHRIS',454.00,'Passagem',1,'Henrique Lyra'),(5,'2020-11-10','10-11-2020-18:23:44',1,'Funcionários',13,'Josefa',2,'ML CHRIS',340.00,'Passagem',1,'Henrique Lyra'),(6,'2020-11-10','10-11-2020-18:27:59',14,'Devoluções',114,'Lojistas',3,'ML JC',1221.95,'Toni Dirnei',1,'Henrique Lyra'),(7,'2020-11-10','10-11-2020-21:43:13',1,'Funcionários',118,'Igor Pathyck Costa F',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(8,'2020-11-10','10-11-2020-21:44:35',1,'Funcionários',15,'Betchola',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(9,'2020-11-10','10-11-2020-21:45:8',1,'Funcionários',14,'Dodô',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(10,'2020-11-10','10-11-2020-21:47:42',1,'Funcionários',11,'Fabiano',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(11,'2020-11-10','10-11-2020-21:49:59',1,'Funcionários',119,'Luis Guilherme',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(12,'2020-11-11','11-11-2020-14:9:20',1,'Funcionários',120,'Jaqueline Marinho',2,'ML CHRIS',340.00,'Passagem',1,'Henrique Lyra'),(13,'2020-11-11','11-11-2020-14:11:8',1,'Funcionários',81,'Rose',2,'ML CHRIS',340.00,'Passagem',1,'Henrique Lyra'),(14,'2020-11-11','11-11-2020-14:13:16',1,'Funcionários',18,'Caio',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(15,'2020-11-11','11-11-2020-14:13:34',1,'Funcionários',16,'Daniel Boca',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(16,'2020-11-11','11-11-2020-14:13:55',1,'Funcionários',17,'Danrlei',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(17,'2020-11-11','11-11-2020-14:15:3',1,'Funcionários',121,'Diogo',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(18,'2020-11-11','11-11-2020-14:17:19',1,'Funcionários',123,'Diego',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(19,'2020-11-11','11-11-2020-14:20:25',1,'Funcionários',122,'Alexandre',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(20,'2020-11-11','11-11-2020-14:25:3',1,'Funcionários',124,'Airton',2,'ML CHRIS',162.00,'Passagem',1,'Henrique Lyra'),(21,'2020-11-11','11-11-2020-14:25:37',1,'Funcionários',24,'Sheyla',2,'ML CHRIS',80.00,'Vale',1,'Henrique Lyra'),(22,'2020-11-11','11-11-2020-14:26:0',1,'Funcionários',10,'Henrique',2,'ML CHRIS',700.15,'Vale',1,'Henrique Lyra'),(23,'2020-11-11','11-11-2020-14:26:19',1,'Funcionários',10,'Henrique',2,'ML CHRIS',1000.00,'Vale',1,'Henrique Lyra'),(24,'2020-11-11','11-11-2020-14:33:15',10,'Costura Externa',106,'Carla',2,'ML CHRIS',271.20,'267 PST/69 PST  - 300,00 vale',1,'Henrique Lyra'),(25,'2020-11-11','11-11-2020-14:35:18',1,'Funcionários',23,'Jean',2,'ML CHRIS',722.18,'Vale',1,'Henrique Lyra'),(26,'2020-11-11','11-11-2020-14:50:57',4,'Custo Fixo',5,'Luz Loja',2,'ML CHRIS',160.49,'Outubro',1,'Henrique Lyra'),(27,'2020-11-11','11-11-2020-14:56:33',10,'Costura Externa',76,'Eliane Vandramini',2,'ML CHRIS',144.00,'24 Closes Pretos',1,'Henrique Lyra'),(28,'2020-11-11','11-11-2020-15:10:11',1,'Funcionários',125,'Dailane Brandão',2,'ML CHRIS',636.00,'',1,'Henrique Lyra'),(29,'2020-11-11','11-11-2020-15:13:9',1,'Funcionários',126,'Roseline',2,'ML CHRIS',199.00,'199 Porta Rádio',1,'Henrique Lyra'),(30,'2020-11-11','11-11-2020-15:15:40',1,'Funcionários',127,'Miriam Braga',2,'ML CHRIS',196.30,'82/21/48 bolsa P',1,'Henrique Lyra'),(31,'2020-11-11','11-11-2020-15:21:1',10,'Costura Externa',72,'Sandra Liz',2,'ML CHRIS',187.20,'96/48 Bolsa P',1,'Henrique Lyra'),(32,'2020-11-11','11-11-2020-16:40:34',10,'Costura Externa',128,'Lucimar',2,'ML CHRIS',44.20,'Pst',1,'Henrique Lyra'),(33,'2020-11-11','11-11-2020-16:41:0',10,'Costura Externa',89,'Angela',2,'ML CHRIS',544.00,'',1,'Henrique Lyra'),(34,'2020-11-11','11-11-2020-17:2:35',1,'Funcionários',23,'Jean',2,'ML CHRIS',225.66,'Curso Anny',1,'Henrique Lyra'),(35,'2020-11-11','11-11-2020-17:3:52',1,'Funcionários',23,'Jean',2,'ML CHRIS',253.00,'Água casa',1,'Henrique Lyra'),(36,'2020-11-11','11-11-2020-17:7:7',4,'Custo Fixo',129,'Verisure',2,'ML CHRIS',231.71,'',1,'Henrique Lyra'),(37,'2020-11-11','11-11-2020-17:7:42',1,'Funcionários',15,'Betchola',2,'ML CHRIS',359.87,'Pagamento',1,'Henrique Lyra'),(38,'2020-11-11','11-11-2020-17:8:48',1,'Funcionários',15,'Betchola',2,'ML CHRIS',210.00,'Metas',1,'Henrique Lyra'),(39,'2020-11-11','11-11-2020-17:9:9',1,'Funcionários',11,'Fabiano',2,'ML CHRIS',2680.62,'Pagamento',1,'Henrique Lyra'),(40,'2020-11-11','11-11-2020-17:9:39',1,'Funcionários',14,'Dodô',2,'ML CHRIS',1417.93,'Pagamento',1,'Henrique Lyra'),(41,'2020-11-11','11-11-2020-17:10:7',1,'Funcionários',17,'Danrlei',2,'ML CHRIS',1420.00,'Pagamento',1,'Henrique Lyra'),(42,'2020-11-11','11-11-2020-17:10:53',1,'Funcionários',15,'Betchola',2,'ML CHRIS',267.04,'Pensão',1,'Henrique Lyra'),(43,'2020-11-11','11-11-2020-17:11:12',1,'Funcionários',15,'Betchola',2,'ML CHRIS',212.44,'Pensao',1,'Henrique Lyra'),(44,'2020-11-11','11-11-2020-17:15:4',1,'Funcionários',16,'Daniel Boca',2,'ML CHRIS',1420.00,'Pagamento',1,'Henrique Lyra'),(45,'2020-11-11','11-11-2020-17:15:49',1,'Funcionários',18,'Caio',2,'ML CHRIS',1420.00,'Pagamento',1,'Henrique Lyra'),(46,'2020-11-11','11-11-2020-17:16:45',1,'Funcionários',9,'Daniel',2,'ML CHRIS',3641.69,'Pagamento',1,'Henrique Lyra'),(47,'2020-11-11','11-11-2020-17:19:1',1,'Funcionários',130,'Éric Lyra',2,'ML CHRIS',1659.00,'Pagamento',1,'Henrique Lyra'),(48,'2020-11-11','11-11-2020-17:19:26',1,'Funcionários',21,'Chris',2,'ML CHRIS',533.12,'Vale',1,'Henrique Lyra'),(49,'2020-11-11','11-11-2020-17:20:21',3,'Mat de Expediente',37,'Sacola JA',2,'ML CHRIS',275.00,'',1,'Henrique Lyra'),(50,'2020-11-11','11-11-2020-17:21:3',10,'Costura Externa',106,'Carla',2,'ML CHRIS',409.70,'',1,'Henrique Lyra'),(51,'2020-11-11','11-11-2020-17:22:46',5,'Fisco',26,'FGTS',2,'ML CHRIS',680.90,'',1,'Henrique Lyra'),(52,'2020-11-11','11-11-2020-17:33:56',1,'Funcionários',23,'Jean',2,'ML CHRIS',291.97,'Vale Água casa',1,'Henrique Lyra'),(53,'2020-11-11','11-11-2020-17:36:55',15,'Transportes',131,'Frilog',2,'ML CHRIS',173.14,'',1,'Henrique Lyra'),(54,'2020-11-11','11-11-2020-17:37:39',1,'Funcionários',24,'Sheyla',2,'ML CHRIS',550.00,'Vale, Patrícia psv',1,'Henrique Lyra'),(55,'2020-11-11','11-11-2020-17:38:44',1,'Funcionários',21,'Chris',2,'ML CHRIS',103.00,'Pagamento',1,'Henrique Lyra'),(56,'2020-11-11','11-11-2020-17:39:16',1,'Funcionários',111,'Giselly Lyra',2,'ML CHRIS',950.00,'Pagamento',1,'Henrique Lyra'),(57,'2020-11-11','11-11-2020-17:39:49',1,'Funcionários',19,'Luis Henrique',2,'ML CHRIS',1146.38,'Pagamento',1,'Henrique Lyra'),(58,'2020-11-11','11-11-2020-17:40:23',1,'Funcionários',124,'Airton',2,'ML CHRIS',950.00,'Pagamento',1,'Henrique Lyra'),(59,'2020-11-11','11-11-2020-17:41:3',1,'Funcionários',118,'Igor Pathyck Costa F',2,'ML CHRIS',1116.38,'Pagamento',1,'Henrique Lyra'),(60,'2020-11-11','11-11-2020-17:41:26',1,'Funcionários',123,'Diego',2,'ML CHRIS',1420.00,'Pagamento',1,'Henrique Lyra'),(61,'2020-11-11','11-11-2020-17:42:5',1,'Funcionários',119,'Luis Guilherme',2,'ML CHRIS',1034.77,'Pagamento',1,'Henrique Lyra'),(62,'2020-11-11','11-11-2020-17:43:15',1,'Funcionários',122,'Alexandre',2,'ML CHRIS',1420.00,'Pagamento',1,'Henrique Lyra'),(63,'2020-11-11','11-11-2020-17:43:38',1,'Funcionários',120,'Jaqueline Marinho',2,'ML CHRIS',2059.00,'Pagamento',1,'Henrique Lyra'),(64,'2020-11-11','11-11-2020-17:44:21',1,'Funcionários',81,'Rose',2,'ML CHRIS',1934.24,'Pagamento',1,'Henrique Lyra'),(65,'2020-11-11','11-11-2020-17:44:52',1,'Funcionários',13,'Josefa',2,'ML CHRIS',1932.25,'Pagamento',1,'Henrique Lyra'),(66,'2020-11-11','11-11-2020-17:45:8',1,'Funcionários',22,'Anny',2,'ML CHRIS',150.00,'Pagamento',1,'Henrique Lyra'),(67,'2020-11-11','11-11-2020-17:45:46',2,'Materia Prima',52,'Eduardo',2,'ML CHRIS',2397.00,'Cadarços',1,'Henrique Lyra'),(68,'2020-11-11','11-11-2020-17:57:23',16,'Publicidade',132,'Nilo',2,'ML CHRIS',400.00,'',1,'Henrique Lyra'),(69,'2020-11-11','11-11-2020-17:58:16',16,'Publicidade',133,'Fuzileiro sniper',2,'ML CHRIS',300.00,'',1,'Henrique Lyra'),(70,'2020-11-11','11-11-2020-18:1:7',1,'Funcionários',21,'Chris',2,'ML CHRIS',111.00,'Vale faculdade ',1,'Henrique Lyra'),(71,'2020-11-11','11-11-2020-18:1:39',4,'Custo Fixo',8,'Contador',2,'ML CHRIS',628.00,'',1,'Henrique Lyra'),(72,'2020-11-11','11-11-2020-18:20:53',15,'Transportes',140,'Correios',2,'ML CHRIS',1436.00,'',1,'Henrique Lyra'),(73,'2020-11-11','11-11-2020-18:21:56',1,'Funcionários',10,'Henrique',2,'ML CHRIS',10000.00,'Vale (Empréstimo)',1,'Henrique Lyra'),(74,'2020-11-11','11-11-2020-18:22:17',10,'Costura Externa',105,'Solange',2,'ML CHRIS',80.00,'',1,'Henrique Lyra'),(75,'2020-11-11','11-11-2020-18:22:57',1,'Funcionários',23,'Jean',2,'ML CHRIS',432.23,'Vale (colégio)',1,'Henrique Lyra'),(76,'2020-11-11','11-11-2020-18:23:29',1,'Funcionários',122,'Alexandre',2,'ML CHRIS',140.00,'Adicional noturno',1,'Henrique Lyra'),(77,'2020-11-11','11-11-2020-18:24:7',1,'Funcionários',123,'Diego',2,'ML CHRIS',140.00,'Adicional noturno',1,'Henrique Lyra'),(78,'2020-11-11','11-11-2020-18:39:24',1,'Funcionários',10,'Henrique',4,'COFRE',2600.00,'Pagamento',1,'Henrique Lyra'),(79,'2020-11-12','12-11-2020-13:46:1',10,'Costura Externa',68,'Lucení Gandra',2,'ML CHRIS',614.00,'',1,'Henrique Lyra'),(80,'2020-11-12','12-11-2020-13:47:31',10,'Costura Externa',67,'Adriana Rodrigues',2,'ML CHRIS',316.00,'',1,'Henrique Lyra'),(81,'2020-11-12','12-11-2020-13:50:53',10,'Costura Externa',106,'Carla',2,'ML CHRIS',394.40,'',1,'Henrique Lyra'),(82,'2020-11-12','12-11-2020-13:54:46',10,'Costura Externa',71,'Lucilene Domingos',2,'ML CHRIS',300.00,'',1,'Henrique Lyra'),(83,'2020-11-12','12-11-2020-13:55:35',10,'Costura Externa',73,'Denise Telles',2,'ML CHRIS',361.10,'',1,'Henrique Lyra'),(84,'2020-11-12','12-11-2020-14:19:44',10,'Costura Externa',84,'Jaqueline Leão',2,'ML CHRIS',220.00,'',1,'Henrique Lyra'),(85,'2020-11-12','12-11-2020-14:32:56',10,'Costura Externa',141,'Roseline Barbosa',2,'ML CHRIS',202.00,'',1,'Henrique Lyra'),(86,'2020-11-12','12-11-2020-14:34:58',10,'Costura Externa',76,'Eliane Vandramini',2,'ML CHRIS',288.00,'',1,'Henrique Lyra'),(87,'2020-11-12','12-11-2020-14:36:14',10,'Costura Externa',142,'Mariana Santos',2,'ML CHRIS',187.80,'',1,'Henrique Lyra'),(88,'2020-11-12','12-11-2020-14:37:44',10,'Costura Externa',74,'André Ferreira',2,'ML CHRIS',144.00,'',1,'Henrique Lyra'),(89,'2020-11-12','12-11-2020-14:39:13',10,'Costura Externa',143,'Tatiane Custódio',2,'ML CHRIS',392.60,'',1,'Henrique Lyra'),(90,'2020-11-12','12-11-2020-14:39:54',10,'Costura Externa',70,'Denise Regina',2,'ML CHRIS',143.00,'',1,'Henrique Lyra'),(91,'2020-11-12','12-11-2020-14:43:13',1,'Funcionários',23,'Jean',7,'BRADESCO',80.00,'Vale Sheyla',1,'Henrique Lyra'),(92,'2020-11-13','13-11-2020-17:23:53',2,'Materia Prima',55,'Brasmac',2,'ML CHRIS',3598.50,'',1,'Henrique Lyra'),(93,'2020-11-13','13-11-2020-17:26:47',2,'Materia Prima',55,'Brasmac',2,'ML CHRIS',2023.50,'Valentim Carlos',1,'Henrique Lyra'),(94,'2020-11-13','13-11-2020-18:39:45',2,'Materia Prima',144,'Omborgo',2,'ML CHRIS',6364.00,'',1,'Henrique Lyra'),(95,'2020-11-13','13-11-2020-18:41:10',1,'Funcionários',121,'Diogo',2,'ML CHRIS',1322.44,'Pagamento + sábados',1,'Henrique Lyra'),(96,'2020-11-16','16-11-2020-8:28:40',1,'Funcionários',120,'Jaqueline Marinho',4,'COFRE',500.00,'Sábados metas e passagens',1,'Henrique Lyra'),(97,'2020-11-16','16-11-2020-8:30:10',10,'Costura Externa',145,'Dailane Brandão',2,'ML CHRIS',610.00,'',1,'Henrique Lyra'),(98,'2020-11-16','16-11-2020-8:30:43',10,'Costura Externa',89,'Angela',2,'ML CHRIS',1044.40,'Ângela ',1,'Henrique Lyra'),(99,'2020-11-16','16-11-2020-8:39:42',10,'Costura Externa',68,'Lucení Gandra',2,'ML CHRIS',470.00,'',1,'Henrique Lyra'),(100,'2020-11-16','16-11-2020-8:40:7',10,'Costura Externa',71,'Lucilene Domingos',2,'ML CHRIS',150.00,'',1,'Henrique Lyra'),(101,'2020-11-16','16-11-2020-8:40:31',10,'Costura Externa',73,'Denise Telles',2,'ML CHRIS',150.00,'',1,'Henrique Lyra'),(102,'2020-11-16','16-11-2020-8:40:52',10,'Costura Externa',106,'Carla',2,'ML CHRIS',348.50,'',1,'Henrique Lyra'),(103,'2020-11-16','16-11-2020-8:41:15',1,'Funcionários',9,'Daniel',2,'ML CHRIS',500.00,'Vale',1,'Henrique Lyra'),(104,'2020-11-16','16-11-2020-8:41:43',1,'Funcionários',18,'Caio',2,'ML CHRIS',1333.33,'Férias ',1,'Henrique Lyra'),(105,'2020-11-16','16-11-2020-8:45:2',16,'Publicidade',146,'Samuel',2,'ML CHRIS',300.00,'',1,'Henrique Lyra'),(106,'2020-11-16','16-11-2020-18:34:47',3,'Mat de Expediente',37,'Sacola JA',2,'ML CHRIS',275.00,'',1,'Henrique Lyra'),(107,'2020-11-16','16-11-2020-18:44:52',1,'Funcionários',23,'Jean',2,'ML CHRIS',120.00,'Vale Sheyla',1,'Henrique Lyra'),(108,'2020-11-16','16-11-2020-18:47:36',1,'Funcionários',81,'Rose',4,'COFRE',167.00,'Sábado (14/11) + passagens',1,'Henrique Lyra'),(109,'2020-11-23','23-11-2020-10:17:12',10,'Costura Externa',74,'André Ferreira',3,'ML JC',180.47,'Vale conta de luz',1,'Henrique Lyra'),(110,'2020-11-23','23-11-2020-10:18:9',5,'Fisco',27,'GPS',2,'ML CHRIS',479.46,'',1,'Henrique Lyra'),(111,'2020-11-23','23-11-2020-10:21:33',4,'Custo Fixo',147,'Net Galpão',2,'ML CHRIS',229.07,'',1,'Henrique Lyra'),(112,'2020-11-23','23-11-2020-10:22:9',1,'Funcionários',23,'Jean',2,'ML CHRIS',356.35,'Vale NET casa',1,'Henrique Lyra'),(113,'2020-11-23','23-11-2020-10:23:51',4,'Custo Fixo',148,'Net Loja',2,'ML CHRIS',122.77,'',1,'Henrique Lyra'),(114,'2020-11-23','23-11-2020-10:26:5',17,'Administração',149,'Marca',2,'ML CHRIS',2297.00,'Registro de marca 1º boleto',1,'Henrique Lyra'),(115,'2020-11-23','23-11-2020-10:26:31',17,'Administração',149,'Marca',2,'ML CHRIS',2297.00,'Registro de marca 2º boleto',1,'Henrique Lyra'),(116,'2020-11-23','23-11-2020-10:27:54',14,'Devoluções',113,'Mercado Livre CHRIS',2,'ML CHRIS',43.60,'Gustavo Queiroz Correia',1,'Henrique Lyra'),(117,'2020-11-23','23-11-2020-10:28:35',14,'Devoluções',113,'Mercado Livre CHRIS',2,'ML CHRIS',62.17,'Lucas Matheus de Jesus Teixeira',1,'Henrique Lyra'),(118,'2020-11-23','23-11-2020-10:29:22',10,'Costura Externa',84,'Jaqueline Leão',2,'ML CHRIS',440.00,'',1,'Henrique Lyra'),(119,'2020-11-23','23-11-2020-10:29:48',10,'Costura Externa',141,'Roseline Barbosa',2,'ML CHRIS',200.00,'',1,'Henrique Lyra'),(120,'2020-11-23','23-11-2020-10:31:5',1,'Funcionários',23,'Jean',2,'ML CHRIS',2330.56,'Vale Toro',1,'Henrique Lyra'),(121,'2020-11-23','23-11-2020-10:31:36',1,'Funcionários',22,'Anny',2,'ML CHRIS',139.80,'Vale',1,'Henrique Lyra'),(122,'2020-11-23','23-11-2020-10:32:37',4,'Custo Fixo',93,'Seguro',2,'ML CHRIS',188.33,'Seguro Pálio',1,'Henrique Lyra'),(123,'2020-11-23','23-11-2020-10:33:51',18,'Comercial',150,'Alessandro Pinout',2,'ML CHRIS',2997.00,'',1,'Henrique Lyra'),(124,'2020-11-23','23-11-2020-10:34:24',10,'Costura Externa',83,'Paulo Roberto',2,'ML CHRIS',432.00,'',1,'Henrique Lyra'),(125,'2020-11-25','25-11-2020-9:57:20',1,'Funcionários',23,'Jean',2,'ML CHRIS',1270.00,'Vale (Aluguel)',1,'Henrique Lyra'),(126,'2020-11-25','25-11-2020-9:59:5',4,'Custo Fixo',2,'Aluguel Fábrica',2,'ML CHRIS',5458.25,'',1,'Henrique Lyra'),(127,'2020-11-25','25-11-2020-10:0:28',1,'Funcionários',9,'Daniel',2,'ML CHRIS',609.86,'13º',1,'Henrique Lyra'),(128,'2020-11-25','25-11-2020-10:2:53',7,'Máquinas',151,'Lanmax',2,'ML CHRIS',3812.67,'',1,'Henrique Lyra');
/*!40000 ALTER TABLE `financial_outcome` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_outcome_category`
--

DROP TABLE IF EXISTS `financial_outcome_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_outcome_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome_category`
--

LOCK TABLES `financial_outcome_category` WRITE;
/*!40000 ALTER TABLE `financial_outcome_category` DISABLE KEYS */;
INSERT INTO `financial_outcome_category` VALUES (17,'Administração'),(18,'Comercial'),(10,'Costura Externa'),(4,'Custo Fixo'),(13,'Despesas Extras'),(14,'Devoluções'),(5,'Fisco'),(1,'Funcionários'),(7,'Máquinas'),(6,'Marketing'),(3,'Mat de Expediente'),(2,'Materia Prima'),(8,'Mercado Livre'),(12,'Produtos Loja'),(16,'Publicidade'),(11,'Saque'),(9,'Site'),(15,'Transportes');
/*!40000 ALTER TABLE `financial_outcome_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `financial_outcome_origin`
--

DROP TABLE IF EXISTS `financial_outcome_origin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `financial_outcome_origin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=152 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome_origin`
--

LOCK TABLES `financial_outcome_origin` WRITE;
/*!40000 ALTER TABLE `financial_outcome_origin` DISABLE KEYS */;
INSERT INTO `financial_outcome_origin` VALUES (1,4,'Aluguel Loja'),(2,4,'Aluguel Fábrica'),(3,4,'Água Loja'),(4,4,'Água Fábrica'),(5,4,'Luz Loja'),(6,4,'Luz Fábrica'),(7,4,'Telefone Loja'),(8,4,'Contador'),(9,1,'Daniel'),(10,1,'Henrique'),(11,1,'Fabiano'),(13,1,'Josefa'),(14,1,'Dodô'),(15,1,'Betchola'),(16,1,'Daniel Boca'),(17,1,'Danrlei'),(18,1,'Caio'),(19,1,'Luis Henrique'),(20,1,'Luana'),(21,1,'Chris'),(22,1,'Anny'),(23,1,'Jean'),(24,1,'Sheyla'),(25,5,'Nota Fiscal'),(26,5,'FGTS'),(27,5,'GPS'),(28,6,'Agência Macro'),(29,6,'Vídeos'),(30,3,'Café'),(31,3,'Açucar'),(32,3,'Manteiga'),(34,3,'Churrasco'),(35,3,'Folha A4'),(36,3,'Fitas Adesivas'),(37,3,'Sacola JA'),(38,3,'Saco de Lixo'),(39,3,'Saco Bobina'),(40,3,'Saco Merc Livre'),(41,3,'Saco Nota Fiscal'),(42,3,'Papel Higiênico'),(43,3,'Tinta Impressora'),(44,3,'Tonner Impressora'),(45,3,'Material Limpeza'),(46,3,'Almoxerifado'),(47,7,'Agulhas'),(48,7,'Peças'),(49,7,'Compra de Máquina'),(50,2,'Luã'),(51,2,'China'),(52,2,'Eduardo'),(53,2,'Adina'),(54,2,'Oiapoc'),(55,2,'Brasmac'),(56,2,'Jorge Etiqueta'),(57,2,'Cordon Textil'),(59,2,'Santex'),(60,2,'Rogério Emborrachado'),(61,8,'Devolução Chris'),(62,8,'Devolução JC'),(64,9,'Devolução Tray'),(65,10,'Wilton Silva'),(66,10,'Míriam Braga Amorim'),(67,10,'Adriana Rodrigues '),(68,10,'Lucení Gandra'),(69,10,'Maria Graças'),(70,10,'Denise Regina'),(71,10,'Lucilene Domingos'),(72,10,'Sandra Liz'),(73,10,'Denise Telles'),(74,10,'André Ferreira'),(75,10,'Lídia Carvalho'),(76,10,'Eliane Vandramini'),(77,10,'Vera Lúcia'),(78,10,'Fátima Cristina'),(79,4,'Alimentação'),(80,4,'MDLivre'),(81,1,'Rose'),(82,4,'Servidor'),(83,10,'Paulo Roberto'),(84,10,'Jaqueline Leão'),(85,4,'combustivel'),(87,4,'marketing'),(88,4,'Colegio JJ'),(89,10,'Angela'),(91,12,'Centro'),(92,13,'Material Construção'),(93,4,'Seguro'),(96,4,'Aluguel casa'),(97,4,'Net casa'),(98,4,'Luz casa'),(99,4,'Faculdade'),(100,4,'Curso'),(101,3,'Pão'),(102,3,'Super bonder'),(103,3,'Papel Pardo'),(104,13,'Motoboy'),(105,10,'Solange'),(106,10,'Carla'),(107,3,'Água Mineral'),(108,7,'Óleo'),(109,3,'Giz de cera'),(110,3,'Fita métrica'),(111,1,'Giselly Lyra'),(112,14,'Mercado Livre JC'),(113,14,'Mercado Livre CHRIS'),(114,14,'Lojistas'),(115,14,'Loja'),(116,14,'Site'),(117,14,'B2W'),(118,1,'Igor Pathyck Costa F'),(119,1,'Luis Guilherme'),(120,1,'Jaqueline Marinho'),(121,1,'Diogo'),(122,1,'Alexandre'),(123,1,'Diego'),(124,1,'Airton'),(125,1,'Dailane Brandão'),(126,1,'Roseline'),(127,1,'Miriam Braga'),(128,10,'Lucimar'),(129,4,'Verisure'),(130,1,'Éric Lyra'),(131,15,'Frilog'),(132,16,'Nilo'),(133,16,'Fuzileiro sniper'),(140,15,'Correios'),(141,10,'Roseline Barbosa'),(142,10,'Mariana Santos'),(143,10,'Tatiane Custódio'),(144,2,'Omborgo'),(145,10,'Dailane Brandão'),(146,16,'Samuel'),(147,4,'Net Galpão'),(148,4,'Net Loja'),(149,17,'Marca'),(150,18,'Alessandro Pinout'),(151,7,'Lanmax');
/*!40000 ALTER TABLE `financial_outcome_origin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `name` varchar(30) NOT NULL,
  `color` varchar(3) NOT NULL,
  `size` varchar(3) NOT NULL,
  `brand` varchar(45) DEFAULT 'Sem marca',
  `image` varchar(200) DEFAULT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'disponível',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=199 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (6,2,'Colete Modular Close','pt','M','J.A Rio Militar','https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_921376-MLB32384653424_102019-F.webp','Disponível'),(8,11,'Colete Mod. Plate Carrier','pt','ST','J.A Rio Militar','https://images2.imgbox.com/a7/91/s7LUllxu_o.png','Disponível'),(9,61,'Colete Mod. Plate Carrier','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_637499-MLB32171338342_092019-F.webp','Disponível'),(10,111,'Colete Mod. Plate Carrier','tan','ST','J.A Rio Militar','https://images2.imgbox.com/e9/1e/DwxHgEM8_o.png','Disponível'),(11,51,'Colete Modular Close','vd','M','J.A Rio Militar','https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_782208-MLB31525086631_072019-F.webp','Disponível'),(13,102,'Colete Modular Close','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_876443-MLB31525038711_072019-F.webp','Disponível'),(22,107,'Colete Modular JA3','tan','ST','J.A Rio Militar','','Indisponível'),(25,7,'Colete Modular JA3','pt','M','J.A Rio Militar','https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_747405-MLB40679379565_022020-F.webp','Disponível'),(26,501,'Porta Camelback Modular','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_818244-MLB31498972733_072019-F.webp','Disponível'),(27,502,'Bolsa Pequena Modular','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_914251-MLB31499264300_072019-F.webp','Disponível'),(28,503,'Bolsa M Modular','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_686256-MLB31499295947_072019-F.webp','Disponível'),(29,504,'Bolsa G Modular','pt','ST','J.A Rio Militar','','Indisponível'),(30,505,'Porta Carregador Fuzil Velcro','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_757661-MLB31489198431_072019-F.webp','Disponível'),(31,506,'Porta Carregador Fuzil Tic Tac','pt','ST','J.A Rio Militar','','Indisponível'),(32,507,'Porta Carregador Fuzil Elástic','pt','ST','J.A Rio Militar','','Indisponível'),(33,508,'Porta Carregador Pistola Duplo','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_991989-MLB31498767755_072019-F.webp','Disponível'),(34,509,'Porta Carregador SMT/UMP','pt','ST','J.A Rio Militar','','Indisponível'),(35,510,'Porta Carregador Calibre 12','pt','ST','J.A Rio Militar','','Indisponível'),(36,511,'Coldre Modular Universal D','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_614333-MLB31188151337_062019-F.webp','Disponível'),(37,512,'Coldre Modular Universal C','pt','ST','J.A Rio Militar','','Indisponível'),(38,513,'Porta Rádio/HT','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_656091-MLB31498880362_072019-F.webp','Disponível'),(39,551,'Porta Camelback Modular','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_994834-MLB31637343115_072019-F.webp','Disponível'),(40,552,'Bolsa Pequena Modular','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_647582-MLB31637418984_072019-O.webp','Disponível'),(41,553,'Bolsa M Modular','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_638411-MLB31637475175_072019-F.webp','Disponível'),(42,554,'Bolsa G Modular','vd','ST','J.A Rio Militar','','Indisponível'),(43,555,'Porta Carregador Fuzil Velcro','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_944890-MLB31489198379_072019-F.webp','Disponível'),(44,556,'Porta Carregador Fuzil Tic Tac','vd','ST','J.A Rio Militar','','Indisponível'),(45,557,'Porta Carregador Fuzil Elástic','vd','ST','J.A Rio Militar','','Indisponível'),(46,558,'Porta Carregador Pistola Duplo','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_855674-MLB31637386042_072019-O.webp','Disponível'),(47,559,'Porta Carregador SMT/UMP','vd','ST','J.A Rio Militar','','Indisponível'),(48,560,'Porta Carregador Calibre 12','vd','ST','J.A Rio Militar','','Indisponível'),(49,561,'Coldre Modular Universal D','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_891206-MLB31637493260_072019-F.webp','Disponível'),(50,562,'Coldre Modular Universal C','vd','ST','J.A Rio Militar','','Indisponível'),(51,563,'Porta Rádio/HT','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_753711-MLB31637402319_072019-F.webp','Disponível'),(52,601,'Porta Camelback Modular','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_968416-MLB31498980211_072019-F.webp','Disponível'),(53,602,'Bolsa Pequena Modular','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_844052-MLB31499287530_072019-O.webp','Disponível'),(54,603,'Bolsa M Modular','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_913216-MLB31499309648_072019-F.webp','Disponível'),(55,604,'Bolsa G Modular','tan','ST','J.A Rio Militar','','Indisponível'),(56,605,'Porta Carregador Fuzil Velcro','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_992259-MLB31489216682_072019-F.webp','Disponível'),(57,606,'Porta Carregador Fuzil Tic Tac','tan','ST','J.A Rio Militar','','Indisponível'),(58,607,'Porta Carregador Fuzil Elástic','tan','ST','J.A Rio Militar','','Indisponível'),(59,608,'Porta Carregador Pistola Duplo','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_938060-MLB31498783777_072019-F.webp','Disponível'),(60,609,'Porta Carregador SMT/UMP','tan','ST','J.A Rio Militar','','Indisponível'),(61,610,'Porta Carregador Calibre 12','tan','ST','J.A Rio Militar','','Indisponível'),(62,611,'Coldre Modular Universal D','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_740157-MLB31116893591_062019-O.webp','Disponível'),(63,612,'Coldre Modular Universal C','tan','ST','J.A Rio Militar','','Indisponível'),(64,613,'Porta Rádio/HT','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_812664-MLB31498880408_072019-F.webp','Disponível'),(65,1001,'Coldre de Perna Universal D','pt','ST','J.A Rio Militar','https://i.imgur.com/PElazsL.jpg','Disponível'),(66,1002,'Coldre de Perna Universal C','pt','ST','J.A Rio Militar','','Indisponível'),(67,1051,'Coldre de Perna Universal D','vd','ST','J.A Rio Militar','https://i.imgur.com/L6aF3oN.jpg','Disponível'),(68,1052,'Coldre de Perna Universal C','vd','ST','J.A Rio Militar','','Indisponível'),(69,1101,'Coldre de Perna Universal D','tan','ST','J.A Rio Militar','https://i.imgur.com/1khKOSI.jpg','Disponível'),(70,1102,'Coldre de Perna Universal C','tan','ST','J.A Rio Militar','','Indisponível'),(71,1501,'Cinto Tático Fivela Plástico','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/D_NQ_NP_811857-MLB32723845812_102019-O.webp','Disponível'),(72,1502,'Cinto Tático NA','pt','ST','Sem marca','','Indisponível'),(73,1551,'Cinto Tático Fivela Plástico','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/D_NQ_NP_997201-MLB32722274934_102019-O.webp','Disponível'),(74,1552,'Cinto Tático NA','vd','ST','Sem marca','','Indisponível'),(75,1601,'Cinto Tático Fivela Plástico','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/D_NQ_NP_912270-MLB32723814392_102019-O.webp','Disponível'),(76,1602,'Cinto Tático NA','tan','ST','Sem marca','','Indisponível'),(77,2001,'Bornal Fuzil Tic Tac','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/D_NQ_NP_951658-MLB32818629453_112019-O.webp','Disponível'),(78,2002,'Bornal 3 PST','pt','ST','J.A Rio Militar','','Indisponível'),(79,2051,'Bornal Fuzil Tic Tac','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_619297-MLB40508982130_012020-F.webp','Disponível'),(80,2052,'Bornal 3 PST','vd','ST','J.A Rio Militar','','Indisponível'),(81,2101,'Bornal Fuzil Tic Tac','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_792745-MLB40508981173_012020-F.webp','Disponível'),(82,2102,'Bornal 3 PST','tan','ST','J.A Rio Militar','https://images2.imgbox.com/74/84/Jq4QWDmL_o.png','Disponível'),(83,2501,'Bandoleira J.A 1 ponto','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/bandoleira-operacional-1-ponto-ja-rio-militar-D_NQ_NP_784857-MLB31117454275_062019-F.webp','Disponível'),(84,2551,'Bandoleira J.A 1 ponto','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/D_NQ_NP_846967-MLB42314176204_062020-O.webp','Disponível'),(85,2601,'Bandoleira J.A 1 ponto','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/D_NQ_NP_919268-MLB42314171557_062020-O.webp','Disponível'),(86,514,'Porta Algemas','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-algema-ja-rio-militar-D_NQ_NP_935984-MLB32866315689_112019-O.webp','Disponível'),(87,564,'Porta Algemas','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/algema-militar-porta-D_NQ_NP_831797-MLB32866309773_112019-O.webp','Indisponível'),(88,614,'Porta Algemas','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/porta-algema-ja-rio-militar-D_NQ_NP_653449-MLB32866311743_112019-O.webp','Indisponível'),(92,5401,'Shemagh simples','S/C','ST','Sem marca',NULL,'Disponível'),(93,3001,'Mochila pequena','S/C','ST','Sem marca',NULL,'Disponível'),(94,3002,'Mochila média','S/C','ST','Sem marca',NULL,'Disponível'),(95,3003,'Mochila Grande','S/C','ST','Sem marca',NULL,'Disponível'),(96,5801,'Suporte Celular braço ','S/C','ST','Sem marca',NULL,'Disponível'),(97,5701,'Kit cantil ','S/C','ST','Sem marca',NULL,'Disponível'),(98,3701,'Refil Camelback 2.5L','S/C','ST','Sem marca',NULL,'Disponível'),(99,3901,'Farda exército','cvd','P','Sem marca',NULL,'Disponível'),(100,3902,'Farda Exército','cvd','M','Sem marca',NULL,'Disponível'),(101,3903,'Farda Exército ','cvd','G','Sem marca',NULL,'Disponível'),(102,3904,'Farda Exército','cvd','GG','Sem marca',NULL,'Disponível'),(103,4701,'Gorro','S/C','ST','Sem marca',NULL,'Disponível'),(104,4001,'Faca Tática','S/C','ST','Sem marca',NULL,'Disponível'),(105,4101,'Canivete Pequeno','S/C','ST','Sem marca',NULL,'Disponível'),(106,4102,'Canivete médio','S/C','ST','Sem marca',NULL,'Disponível'),(107,4103,'Canivete Grande','S/C','ST','Sem marca',NULL,'Disponível'),(108,4104,'Multiuso talher','S/C','ST','Sem marca',NULL,'Disponível'),(109,4901,'Bússola simples','S/C','ST','Sem marca',NULL,'Disponível'),(110,4201,'Mini lanterna','S/C','ST','Sem marca',NULL,'Disponível'),(111,4202,'Lanterna Pequena','S/C','ST','Sem marca',NULL,'Disponível'),(112,4203,'Lanterna Choque','S/C','ST','Sem marca',NULL,'Disponível'),(113,4204,'Lanterna Tática','S/C','ST','Sem marca',NULL,'Disponível'),(114,5001,'Par de Bombacho','S/C','ST','Sem marca',NULL,'Disponível'),(115,5101,'Cadeado pequeno','S/C','ST','Sem marca',NULL,'Disponível'),(116,4401,'Pulseira c/ Bússola','S/C','ST','Sem marca',NULL,'Disponível'),(117,4801,'Capacete Básico','S/C','ST','Sem marca',NULL,'Disponível'),(118,5301,'Máscara Tática','S/C','ST','Sem marca',NULL,'Disponível'),(119,4501,'Boné simples','S/C','ST','Sem marca',NULL,'Disponível'),(120,3801,'Fiel Aspiral','S/C','ST','Sem marca',NULL,'Disponível'),(121,5501,'Gandoleta','S/C','ST','Sem marca',NULL,'Disponível'),(122,4301,'Mochila Camelback','S/C','ST','Sem marca',NULL,'Disponível'),(123,5601,'Bolsa Velame','S/C','ST','Sem marca',NULL,'Disponível'),(124,4601,'Chapéu caçador','S/C','ST','Sem marca',NULL,'Disponível'),(125,3601,'Kit Cotoveleira e Joelheira','pt','ST','Sem marca',NULL,'Disponível'),(126,3602,'Kit Cotoveleira e Joelheira','vd','ST','Sem marca',NULL,'Disponível'),(127,3603,'Kit Cotoveleira e Joelheira','tan','ST','Sem marca',NULL,'Disponível'),(128,1503,'Cinto Tático Black Hawk','pt','ST','Sem marca','','Indisponível'),(129,1553,'Cinto Tático Black Hawk','vd','ST','Sem marca','','Indisponível'),(130,1603,'Cinto Tático Black Hawk','tan','ST','Sem marca',NULL,'Disponível'),(131,1003,'Mini Coldre p/ Cinto D','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_946742-MLB32782258810_112019-F.webp','Disponível'),(132,1053,'Mini Coldre p/ Cinto D','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_701109-MLB32782262773_112019-F.webp','Disponível'),(133,1103,'Mini Coldre p/ Cinto D','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_809649-MLB32782258915_112019-F.webp','Disponível'),(137,5901,'Corta Vento','S/C','ST','Sem marca',NULL,'Disponível'),(138,5902,'Casaco tático','S/C','ST','Sem marca',NULL,'Disponível'),(139,5903,'Malvinão','S/C','ST','Sem marca',NULL,'Disponível'),(154,1004,'Mini Coldre p/ Cinto C','pt','ST','J.A Rio Militar','','Indisponível'),(155,1054,'Mini Coldre p/ Cinto C','vd','ST','J.A Rio Militar','','Indisponível'),(156,1104,'Mini Coldre p/ Cinto C','tan','ST','J.A Rio Militar','','Indisponível'),(157,2003,'Bornal Compact','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_610264-MLB40104687571_122019-O.webp','Disponível'),(158,2053,'Bornal Compact','vd','ST','J.A Rio Militar','https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_677293-MLB40104691591_122019-F.webp','Disponível'),(159,2103,'Bornal Compact','tan','ST','J.A Rio Militar','https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_761759-MLB40104688663_122019-F.webp','Disponível'),(160,31,'Colete Gola','pt','ST','J.A Rio Militar','','Indisponível'),(161,18,'Colete Bope','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_641618-MLB41153254173_032020-F.webp','Disponível'),(170,161,'Colete Mod. Plate Carrier','mtc','ST','J.A Rio Militar','https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_726845-MLB32284302010_092019-F.webp','Disponível'),(171,211,'Colete Mod. Plate Carrier','mpt','ST','J.A Rio Militar','https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_774858-MLB32503554703_102019-F.webp','Disponível'),(172,1005,'Coldre de Perna Robocop D','pt','ST','J.A Rio Militar','https://http2.mlstatic.com/D_NQ_NP_894444-MLB32814525974_112019-O.webp','Disponível'),(173,1006,'Coldre de Perna Robocop C','pt','ST','J.A Rio Militar','','Indisponível'),(174,13,'Colete Mod. Plate C. Canguru','pt','ST','J.A Rio Militar','','Indisponível'),(175,2004,'Bornal Tatico','pt','ST','J.A Rio Militar','','Indisponível'),(176,2005,'Bornal Modular','pt','ST','J.A Rio Militar','','Indisponível'),(177,2301,'Plataforma Modular de Perna','pt','ST','J.A Rio Militar',NULL,'Disponível'),(178,3005,'Mochila Modular','pt','ST','J.A Rio Militar','','Indisponível'),(179,515,'Bolsa Med. Kit','pt','ST','J.A Rio Militar','','Indisponível'),(181,57,'Colete Modular JA3','vd','ST','J.A Rio Militar','','Indisponível'),(182,1,'Colete Modular Close','pt','P','J.A Rio Militar','','Indisponível'),(183,3,'Colete Modular Close','pt','G','J.A Rio Militar','','Indisponível'),(184,4,'Colete Modular Close','pt','GG','J.A Rio Militar','','Indisponível'),(185,6,'Colete Modular JA3','pt','P','J.A Rio Militar','','Indisponível'),(186,8,'Colete Modular JA3','pt','G','J.A Rio Militar','','Indisponível'),(187,52,'Colete Modular Close 9 Acess.','vd','ST','J.A Rio Militar','','Indisponível'),(188,53,'Colete Modular Close','vd','G','J.A Rio Militar','','Indisponível'),(189,54,'Colete Modular Close','vd','GG','J.A Rio Militar','','Indisponível'),(190,101,'Colete Modular Close','tan','P','J.A Rio Militar','','Indisponível'),(191,103,'Colete Modular Close','tan','G','J.A Rio Militar','','Indisponível'),(192,104,'Colete Modular Close','tan','GG','J.A Rio Militar','','Indisponível'),(193,9,'Colete Modular JA3','pt','GG','J.A Rio Militar','','Indisponível'),(194,12,'Colete Mod. Plate Carrier 8 Ac','pt','ST','J.A Rio Militar','','Indisponível'),(195,62,'Colete Mod. Plate Carrier 8 Ac','vd','ST','J.A Rio Militar','','Indisponível'),(196,112,'Colete Mod. Plate Carrier 8 Ac','tan','ST','J.A Rio Militar','','Indisponível'),(197,162,'Colete Mod. Plate Carrier 8 Ac','mtc','ST','J.A Rio Militar','','Indisponível'),(198,212,'Colete Mod. Plate Carrier 8 Ac','mpt','ST','J.A Rio Militar','','Indisponível');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
-- Table structure for table `product_datasheet`
--

DROP TABLE IF EXISTS `product_datasheet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_datasheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `filigran_goal` int(11) DEFAULT NULL,
  `sail_goal` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_datasheet`
--

LOCK TABLES `product_datasheet` WRITE;
/*!40000 ALTER TABLE `product_datasheet` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_datasheet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_fabric`
--

DROP TABLE IF EXISTS `product_fabric`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_fabric` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `feedstock_id` int(11) DEFAULT NULL,
  `feedstock_info` varchar(45) DEFAULT NULL,
  `infest_measure` decimal(7,2) DEFAULT NULL,
  `infest_amount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_fabric`
--

LOCK TABLES `product_fabric` WRITE;
/*!40000 ALTER TABLE `product_fabric` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_fabric` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_feedstock`
--

DROP TABLE IF EXISTS `product_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_feedstock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `feedstock_id` int(11) NOT NULL,
  `uom` varchar(5) NOT NULL,
  `amount` int(10) unsigned NOT NULL,
  `measure` decimal(15,2) unsigned NOT NULL DEFAULT '1.00',
  `category_id` int(11) DEFAULT NULL,
  `obs` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_product_feedstock` (`product_id`),
  KEY `fk_feedstock_product` (`feedstock_id`),
  CONSTRAINT `fk_feedstock_product` FOREIGN KEY (`feedstock_id`) REFERENCES `feedstock` (`id`),
  CONSTRAINT `fk_product_feedstock` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=647 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_feedstock`
--

LOCK TABLES `product_feedstock` WRITE;
/*!40000 ALTER TABLE `product_feedstock` DISABLE KEYS */;
INSERT INTO `product_feedstock` VALUES (28,27,28,'cm',5,12.00,22,NULL),(29,27,28,'cm',2,22.50,22,NULL),(34,27,11,'cm',1,1.36,22,NULL),(37,40,29,'cm',5,12.00,0,NULL),(38,40,29,'cm',2,22.50,0,NULL),(41,40,45,'cm',1,120.00,0,NULL),(42,40,48,'cm',1,30.00,0,NULL),(45,40,192,'cm',1,3.87,0,NULL),(46,40,12,'cm',1,1.36,0,NULL),(48,53,30,'cm',5,12.00,0,NULL),(49,53,30,'cm',2,22.50,0,NULL),(51,53,46,'cm',1,120.00,0,NULL),(52,53,49,'cm',1,30.00,0,NULL),(53,53,143,'cm',1,3.87,0,NULL),(54,53,13,'cm',1,1.36,0,NULL),(56,53,100,'un',1,0.00,0,NULL),(57,53,193,'un',2,0.00,0,NULL),(60,40,100,'un',1,0.00,0,NULL),(61,40,193,'un',2,0.00,0,NULL),(62,28,28,'cm',2,18.00,32,NULL),(63,28,28,'cm',2,22.50,32,NULL),(64,28,22,'cm',2,18.00,32,NULL),(65,28,43,'cm',1,132.00,31,NULL),(66,28,47,'cm',1,34.00,31,NULL),(67,28,191,'cm',1,5.87,32,NULL),(68,28,11,'cm',1,1.91,32,NULL),(69,28,100,'un',1,0.00,31,NULL),(70,28,193,'un',2,0.00,31,NULL),(71,41,29,'cm',2,18.00,0,NULL),(72,41,29,'cm',2,22.50,0,NULL),(73,41,24,'cm',2,18.00,0,NULL),(74,41,45,'cm',1,132.00,0,NULL),(75,41,48,'cm',1,34.00,0,NULL),(76,41,192,'cm',1,5.87,0,NULL),(77,41,12,'cm',1,1.91,0,NULL),(78,41,100,'un',1,0.00,0,NULL),(79,41,193,'un',2,0.00,0,NULL),(80,54,143,'cm',1,5.87,0,NULL),(81,54,13,'cm',1,1.91,0,NULL),(82,54,114,'cm',2,18.00,0,NULL),(83,54,30,'cm',2,18.00,0,NULL),(84,54,30,'cm',2,22.50,0,NULL),(85,54,46,'cm',1,132.00,0,NULL),(86,54,49,'cm',1,34.00,0,NULL),(87,54,100,'un',1,0.00,0,NULL),(88,54,193,'un',2,0.00,0,NULL),(89,26,191,'cm',1,20.00,34,NULL),(90,26,82,'cm',1,11.40,34,NULL),(91,26,22,'cm',2,19.50,34,NULL),(92,26,28,'cm',12,19.50,34,NULL),(93,26,28,'cm',2,47.50,34,NULL),(94,26,43,'cm',1,250.00,33,NULL),(95,26,47,'cm',1,48.00,33,NULL),(96,26,100,'un',1,0.00,33,NULL),(97,26,102,'un',1,0.00,33,NULL),(98,26,193,'un',2,0.00,33,NULL),(99,39,192,'cm',1,20.00,36,NULL),(100,39,82,'cm',1,11.40,36,NULL),(101,39,24,'cm',2,19.50,36,NULL),(102,39,29,'cm',12,19.50,36,NULL),(103,39,29,'cm',2,47.50,36,NULL),(104,39,45,'cm',1,250.00,35,NULL),(105,39,48,'cm',1,48.00,35,NULL),(106,39,100,'un',1,0.00,35,NULL),(107,39,102,'un',1,0.00,35,NULL),(108,39,193,'un',2,0.00,35,NULL),(109,52,143,'cm',1,20.00,38,NULL),(110,52,82,'cm',1,11.40,38,NULL),(111,52,114,'cm',2,19.50,38,NULL),(112,52,30,'cm',12,19.50,38,NULL),(113,52,30,'cm',2,47.50,38,NULL),(114,52,46,'cm',1,250.00,37,NULL),(115,52,49,'cm',1,48.00,37,NULL),(116,52,100,'un',1,0.00,37,NULL),(117,52,102,'un',1,0.00,37,NULL),(118,52,193,'un',2,0.00,37,NULL),(119,30,191,'cm',1,92.00,40,NULL),(120,30,11,'cm',1,92.00,40,NULL),(121,30,128,'cm',1,10.00,40,NULL),(122,30,129,'cm',1,10.00,40,NULL),(123,30,28,'cm',2,10.00,40,NULL),(124,30,28,'cm',3,20.00,40,NULL),(125,30,28,'cm',2,23.00,40,NULL),(126,30,34,'cm',1,10.00,40,NULL),(127,30,34,'cm',1,16.00,40,NULL),(128,30,43,'cm',1,82.00,39,NULL),(129,30,193,'un',2,0.00,39,NULL),(130,43,192,'cm',1,4.10,42,NULL),(131,43,12,'cm',1,4.10,42,NULL),(132,43,130,'cm',1,10.00,42,NULL),(133,43,131,'cm',1,10.00,42,NULL),(134,43,29,'cm',2,10.00,42,NULL),(135,43,29,'cm',3,20.00,42,NULL),(136,43,29,'cm',2,23.00,42,NULL),(137,43,35,'cm',1,10.00,42,NULL),(138,43,35,'cm',1,16.00,42,NULL),(139,43,45,'cm',1,82.00,43,NULL),(140,43,193,'un',2,0.00,43,NULL),(141,56,143,'cm',1,4.10,44,NULL),(143,56,132,'cm',1,10.00,44,NULL),(144,56,133,'cm',1,10.00,44,NULL),(145,56,30,'cm',2,10.00,44,NULL),(146,56,30,'cm',3,20.00,44,NULL),(147,56,30,'cm',2,23.00,44,NULL),(148,56,36,'cm',1,10.00,44,NULL),(149,56,36,'cm',1,16.00,44,NULL),(150,56,193,'un',2,0.00,45,NULL),(151,56,46,'cm',1,82.00,45,NULL),(152,36,191,'cm',1,4.60,118,NULL),(153,36,83,'cm',1,4.50,118,NULL),(154,36,116,'cm',2,9.00,119,NULL),(155,36,117,'cm',2,9.00,119,NULL),(156,36,117,'cm',1,5.00,119,NULL),(157,36,22,'cm',1,15.00,119,NULL),(158,36,22,'cm',2,19.00,119,NULL),(159,36,23,'cm',1,18.00,119,NULL),(160,36,23,'cm',1,12.00,119,NULL),(161,36,28,'cm',2,6.00,120,NULL),(162,36,28,'cm',3,10.00,120,NULL),(163,36,28,'cm',2,13.00,120,NULL),(164,36,28,'cm',1,15.00,120,NULL),(165,36,28,'cm',1,20.00,120,NULL),(166,36,28,'cm',2,23.00,120,NULL),(167,36,31,'cm',1,19.00,120,NULL),(168,36,34,'cm',1,22.00,120,NULL),(169,36,154,'cm',1,30.00,46,NULL),(171,36,84,'un',2,0.00,47,NULL),(172,36,43,'cm',1,98.00,47,NULL),(173,36,178,'un',1,0.00,47,NULL),(174,36,102,'un',1,0.00,47,NULL),(175,36,193,'un',2,0.00,47,NULL),(176,49,192,'cm',1,4.60,48,NULL),(177,49,83,'cm',1,4.50,48,NULL),(178,49,118,'cm',2,9.00,48,NULL),(179,49,119,'cm',2,9.00,48,NULL),(180,49,119,'cm',1,5.00,48,NULL),(181,49,24,'cm',1,15.00,48,NULL),(182,49,22,'cm',2,19.00,48,NULL),(183,49,23,'cm',1,12.00,48,NULL),(184,49,23,'cm',1,18.00,48,NULL),(185,49,29,'cm',2,6.00,48,NULL),(186,49,29,'cm',3,10.00,48,NULL),(187,49,29,'cm',2,13.00,48,NULL),(188,49,29,'cm',1,15.00,48,NULL),(189,49,29,'cm',1,20.00,48,NULL),(190,49,29,'cm',2,23.00,48,NULL),(191,49,32,'cm',1,19.00,48,NULL),(192,49,35,'cm',1,22.00,48,NULL),(193,49,155,'cm',1,30.00,48,NULL),(194,49,45,'cm',1,98.00,49,NULL),(195,49,85,'un',2,0.00,49,NULL),(196,49,179,'un',1,0.00,49,NULL),(197,49,102,'un',1,0.00,49,NULL),(198,49,193,'un',2,0.00,49,NULL),(199,62,143,'cm',1,4.60,50,NULL),(200,62,83,'cm',1,4.50,50,NULL),(201,62,120,'cm',2,9.00,50,NULL),(202,62,121,'cm',2,9.00,50,NULL),(203,62,121,'cm',1,5.00,50,NULL),(204,62,114,'cm',1,15.00,50,NULL),(205,62,22,'cm',2,19.00,50,NULL),(206,62,23,'cm',1,12.00,50,NULL),(207,62,23,'cm',1,18.00,50,NULL),(208,62,30,'cm',2,6.00,50,NULL),(209,62,30,'cm',3,10.00,50,NULL),(210,62,30,'cm',2,13.00,50,NULL),(211,62,30,'cm',1,15.00,50,NULL),(212,62,30,'cm',1,20.00,50,NULL),(213,62,30,'cm',2,23.00,50,NULL),(215,62,156,'cm',1,30.00,50,NULL),(216,62,46,'cm',1,98.00,51,NULL),(217,62,180,'un',1,0.00,51,NULL),(218,62,86,'un',2,0.00,51,NULL),(219,62,102,'un',1,0.00,51,NULL),(220,62,193,'un',2,0.00,51,NULL),(221,62,33,'cm',1,19.00,50,NULL),(222,62,36,'cm',1,22.00,50,NULL),(237,32,191,'cm',1,4.10,24,NULL),(238,32,11,'cm',1,4.10,24,NULL),(239,32,22,'cm',1,11.00,24,NULL),(240,32,28,'cm',1,6.00,24,NULL),(241,32,28,'cm',2,10.00,24,NULL),(242,32,28,'cm',1,19.00,24,NULL),(243,32,28,'cm',3,20.00,24,NULL),(244,32,28,'cm',2,23.00,24,NULL),(245,32,34,'cm',1,10.00,24,NULL),(246,32,43,'cm',1,82.00,26,NULL),(247,32,154,'cm',1,42.00,24,NULL),(248,32,102,'un',1,0.00,26,NULL),(249,32,193,'un',2,0.00,26,NULL),(250,45,192,'cm',1,4.10,27,NULL),(251,45,12,'cm',1,4.10,27,NULL),(252,45,24,'cm',1,11.00,27,NULL),(253,45,113,'cm',1,5.00,27,NULL),(254,45,29,'cm',1,6.00,27,NULL),(255,45,29,'cm',2,10.00,27,NULL),(256,45,29,'cm',1,19.00,27,NULL),(257,45,29,'cm',3,20.00,27,NULL),(258,45,29,'cm',2,23.00,27,NULL),(259,45,35,'cm',1,10.00,27,NULL),(260,45,45,'cm',1,82.00,28,NULL),(261,45,155,'cm',1,42.00,27,NULL),(262,45,102,'un',1,0.00,28,NULL),(263,45,193,'un',2,0.00,28,NULL),(264,32,23,'cm',1,5.00,24,NULL),(265,58,143,'cm',1,4.10,30,NULL),(266,58,13,'cm',1,4.10,30,NULL),(267,58,114,'cm',1,11.00,30,NULL),(268,58,115,'cm',1,5.00,30,NULL),(269,58,30,'cm',1,6.00,30,NULL),(270,58,30,'cm',2,10.00,30,NULL),(271,58,30,'cm',1,19.00,30,NULL),(272,58,30,'cm',3,20.00,30,NULL),(273,58,30,'cm',2,23.00,30,NULL),(274,58,46,'cm',1,82.00,29,NULL),(275,58,156,'cm',1,42.00,30,NULL),(276,58,102,'un',1,0.00,29,NULL),(277,58,193,'un',2,0.00,29,NULL),(278,58,36,'cm',1,10.00,30,NULL),(279,33,191,'cm',1,4.14,52,NULL),(280,33,11,'cm',1,4.14,52,NULL),(281,33,19,'cm',2,10.00,52,NULL),(282,33,20,'cm',2,10.00,52,NULL),(283,33,22,'cm',2,4.00,52,NULL),(284,33,23,'cm',2,12.00,52,NULL),(285,33,28,'cm',3,10.00,52,NULL),(286,33,28,'cm',2,23.50,52,NULL),(287,33,31,'cm',2,30.00,52,NULL),(288,33,43,'cm',1,102.00,53,NULL),(289,33,193,'un',2,0.00,53,NULL),(290,46,192,'cm',1,4.14,54,NULL),(291,46,12,'cm',1,4.14,54,NULL),(292,46,24,'cm',2,4.00,54,NULL),(293,46,24,'cm',2,10.00,54,NULL),(296,46,23,'cm',2,12.00,54,NULL),(297,46,113,'cm',2,10.00,54,NULL),(299,46,29,'cm',3,10.00,54,NULL),(300,46,29,'cm',2,23.50,54,NULL),(301,46,32,'cm',2,30.00,54,NULL),(302,46,45,'cm',1,102.00,55,NULL),(303,46,193,'un',2,0.00,55,NULL),(304,59,143,'cm',1,4.14,56,NULL),(305,59,13,'cm',1,4.14,56,NULL),(306,59,30,'cm',3,10.00,56,NULL),(307,59,30,'cm',2,23.50,56,NULL),(308,59,33,'cm',2,30.00,56,NULL),(309,59,23,'cm',2,12.00,56,NULL),(313,59,115,'cm',2,10.00,56,NULL),(314,59,114,'cm',2,4.00,56,NULL),(315,59,114,'cm',2,10.00,56,NULL),(316,59,46,'cm',1,102.00,57,NULL),(317,59,193,'un',2,0.00,57,NULL),(319,99,107,'cm',2,2.00,16,NULL),(320,38,22,'cm',1,10.00,89,NULL),(321,38,23,'cm',1,5.00,89,NULL),(322,38,28,'cm',1,6.00,89,NULL),(323,38,28,'cm',3,10.00,89,NULL),(324,38,28,'cm',2,24.00,89,NULL),(325,38,34,'cm',1,10.00,89,NULL),(326,38,37,'cm',1,28.00,89,NULL),(327,38,145,'cm',2,5.00,89,NULL),(328,38,154,'cm',1,25.00,89,NULL),(329,38,102,'un',1,0.00,88,NULL),(330,38,193,'un',2,0.00,88,NULL),(331,51,24,'cm',1,10.00,0,NULL),(332,51,113,'cm',1,5.00,0,NULL),(333,51,29,'cm',1,6.00,0,NULL),(334,51,29,'cm',3,10.00,0,NULL),(335,51,29,'cm',2,24.00,0,NULL),(336,51,35,'cm',1,10.00,0,NULL),(337,51,38,'cm',1,28.00,91,NULL),(338,51,157,'cm',2,5.00,0,NULL),(339,51,155,'cm',1,25.00,0,NULL),(340,51,102,'un',1,0.00,0,NULL),(341,51,193,'un',2,0.00,0,NULL),(342,64,114,'cm',1,10.00,0,NULL),(343,64,115,'cm',1,5.00,0,NULL),(344,64,30,'cm',1,6.00,0,NULL),(345,64,30,'cm',3,10.00,0,NULL),(346,64,30,'cm',2,24.00,0,NULL),(347,64,36,'cm',1,10.00,0,NULL),(348,64,39,'cm',1,28.00,0,NULL),(349,64,158,'cm',2,5.00,0,NULL),(350,64,156,'cm',1,25.00,0,NULL),(351,64,102,'un',1,0.00,0,NULL),(352,64,193,'un',2,0.00,0,NULL),(355,6,191,'cm',1,80.00,131,NULL),(356,6,14,'cm',1,70.00,131,NULL),(357,6,153,'cm',1,24.00,131,NULL),(364,6,28,'cm',8,10.00,114,NULL),(375,6,28,'cm',8,41.00,79,NULL),(376,6,28,'cm',4,20.00,114,NULL),(377,6,31,'cm',1,40.00,114,NULL),(378,6,28,'cm',16,29.00,79,NULL),(379,6,16,'cm',6,29.00,79,NULL),(380,6,51,'un',10,0.00,20,NULL),(381,6,70,'un',2,0.00,20,NULL),(382,6,150,'un',1,0.00,20,NULL),(383,6,100,'un',4,0.00,20,NULL),(384,6,104,'un',2,0.00,20,NULL),(386,6,47,'cm',1,181.00,20,NULL),(390,6,43,'cm',1,1200.00,20,NULL),(391,27,191,'cm',1,3.87,22,NULL),(392,27,43,'cm',1,120.00,23,NULL),(393,27,47,'cm',1,30.00,23,NULL),(394,27,100,'un',1,0.00,23,NULL),(395,27,193,'un',2,0.00,23,NULL),(396,56,13,'cm',1,4.10,44,NULL),(397,175,17,'cm',3,5.00,58,NULL),(398,175,16,'cm',3,5.00,58,NULL),(399,175,16,'cm',1,12.00,59,NULL),(400,175,17,'cm',1,12.00,59,NULL),(401,175,22,'cm',1,8.00,60,NULL),(402,175,23,'cm',1,8.00,60,NULL),(403,175,23,'cm',1,6.00,61,NULL),(404,175,22,'cm',1,6.00,61,NULL),(405,175,22,'cm',1,12.00,62,NULL),(406,175,23,'cm',1,12.00,62,NULL),(407,175,28,'cm',3,22.00,58,NULL),(408,175,28,'cm',2,22.00,65,NULL),(409,175,28,'cm',4,8.00,64,NULL),(410,175,28,'cm',2,10.00,65,NULL),(411,175,31,'cm',2,75.00,66,NULL),(412,175,31,'cm',1,18.00,58,NULL),(413,175,34,'cm',1,25.00,60,NULL),(414,175,34,'cm',1,25.00,61,NULL),(415,175,34,'cm',1,30.00,62,NULL),(416,175,191,'cm',1,21.00,68,NULL),(417,175,11,'cm',1,21.00,68,NULL),(418,176,16,'cm',2,19.00,69,NULL),(419,176,28,'cm',4,19.00,69,NULL),(420,176,28,'cm',2,35.00,71,NULL),(421,176,31,'cm',1,65.00,70,NULL),(422,176,31,'cm',1,10.00,70,NULL),(423,176,22,'cm',1,19.50,0,NULL),(424,176,51,'un',2,0.00,72,NULL),(425,176,54,'un',1,0.00,72,NULL),(426,176,100,'un',3,0.00,72,NULL),(427,176,47,'cm',1,61.00,72,NULL),(429,177,28,'cm',4,19.00,73,NULL),(430,177,16,'cm',2,19.00,73,NULL),(431,177,28,'cm',2,35.00,74,NULL),(432,177,31,'cm',1,65.00,74,NULL),(433,177,31,'cm',1,10.00,74,NULL),(434,177,51,'un',2,0.00,75,NULL),(435,177,54,'un',1,0.00,75,NULL),(436,177,87,'un',1,0.00,75,NULL),(437,177,102,'un',1,0.00,75,NULL),(439,176,102,'un',1,0.00,72,NULL),(440,175,102,'un',1,0.00,77,NULL),(441,176,44,'cm',1,214.00,72,NULL),(442,175,51,'un',2,0.00,77,NULL),(443,175,54,'un',2,0.00,77,NULL),(444,175,57,'un',1,0.00,77,NULL),(445,175,87,'un',2,0.00,77,NULL),(446,175,44,'cm',1,314.00,77,NULL),(447,176,191,'cm',1,8.20,78,NULL),(448,176,11,'cm',1,5.40,78,NULL),(449,177,191,'cm',1,2.80,76,NULL),(451,175,34,'cm',1,10.00,60,NULL),(452,160,12,'cm',1,33.00,0,NULL),(453,160,143,'cm',1,3.00,0,NULL),(454,71,28,'cm',2,25.00,0,NULL),(455,71,34,'cm',1,147.00,0,NULL),(456,71,37,'cm',1,95.00,0,NULL),(457,71,22,'cm',2,24.00,0,NULL),(458,71,23,'cm',2,24.00,0,NULL),(459,71,43,'cm',1,3.30,92,NULL),(460,71,14,'cm',1,6.60,93,NULL),(461,71,102,'un',1,0.00,92,NULL),(462,179,28,'cm',1,7.00,95,NULL),(463,179,28,'cm',1,15.00,95,NULL),(464,179,28,'cm',3,14.00,96,NULL),(465,179,22,'cm',1,16.00,97,NULL),(466,179,128,'cm',3,16.00,98,NULL),(467,179,129,'cm',3,14.00,98,NULL),(468,179,47,'cm',1,670.00,99,NULL),(469,179,100,'un',1,0.00,99,NULL),(470,179,43,'cm',1,180.00,99,NULL),(471,179,193,'un',2,0.00,99,NULL),(482,176,28,'cm',2,35.00,0,NULL),(483,176,11,'cm',1,7.70,78,NULL),(484,78,28,'cm',3,7.00,102,NULL),(485,78,28,'cm',2,35.00,0,NULL),(486,78,31,'cm',1,65.00,0,NULL),(487,78,31,'cm',1,10.00,0,NULL),(488,78,22,'cm',1,19.50,0,NULL),(489,78,16,'cm',3,9.00,102,NULL),(490,78,17,'cm',3,9.00,102,NULL),(491,78,47,'cm',1,61.00,103,NULL),(492,78,100,'un',3,0.00,103,NULL),(493,78,43,'cm',1,387.50,103,NULL),(494,78,51,'un',2,0.00,103,NULL),(495,78,54,'un',1,0.00,103,NULL),(496,8,34,'cm',1,37.00,105,NULL),(497,8,34,'cm',2,15.00,105,NULL),(498,8,129,'cm',2,15.50,105,NULL),(499,8,128,'cm',2,30.00,105,NULL),(500,8,22,'cm',2,15.50,105,NULL),(501,8,145,'cm',4,6.00,105,NULL),(502,8,28,'cm',1,17.00,104,NULL),(503,8,28,'cm',5,34.50,104,NULL),(504,8,28,'cm',2,7.00,104,NULL),(505,8,28,'cm',6,32.50,104,NULL),(506,8,28,'cm',6,33.00,104,NULL),(507,8,16,'cm',2,17.00,104,NULL),(508,8,16,'cm',5,34.50,104,NULL),(509,8,128,'cm',6,34.50,104,NULL),(510,8,22,'cm',4,15.50,104,NULL),(511,8,23,'cm',2,32.50,104,NULL),(512,8,28,'cm',6,9.00,106,NULL),(513,8,28,'cm',2,8.00,106,NULL),(514,8,34,'cm',2,60.00,106,NULL),(515,8,16,'cm',2,6.00,106,NULL),(516,8,22,'cm',2,16.00,106,NULL),(517,8,22,'cm',2,15.50,106,NULL),(518,8,23,'cm',2,16.00,106,NULL),(519,8,129,'cm',6,15.50,106,NULL),(520,8,17,'cm',2,6.00,106,NULL),(521,8,191,'cm',1,58.20,128,NULL),(522,8,11,'cm',1,38.00,128,NULL),(523,8,14,'cm',1,38.00,128,NULL),(524,9,192,'cm',1,58.20,129,NULL),(525,9,18,'cm',2,17.00,107,NULL),(526,9,18,'cm',5,34.50,107,NULL),(527,9,24,'cm',4,15.50,107,NULL),(531,9,131,'cm',2,32.50,107,NULL),(533,9,130,'cm',6,34.50,107,NULL),(534,9,29,'cm',1,17.00,107,NULL),(535,9,29,'cm',2,7.00,107,NULL),(536,9,29,'cm',5,34.50,107,NULL),(537,9,29,'cm',6,32.50,107,NULL),(538,9,29,'cm',6,33.00,107,NULL),(539,9,130,'cm',2,30.00,110,NULL),(540,9,24,'cm',2,15.50,110,NULL),(541,9,131,'cm',2,15.50,110,NULL),(542,9,35,'cm',1,37.00,110,NULL),(543,9,35,'cm',2,15.00,110,NULL),(544,9,157,'cm',4,6.00,110,NULL),(545,8,90,'un',2,0.00,105,NULL),(546,8,103,'un',1,0.00,106,NULL),(547,8,70,'un',2,0.00,106,NULL),(548,8,100,'un',2,0.00,106,NULL),(549,8,43,'cm',1,368.00,106,NULL),(550,8,47,'cm',1,77.00,106,NULL),(551,9,91,'un',2,0.00,110,NULL),(552,9,144,'cm',1,38.00,129,NULL),(553,9,12,'cm',1,38.00,129,NULL),(554,9,35,'cm',2,60.00,109,NULL),(555,9,18,'cm',2,6.00,109,NULL),(556,9,107,'cm',2,6.00,109,NULL),(557,9,131,'cm',6,15.50,109,NULL),(558,9,24,'cm',2,15.50,109,NULL),(559,9,24,'cm',2,16.00,109,NULL),(560,9,113,'cm',2,16.00,109,NULL),(561,9,100,'un',2,0.00,109,NULL),(562,9,71,'un',2,0.00,109,NULL),(563,9,45,'cm',1,368.00,109,NULL),(564,9,103,'un',1,0.00,109,NULL),(565,9,48,'cm',1,77.00,109,NULL),(566,10,143,'cm',1,58.20,130,NULL),(567,10,108,'cm',5,34.50,111,NULL),(568,10,108,'cm',2,17.00,111,NULL),(569,10,114,'cm',4,15.50,111,NULL),(570,10,132,'cm',6,34.50,111,NULL),(571,10,133,'cm',2,32.50,111,NULL),(572,10,30,'cm',1,17.00,111,NULL),(573,10,30,'cm',5,34.50,111,NULL),(574,10,30,'cm',6,32.50,111,NULL),(575,10,30,'cm',6,33.00,111,NULL),(576,10,30,'cm',2,7.00,111,NULL),(577,9,29,'cm',6,9.00,109,NULL),(578,9,29,'cm',2,8.00,109,NULL),(579,10,36,'cm',1,37.00,112,NULL),(580,10,36,'cm',2,15.00,112,NULL),(581,10,114,'cm',2,15.50,112,NULL),(582,10,133,'cm',2,15.50,112,NULL),(583,10,132,'cm',2,30.00,112,NULL),(584,10,158,'cm',4,6.00,112,NULL),(585,10,92,'un',2,0.00,112,NULL),(586,10,108,'cm',2,6.00,113,NULL),(587,10,109,'cm',2,6.00,113,NULL),(588,10,114,'cm',2,15.50,113,NULL),(589,10,133,'cm',6,15.50,113,NULL),(590,10,158,'cm',4,6.00,113,NULL),(591,10,30,'cm',6,9.00,113,NULL),(592,10,30,'cm',2,8.00,113,NULL),(593,10,36,'cm',2,60.00,113,NULL),(594,10,72,'un',2,0.00,113,NULL),(595,10,49,'cm',1,77.00,113,NULL),(596,10,46,'cm',1,368.00,113,NULL),(597,10,100,'un',2,0.00,113,NULL),(598,10,103,'un',1,0.00,113,NULL),(599,10,99,'cm',1,38.00,130,NULL),(600,10,13,'cm',1,38.00,130,NULL),(601,10,114,'cm',2,16.00,113,NULL),(602,10,115,'cm',2,16.00,113,NULL),(603,9,157,'cm',4,6.00,109,NULL),(604,8,145,'cm',4,6.00,106,NULL),(605,6,16,'cm',2,4.00,114,NULL),(606,6,128,'cm',2,10.00,114,NULL),(607,6,129,'cm',2,10.00,114,NULL),(609,11,45,'cm',1,1200.00,115,NULL),(610,11,48,'cm',1,183.00,115,NULL),(611,11,100,'un',4,0.00,115,NULL),(612,11,52,'un',10,0.00,115,NULL),(613,11,71,'un',2,0.00,115,NULL),(614,11,105,'un',2,0.00,115,NULL),(615,11,187,'un',1,0.00,115,NULL),(616,11,151,'un',1,0.00,115,NULL),(617,11,192,'cm',1,80.00,133,NULL),(618,11,18,'cm',6,29.00,116,NULL),(619,11,29,'cm',16,29.00,116,NULL),(620,11,29,'cm',8,41.00,116,NULL),(621,174,28,'cm',2,34.50,121,NULL),(622,174,28,'cm',1,17.00,121,NULL),(623,174,28,'cm',2,10.00,121,NULL),(624,174,34,'cm',2,50.00,121,NULL),(625,174,116,'cm',3,34.50,121,NULL),(626,174,116,'cm',2,17.00,121,NULL),(627,174,28,'cm',3,34.50,122,NULL),(628,174,34,'cm',1,37.00,122,NULL),(629,174,34,'cm',2,12.00,122,NULL),(630,174,116,'cm',4,34.50,122,NULL),(631,174,28,'cm',6,32.50,123,NULL),(632,174,28,'cm',1,7.00,123,NULL),(633,174,129,'cm',3,32.50,123,NULL),(634,174,128,'cm',6,34.50,123,NULL),(635,174,128,'cm',2,30.00,123,NULL),(636,174,129,'cm',1,34.50,121,NULL),(637,174,28,'cm',6,33.00,125,NULL),(638,174,128,'cm',6,14.50,125,NULL),(639,174,145,'cm',4,7.00,125,NULL),(640,174,129,'cm',6,14.50,125,NULL),(641,174,28,'cm',10,8.00,126,NULL),(642,174,100,'un',3,0.00,127,NULL),(643,174,57,'un',2,0.00,127,NULL),(644,11,144,'cm',1,70.00,117,NULL),(645,11,153,'cm',1,24.00,133,NULL),(646,6,187,'un',1,0.00,20,NULL);
/*!40000 ALTER TABLE `product_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_feedstock_category`
--

DROP TABLE IF EXISTS `product_feedstock_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_feedstock_category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=135 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_feedstock_category`
--

LOCK TABLES `product_feedstock_category` WRITE;
/*!40000 ALTER TABLE `product_feedstock_category` DISABLE KEYS */;
INSERT INTO `product_feedstock_category` VALUES (17,6,'Ca 25 - velcro 25 F'),(18,6,'FRENTE'),(19,6,'COSTAS'),(20,6,'Acessórios '),(21,27,'Produção corte'),(22,27,'Corte - produção '),(23,27,'Acessórios '),(24,32,'Produção - corte '),(25,32,'Acesso '),(26,32,'Acessórios '),(27,45,'Produção - corte'),(28,45,'Acessórios '),(29,58,'Acessórios '),(30,58,'Produção - corte'),(31,28,'Acessórios '),(32,28,'Produção - corte'),(33,26,'Acessórios '),(34,26,'Produção - Corte'),(35,39,'Acessórios '),(36,39,'Produção - Corte'),(37,52,'Acessórios '),(38,52,'Produção - Corte'),(39,30,'Acessórios '),(40,30,'Produção- Corte '),(41,43,'AcAcessórios '),(42,43,'Produção - corte'),(43,43,'Acessórios '),(44,56,'Produção - Corte'),(45,56,'ACESSÓRIOS '),(46,36,'Produção - Corte'),(47,36,'Acessórios '),(48,49,'Produção - Corte'),(49,49,'Acessórios '),(50,62,'Produção - Corte'),(51,62,'Acessórios '),(52,33,'Produção - Corte'),(53,33,'Acessórios '),(54,46,'Produção- Corte'),(55,46,'Acessórios '),(56,59,'Produção - Corte'),(57,59,'Acessórios '),(58,175,'Presilha '),(59,175,'T. Algema'),(60,175,'Rádio'),(61,175,'Tic tacão'),(62,175,'Cad. 30cm'),(63,175,'Tic tac frente'),(64,175,'Cadarço regulador'),(65,175,'Tic Tac 25'),(66,175,'Regulador perna'),(67,175,'Tecidos'),(68,175,'Infestos'),(69,176,'Plataforma'),(70,176,'Tic Tac Perna'),(71,176,'Tic Tac Cima'),(72,176,'Acessórios '),(73,177,'Filagrana'),(74,177,'Produção '),(75,177,'Acessórios '),(76,177,'Infestos'),(77,175,'Acessórios '),(78,176,'infestos'),(79,6,'Filigrana'),(80,178,'Frente Bolso'),(81,178,'Fundo'),(82,178,'Fole Baixo'),(83,178,'Fole de Baixo'),(84,178,'Fole de Cima'),(85,178,'Alça Acolchoado '),(86,178,'Triângulo'),(87,178,'Alça do Fole'),(88,38,'Acessórios '),(89,38,'Produção - corte'),(90,51,'Acessórios '),(91,51,'Produção - corte'),(92,71,'Acessórios'),(93,71,'Infestos'),(94,179,'Modular Frente'),(95,179,'Tic Tac'),(96,179,'Modular Trazeira'),(97,179,'Frente'),(98,179,'Trazeira'),(99,179,'Acessórios'),(100,180,'Acessórios'),(101,180,'Infestos'),(102,78,'Bolso PST'),(103,78,'Acessórios'),(104,8,'Filigrana'),(105,8,'Preparação costura '),(106,8,'Fechamento'),(107,9,'FILIGRANA'),(108,9,'PREPARAÇÃO '),(109,9,'FECHAMENTO '),(110,9,'PREPARAÇÃO - COSTURA'),(111,10,'FILIGRANA'),(112,10,'PREPARAÇÃO - COSTURA'),(113,10,'FECHAMENTO'),(114,6,'FECHAMENTO'),(115,11,'ACESSÓRIOS '),(116,11,'FILIGRANA'),(117,11,'FECHAMENTO'),(118,36,'Infestos'),(119,36,'Velcros'),(120,36,'Cadarços'),(121,174,'Frente'),(122,174,'Costa'),(123,174,'Aba da Placa'),(124,174,'Placa'),(125,174,'Lateral'),(126,174,'Ombro'),(127,174,'Acessórios'),(128,8,'INFESTOS'),(129,9,'INFESTOS'),(130,10,'INFESTOS'),(131,6,'INFESTOS'),(132,11,'FECHAMENTO'),(133,11,'INFESTOS'),(134,11,'FECHAMENTO');
/*!40000 ALTER TABLE `product_feedstock_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_image`
--

DROP TABLE IF EXISTS `product_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_image` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `product_id` int(11) NOT NULL,
  `url` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_product_image` (`product_id`),
  CONSTRAINT `fk_product_image` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=374 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_image`
--

LOCK TABLES `product_image` WRITE;
/*!40000 ALTER TABLE `product_image` DISABLE KEYS */;
INSERT INTO `product_image` VALUES (27,26,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_818244-MLB31498972733_072019-F.webp'),(28,26,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_986789-MLB31498988535_072019-F.webp'),(29,39,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_994834-MLB31637343115_072019-F.webp'),(30,39,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_880382-MLB31637343617_072019-F.webp'),(31,52,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_968416-MLB31498980211_072019-F.webp'),(32,52,'https://http2.mlstatic.com/porta-camelback-modular-ja-rio-militar-D_NQ_NP_676363-MLB31498978737_072019-F.webp'),(36,27,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_914251-MLB31499264300_072019-F.webp'),(37,27,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_893776-MLB31499243475_072019-F.webp'),(38,27,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_944210-MLB31499259856_072019-F.webp'),(39,40,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_647582-MLB31637418984_072019-O.webp'),(40,40,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_922406-MLB31637438834_072019-F.webp'),(41,53,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_844052-MLB31499287530_072019-O.webp'),(42,53,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_920649-MLB31499267855_072019-F.webp'),(43,53,'https://http2.mlstatic.com/bolsa-pequena-modular-ja-rio-militar-D_NQ_NP_626313-MLB31499290505_072019-F.webp'),(46,28,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_686256-MLB31499295947_072019-F.webp'),(47,28,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_929677-MLB31499325059_072019-F.webp'),(48,28,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_725307-MLB31499330511_072019-F.webp'),(49,41,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_638411-MLB31637475175_072019-F.webp'),(50,41,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_827291-MLB31637491050_072019-F.webp'),(51,54,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_913216-MLB31499309648_072019-F.webp'),(52,54,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_664313-MLB31499300808_072019-F.webp'),(53,54,'https://http2.mlstatic.com/bolsa-media-modular-ja-rio-militar-D_NQ_NP_949365-MLB31499307181_072019-O.webp'),(54,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_757661-MLB31489198431_072019-F.webp'),(55,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_635423-MLB31489210626_072019-F.webp'),(56,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_968130-MLB31489209645_072019-F.webp'),(57,30,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_946645-MLB31489194828_072019-F.webp'),(58,56,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_992259-MLB31489216682_072019-F.webp'),(59,56,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_867231-MLB31489228091_072019-F.webp'),(60,56,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_956261-MLB31489198491_072019-F.webp'),(61,43,'https://http2.mlstatic.com/porta-carregadormagazine-de-fuzil-modular-ja-rio-militar-D_NQ_NP_944890-MLB31489198379_072019-F.webp'),(65,59,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_938060-MLB31498783777_072019-F.webp'),(66,59,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_887875-MLB31498792678_072019-F.webp'),(67,59,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_712652-MLB31498763885_072019-F.webp'),(68,33,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_991989-MLB31498767755_072019-F.webp'),(69,33,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_606526-MLB31498763787_072019-F.webp'),(70,33,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_961302-MLB31498789118_072019-F.webp'),(71,46,'https://http2.mlstatic.com/porta-carregador-de-pistola-duplo-modular-ja-rio-militar-D_NQ_NP_855674-MLB31637386042_072019-O.webp'),(72,36,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_614333-MLB31188151337_062019-F.webp'),(73,37,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_614333-MLB31188151337_062019-F.webp'),(74,36,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_637125-MLB31188157169_062019-F.webp'),(75,37,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_637125-MLB31188157169_062019-F.webp'),(76,36,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_630382-MLB31188161413_062019-F.webp'),(77,37,'https://http2.mlstatic.com/coldre-universal-modular-preto-ja-rio-militar-D_NQ_NP_630382-MLB31188161413_062019-F.webp'),(78,62,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_740157-MLB31116893591_062019-O.webp'),(83,63,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_740157-MLB31116893591_062019-F.webp'),(84,62,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_699296-MLB31116881470_062019-F.webp'),(85,63,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_699296-MLB31116881470_062019-F.webp'),(86,62,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_938859-MLB31116882843_062019-F.webp'),(87,63,'https://http2.mlstatic.com/coldre-universal-modular-tan-ja-rio-militar-D_NQ_NP_938859-MLB31116882843_062019-F.webp'),(88,49,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_891206-MLB31637493260_072019-F.webp'),(89,50,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_891206-MLB31637493260_072019-F.webp'),(90,49,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_910947-MLB31637511578_072019-F.webp'),(91,50,'https://http2.mlstatic.com/coldre-universal-modular-verde-ja-rio-militar-D_NQ_NP_910947-MLB31637511578_072019-F.webp'),(92,38,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_656091-MLB31498880362_072019-F.webp'),(93,38,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_699347-MLB31498880360_072019-F.webp'),(95,64,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_812664-MLB31498880408_072019-F.webp'),(96,64,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_911695-MLB31498887753_072019-F.webp'),(97,51,'https://http2.mlstatic.com/porta-ht-radio-modular-ja-rio-militar-D_NQ_NP_753711-MLB31637402319_072019-F.webp'),(99,83,'https://http2.mlstatic.com/bandoleira-operacional-1-ponto-ja-rio-militar-D_NQ_NP_784857-MLB31117454275_062019-F.webp'),(100,65,'https://i.imgur.com/PElazsL.jpg'),(101,66,'https://i.imgur.com/PElazsL.jpg'),(102,67,'https://i.imgur.com/L6aF3oN.jpg'),(103,68,'https://i.imgur.com/L6aF3oN.jpg'),(104,69,'https://i.imgur.com/1khKOSI.jpg'),(105,70,'https://i.imgur.com/1khKOSI.jpg'),(237,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_637499-MLB32171338342_092019-F.webp'),(238,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_721251-MLB32171352587_092019-F.webp'),(239,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_708078-MLB32171342795_092019-F.webp'),(240,9,'https://http2.mlstatic.com/colete-plate-carrier-pecas-modulares-bandoleira-tatica-D_NQ_NP_642159-MLB32171327446_092019-F.webp'),(249,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_921376-MLB32384653424_102019-F.webp'),(252,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_604470-MLB32384650979_102019-F.webp'),(255,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_647388-MLB32384670265_102019-F.webp'),(259,6,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-D_NQ_NP_986994-MLB32384660351_102019-F.webp'),(262,25,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_747405-MLB40679379565_022020-F.webp'),(265,25,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_759210-MLB40679388476_022020-F.webp'),(268,25,'https://http2.mlstatic.com/capa-de-colete-modular-ja3-ja-rio-militar-D_NQ_NP_782312-MLB40679392333_022020-F.webp'),(272,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_782208-MLB31525086631_072019-F.webp'),(276,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_633424-MLB31525091074_072019-F.webp'),(280,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_610814-MLB31525088085_072019-F.webp'),(284,11,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-mod-D_NQ_NP_895059-MLB31525069921_072019-F.webp'),(289,13,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_876443-MLB31525038711_072019-F.webp'),(293,13,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_763323-MLB31525032360_072019-F.webp'),(298,13,'https://http2.mlstatic.com/capa-de-colete-modular-close-ja-rio-militar-9-itens-tan-D_NQ_NP_673733-MLB31525033294_072019-F.webp'),(301,79,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_619297-MLB40508982130_012020-F.webp'),(302,79,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_657153-MLB40508959668_012020-F.webp'),(303,81,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_792745-MLB40508981173_012020-F.webp'),(304,81,'https://http2.mlstatic.com/bornal-tatico-de-perna-com-porta-mag-duplo-ja-rio-militar-D_NQ_NP_912854-MLB40508966607_012020-F.webp'),(305,157,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_610264-MLB40104687571_122019-O.webp'),(306,157,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_733845-MLB40104684638_122019-F.webp'),(307,158,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_677293-MLB40104691591_122019-F.webp'),(308,158,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_781911-MLB40104684689_122019-F.webp'),(309,159,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_761759-MLB40104688663_122019-F.webp'),(310,159,'https://http2.mlstatic.com/bornal-tatico-compact-ja-rio-militar-D_NQ_NP_948515-MLB40104692638_122019-F.webp'),(311,86,'https://http2.mlstatic.com/porta-algema-ja-rio-militar-D_NQ_NP_935984-MLB32866315689_112019-O.webp'),(312,87,'https://http2.mlstatic.com/algema-militar-porta-D_NQ_NP_831797-MLB32866309773_112019-O.webp'),(313,88,'https://http2.mlstatic.com/porta-algema-ja-rio-militar-D_NQ_NP_653449-MLB32866311743_112019-O.webp'),(314,131,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_946742-MLB32782258810_112019-F.webp'),(317,154,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_946742-MLB32782258810_112019-F.webp'),(318,132,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_701109-MLB32782262773_112019-F.webp'),(319,155,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_701109-MLB32782262773_112019-F.webp'),(320,133,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_809649-MLB32782258915_112019-F.webp'),(321,156,'https://http2.mlstatic.com/coldre-de-cinto-ja-rio-militar-D_NQ_NP_809649-MLB32782258915_112019-F.webp'),(322,110,'https://http2.mlstatic.com/mini-lanterna-D_NQ_NP_821008-MLB32800044326_112019-O.webp'),(323,110,'https://http2.mlstatic.com/mini-lanterna-D_NQ_NP_641893-MLB32800044329_112019-F.webp'),(324,161,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_641618-MLB41153254173_032020-F.webp'),(330,161,'https://http2.mlstatic.com/colete-tatico-militar-D_NQ_NP_721717-MLB41153212885_032020-F.webp'),(331,161,'https://http2.mlstatic.com/tatico-militar-colete-D_NQ_NP_902786-MLB41153214852_032020-F.webp'),(334,161,'https://http2.mlstatic.com/capa-de-colete-tatico-militar-operacional-do-bope-preto-D_NQ_NP_885203-MLB41153212887_032020-F.webp'),(337,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_726845-MLB32284302010_092019-F.webp'),(338,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_959845-MLB32284284237_092019-O.webp'),(339,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_781689-MLB32284300538_092019-F.webp'),(340,170,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-multicam-D_NQ_NP_657593-MLB32284300536_092019-O.webp'),(341,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_774858-MLB32503554703_102019-F.webp'),(342,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_666104-MLB32503557188_102019-O.webp'),(343,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_967476-MLB32503551722_102019-O.webp'),(344,171,'https://http2.mlstatic.com/capa-de-colete-plate-carrier-ja-rio-militar-marpat-D_NQ_NP_751732-MLB32503496995_102019-O.webp'),(353,8,'https://images2.imgbox.com/a7/91/s7LUllxu_o.png'),(354,8,'https://images2.imgbox.com/0b/81/N7Cj1JcF_o.png'),(355,8,'https://images2.imgbox.com/73/ae/bm9UvTjS_o.png'),(356,8,'https://images2.imgbox.com/d4/09/w5NYVRHj_o.png'),(357,10,'https://images2.imgbox.com/e9/1e/DwxHgEM8_o.png'),(358,10,'https://images2.imgbox.com/71/c8/G7eO4sf0_o.png'),(359,10,'https://images2.imgbox.com/7e/29/t5No2aTc_o.png'),(360,77,'https://http2.mlstatic.com/D_NQ_NP_724424-MLB32818647183_112019-O.webp'),(361,77,'https://http2.mlstatic.com/D_NQ_NP_951658-MLB32818629453_112019-O.webp'),(362,172,'https://http2.mlstatic.com/D_NQ_NP_894444-MLB32814525974_112019-O.webp'),(363,71,'https://http2.mlstatic.com/D_NQ_NP_811857-MLB32723845812_102019-O.webp'),(364,73,'https://http2.mlstatic.com/D_NQ_NP_997201-MLB32722274934_102019-O.webp'),(365,75,'https://http2.mlstatic.com/D_NQ_NP_912270-MLB32723814392_102019-O.webp'),(369,82,'https://images2.imgbox.com/74/84/Jq4QWDmL_o.png'),(370,82,'https://images2.imgbox.com/8a/37/25k9jaqV_o.png'),(371,82,'https://images2.imgbox.com/7e/f1/mebHFYRP_o.png'),(372,84,'https://http2.mlstatic.com/D_NQ_NP_846967-MLB42314176204_062020-O.webp'),(373,85,'https://http2.mlstatic.com/D_NQ_NP_919268-MLB42314171557_062020-O.webp');
/*!40000 ALTER TABLE `product_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production`
--

DROP TABLE IF EXISTS `production`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(15) NOT NULL,
  `full_date` varchar(25) NOT NULL,
  `storage_id` int(11) NOT NULL,
  `status` varchar(45) NOT NULL DEFAULT 'Pedido solicitado',
  `user` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production`
--

LOCK TABLES `production` WRITE;
/*!40000 ALTER TABLE `production` DISABLE KEYS */;
INSERT INTO `production` VALUES (1,'2020-08-24','24-08-2020-23:30:46',1,'Pedido solicitado','Henrique Lyra'),(2,'2020-08-24','24-08-2020-23:33:46',1,'Pedido solicitado','Henrique Lyra'),(3,'2020-08-24','24-08-2020-23:37:1',1,'Pedido solicitado','Henrique Lyra'),(4,'2020-08-24','24-08-2020-23:44:6',1,'Pedido solicitado','Henrique Lyra');
/*!40000 ALTER TABLE `production` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_feedstock`
--

DROP TABLE IF EXISTS `production_feedstock`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_feedstock` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `production_id` int(11) NOT NULL,
  `feedstock_id` int(11) NOT NULL,
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
-- Dumping data for table `production_feedstock`
--

LOCK TABLES `production_feedstock` WRITE;
/*!40000 ALTER TABLE `production_feedstock` DISABLE KEYS */;
INSERT INTO `production_feedstock` VALUES (1,1,16,'401 CA 25 pt','cm',5000.00,0.21,0.00),(2,1,17,'1751 Cursor pt','un',500.00,10.00,0.00),(3,1,18,'1001 Botão S/C','cm',200.00,0.10,0.00),(4,1,632,'651 HXL pt','cm',10000.00,0.13,0.00),(5,1,637,'751 Zíper pt','cm',100.00,3.10,0.00),(6,1,737,'1 Córdoba Ripstop 300 pt','cm',100.00,0.70,0.00),(7,1,738,'51 Duratran pt','cm',100.00,0.40,0.00),(8,1,28,'301 Velcro 50 F (light) pt','cm',2500.00,0.08,0.00),(9,2,16,'401 CA 25 pt','cm',5000.00,0.00,0.00),(10,2,17,'1751 Cursor pt','un',500.00,10.00,0.00),(11,2,18,'1001 Botão S/C','cm',200.00,0.00,0.00),(12,2,632,'651 HXL pt','cm',10000.00,0.00,0.00),(13,2,637,'751 Zíper pt','cm',100.00,3.00,0.00),(14,2,737,'1 Córdoba Ripstop 300 pt','cm',100.00,1.00,0.00),(15,2,738,'51 Duratran pt','cm',100.00,0.00,0.00),(16,2,28,'301 Velcro 50 F (light) pt','cm',2500.00,0.00,0.00),(17,3,16,'401 CA 25 pt','cm',5000.00,2.23,0.00),(18,3,17,'1751 Cursor pt','un',500.00,96.00,0.00),(19,3,18,'1001 Botão S/C','cm',200.00,0.96,0.00),(20,3,632,'651 HXL pt','cm',10000.00,1.17,0.00),(21,3,637,'751 Zíper pt','cm',100.00,27.84,0.00),(22,3,737,'1 Córdoba Ripstop 300 pt','cm',100.00,5.76,0.00),(23,3,738,'51 Duratran pt','cm',100.00,2.88,0.00),(24,4,16,'401 CA 25 pt','cm',5000.00,2.00,0.00),(25,4,17,'1751 Cursor pt','un',500.00,96.00,0.00),(26,4,18,'1001 Botão S/C','cm',200.00,1.00,0.00),(27,4,632,'651 HXL pt','cm',10000.00,1.00,0.00),(28,4,637,'751 Zíper pt','cm',100.00,28.00,0.00),(29,4,737,'1 Córdoba Ripstop 300 pt','cm',100.00,6.00,0.00),(30,4,738,'51 Duratran pt','cm',100.00,3.00,0.00);
/*!40000 ALTER TABLE `production_feedstock` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `production_product`
--

DROP TABLE IF EXISTS `production_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `production_product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `production_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_info` varchar(60) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `fk_product_productionProduct` (`product_id`),
  CONSTRAINT `fk_product` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `fk_product_productionProduct` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `production_product`
--

LOCK TABLES `production_product` WRITE;
/*!40000 ALTER TABLE `production_product` DISABLE KEYS */;
INSERT INTO `production_product` VALUES (1,1,27,'502 Bolsa P Modular pt ST',5),(2,1,28,'503 Bolsa M Modular pt ST',5),(3,2,27,'502 Bolsa P Modular pt ST',5),(4,2,28,'503 Bolsa M Modular pt ST',5),(5,3,27,'502 Bolsa P Modular pt ST',96),(6,4,27,'502 Bolsa P Modular pt ST',96);
/*!40000 ALTER TABLE `production_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Henrique Lyra','hlyras1994@gmail.com','$2a$10$8dN9AX0Vz4yl2En5CwaHFOfJKOVmeF2SF5k/MgKWxmvNPR/7E14IW','33999999961',NULL,'000','000','adm'),(2,'Luis Henrique','lh@gmail.com','$2a$10$8dN9AX0Vz4yl2En5CwaHFOfJKOVmeF2SF5k/MgKWxmvNPR/7E14IW','21000000000',NULL,'000','000','COR-GER'),(3,'Anny Carvalho','anny@gmail.com','$2a$10$MIuYKn.pJAhHckvcsbE32eZ00lTrCphCb.2LKbuznSCbGHPVRAsfO','21993293532',NULL,'000','000','fin'),(4,'Sheyla Lyra','sl@gmail.com','$2a$10$fLuNiwQuMPhtGALH0MDoPu7ilkAonVgmsbftmkCzwgszaNWaiBc1i','21000000000',NULL,'000','000','fin'),(5,'Chris Carvalho','christihellenferreira2015@gmail.com','$2a$10$Z8XAieh8XPm8rLbG/mWkguxJHG4xeC7ZbDKwJwlOBM4L7ecmqOA6G','21999999999',NULL,'000','000','sto'),(6,'Jean Carvalho','jc@gmail.com','$2a$10$YewWlYiEgLWD41gWCFkaReuDL2AbLLOo3FPJYlhp.XjpXxfGwytV2','21000000000',NULL,'000','000','adm'),(7,'Daniel Anderson','dl@gmail.com','$2a$10$kA.Jld4rVegBSt7j/HYqX.kiEV15pl6KVjHA.hABOYBMEO.nltrku','21970294824',NULL,'000','000','man'),(8,'Rodrigo Salazar','rs@gmail.com','$2a$10$5ckhEIigDqI3K8UyGGCRaOz6E/QH70hz6PwcFIsMCxzuTdUR0IQyK','21999999999',NULL,'000','000','sto'),(9,'Douglas Luis','dodo@gmail.com','$2a$10$FD/TiypfiTummm.0VGo4z.072vQc/xLYiIyMfsMuNW.2d3.hTfUE6','21000000000',NULL,'000','000','cut'),(10,'Danrlei Henrique','dh@gmail.com','$2a$10$AHBBkmHMjalag3ufnE4sy.yvc9qw8wAHzuDVlxVV8YlACNYNShW4y','21000000000',NULL,'000','000','COR-GER'),(11,'Daniel Luís','dluis@gmail.com','$2a$10$TCUGUeKkdd57AuLk1q.SK.mjDZsyap1tQxS4i0Vy3bDgW8ZUAfY0q','21999999999',NULL,'000','000','cut'),(12,'Caio César','cc@gmail.com','$2a$10$PG3SuWUHdT.HBAUF3LSai.z3AbreZfkoElJL8DpiaYMRVv0zJFWKG','21966261166',NULL,'000','000','cut'),(13,'Éric Lyra Queiroz','eric.lyra@outlook.com','$2a$10$kSxZQGodS6MysQgjmmjQcezdV6aC/CDJICT/MfRD3MEPbAcEh681.',NULL,NULL,NULL,NULL,'adm');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-17 20:34:01
