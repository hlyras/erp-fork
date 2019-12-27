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
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` int(11) NOT NULL,
  `name` text NOT NULL,
  `color` text NOT NULL,
  `size` text NOT NULL,
  `amount` int(11) NOT NULL DEFAULT '0',
  `value` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `code_UNIQUE` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (3,1,'Close','pt','P',0,150),(4,51,'Close','vd','P',0,150),(5,101,'Close','tan','P',0,150),(6,2,'Close','pt','M',0,150),(7,3,'Close','pt','G',0,150),(8,4,'Plate Carrier','pt','ST',0,180),(9,54,'Plate Carrier','vd','ST',0,180),(10,104,'Plate Carrier','tan','ST',0,180),(11,52,'Close','vd','M',0,150),(12,53,'Close','vd','G',0,150),(13,102,'Close','tan','M',0,150),(14,103,'Close','tan','G',0,150),(16,55,'JA3','vd','P',0,180),(17,6,'JA3','pt','M',0,200),(18,7,'JA3','pt','G',0,200),(20,56,'JA3','vd','M',0,180),(21,57,'JA3','vd','G',0,180),(22,105,'JA3','tan','P',0,180),(23,106,'JA3','tan','M',0,180),(24,107,'JA3','tan','G',0,180),(25,5,'JA3','pt','P',0,200),(26,501,'P. Camelback','pt','ST',0,40),(27,502,'Bolsa Pequena','pt','ST',0,20),(28,503,'Bolsa Média','pt','ST',0,20),(29,504,'Bolsa Grande','pt','ST',0,35),(30,505,'P.C. Fuzil Velc','pt','ST',0,20),(31,506,'P.C. Fuzil TT','pt','ST',0,20),(32,507,'P.C. Fuzil Elás','pt','ST',0,20),(33,508,'P.C.Pistola Dup','pt','ST',0,20),(34,509,'P.C. SMT/UMP','pt','ST',0,20),(35,510,'P.C. Calibre 12','pt','ST',0,20),(36,511,'Coldre Unive. D','pt','ST',0,15),(37,512,'Coldre Unive. C','pt','ST',0,15),(38,513,'P. Rádio / HT','pt','ST',0,15),(39,551,'P. Camelback','vd','ST',0,40),(40,552,'Bolsa Pequena','vd','ST',0,20),(41,553,'Bolsa Média','vd','ST',0,20),(42,554,'Bolsa Grande','vd','ST',0,30),(43,555,'P.C. Fuzil Velc','vd','ST',0,20),(44,556,'P.C. Fuzil TT','vd','ST',0,20),(45,557,'P.C. Fuzil Elás','vd','ST',0,20),(46,558,'P.C.Pistola Dup','vd','ST',0,20),(47,559,'P.C. SMT/UMP','vd','ST',0,20),(48,560,'P.C. Calibre 12','vd','ST',0,20),(49,561,'Coldre Unive. D','vd','ST',0,15),(50,562,'Coldre Unive. C','vd','ST',0,15),(51,563,'P. Rádio / HT','vd','ST',0,15),(52,601,'P. Camelback','tan','ST',0,40),(53,602,'Bolsa Pequena','tan','ST',0,20),(54,603,'Bolsa Média','tan','ST',0,20),(55,604,'Bolsa Grande','tan','ST',0,30),(56,605,'P.C. Fuzil Velc','tan','ST',0,20),(57,606,'P.C. Fuzil TT','tan','ST',0,20),(58,607,'P.C. Fuzil Elás','tan','ST',0,20),(59,608,'P.C.Pistola Dup','tan','ST',0,20),(60,609,'P.C. SMT/UMP','tan','ST',0,20),(61,610,'P.C. Calibre 12','tan','ST',0,20),(62,611,'Coldre Unive. D','tan','ST',0,15),(63,612,'Coldre Unive. C','tan','ST',0,15),(64,613,'P. Rádio / HT','tan','ST',0,15),(65,1001,'Universal Per D','pt','ST',0,35),(66,1002,'Universal Per C','pt','ST',0,35),(67,1051,'Universal Per D','vd','ST',0,35),(68,1052,'Universal Per C','vd','ST',0,35),(69,1101,'Universal Per D','tan','ST',0,35),(70,1102,'Universal Per C','tan','ST',0,35),(71,1501,'Tático Fiv Plas','pt','ST',0,35),(72,1502,'NA','pt','ST',0,35),(73,1551,'Tático Fiv Plas','vd','ST',0,35),(74,1552,'NA','vd','ST',0,35),(75,1601,'Tático Fiv Plas','tan','ST',0,35),(76,1602,'NA','tan','ST',0,35),(77,2001,'Tático','pt','ST',0,55),(78,2002,'3 PST','pt','ST',0,55),(79,2051,'Tático','vd','ST',0,55),(80,2052,'3 PST','vd','ST',0,55),(81,2101,'Tático','tan','ST',0,55),(82,2102,'3 PST','tan','ST',0,55),(83,2501,'Tática 1 ponto','pt','ST',0,55),(84,2551,'Tática 1 ponto','vd','ST',0,55),(85,2601,'Tática 1 ponto','tan','ST',0,55),(86,514,'P. Algemas','pt','ST',0,15),(87,564,'P. Algemas','vd','ST',0,15),(88,614,'P. Algemas','tan','ST',0,15),(92,5401,'Shemagh simples','S/C','ST',0,45),(93,3001,'Mochila pequena','S/C','ST',0,110),(94,3002,'Mochila média','S/C','ST',0,120),(95,3003,'Mochila Grande','S/C','ST',0,200),(96,5801,'Sup. Cel braço ','S/C','ST',0,15),(97,5701,'Kit cantil ','S/C','ST',0,75),(98,3701,'Ref camel 2.5L','S/C','ST',0,45),(99,3901,'Farda exército','cvd','P',0,210),(100,3902,'Farda Exército','cvd','M',0,210),(101,3903,'Farda Exército ','cvd','G',0,210),(102,3904,'Farda Exército','cvd','GG',0,210),(103,4701,'Gorro','S/C','ST',0,20),(104,4001,'Faca Tática','S/C','ST',0,80),(105,4101,'Canivete Pequen','S/C','ST',0,0),(106,4102,'Canivete médio','S/C','ST',0,35),(107,4103,'Canivete Grande','S/C','ST',0,55),(108,4104,'Multiuso talher','S/C','ST',0,35),(109,4901,'Bússola simples','S/C','ST',0,35),(110,4201,'Mini lanterna','S/C','ST',0,10),(111,4202,'Lanterna Pequen','S/C','ST',0,20),(112,4203,'Lanterna Choque','S/C','ST',0,55),(113,4204,'Lanterna Tática','S/C','ST',0,65),(114,5001,'Par de Bombacho','S/C','ST',0,5),(115,5101,'Cadeado pequeno','S/C','ST',0,20),(116,4401,'Pul c/ Bússola','S/C','ST',0,35),(117,4801,'Capacete Básico','S/C','ST',0,220),(118,5301,'Másc. Tática','S/C','ST',0,45),(119,4501,'Boné simples','S/C','ST',0,40),(120,3801,'Fiel Aspiral','S/C','ST',0,25),(121,5501,'Gandoleta','S/C','ST',0,135),(122,4301,'Moch. Camelback','S/C','ST',0,105),(123,5601,'Bolsa Velame','S/C','ST',0,35),(124,4601,'Chapéu caçador','S/C','ST',0,35),(125,3601,'Kit cot. e joel','pt','ST',0,60),(126,3602,'Kit Cot. e Joel','vd','ST',0,60),(127,3603,'Kit Cot. e Joel','tan','ST',0,60),(128,1503,'Black Hawk','pt','ST',0,60),(129,1553,'Black Hawk','vd','ST',0,60),(130,1603,'Black Hawk','tan','ST',0,60),(131,1003,'Mini Coldre','pt','ST',0,20),(132,1053,'Mini Coldre','vd','ST',0,20),(133,1103,'Mini Coldre','tan','ST',0,20),(134,1504,'Prot. Acolchoad','pt','ST',0,15),(135,1554,'Prot. Acolchoad','vd','ST',0,15),(136,1604,'Prot. Acolchoad','tan','ST',0,15),(137,5901,'Corta Vento','S/C','ST',0,0),(138,5902,'Casaco tático','S/C','ST',0,220),(139,5903,'Malvinão','S/C','ST',0,150);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-27 18:01:47
