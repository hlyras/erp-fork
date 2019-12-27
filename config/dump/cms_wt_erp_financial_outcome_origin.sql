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
-- Table structure for table `financial_outcome_origin`
--

DROP TABLE IF EXISTS `financial_outcome_origin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `financial_outcome_origin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `category_id` int(11) NOT NULL,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `financial_outcome_origin`
--

LOCK TABLES `financial_outcome_origin` WRITE;
/*!40000 ALTER TABLE `financial_outcome_origin` DISABLE KEYS */;
INSERT INTO `financial_outcome_origin` VALUES (1,4,'Aluguel Loja'),(2,4,'Aluguel Fábrica'),(3,4,'Água Loja'),(4,4,'Água Fábrica'),(5,4,'Luz Loja'),(6,4,'Luz Fábrica'),(7,4,'Telefone Loja'),(8,4,'Contador'),(9,1,'Daniel'),(10,1,'Henrique'),(11,1,'Fabiano'),(13,1,'Josefa'),(14,1,'Dodô'),(15,1,'Betchola'),(16,1,'Daniel Boca'),(17,1,'Danrlei'),(18,1,'Caio'),(19,1,'Luis Henrique'),(20,1,'Luana'),(21,1,'Chris'),(22,1,'Anny'),(23,1,'Jean'),(24,1,'Sheyla'),(25,5,'Nota Fiscal'),(26,5,'FGTS'),(27,5,'GPS'),(28,6,'Agência Macro'),(29,6,'Vídeos'),(30,3,'Café'),(31,3,'Açucar'),(32,3,'Manteiga'),(33,3,'´Pão'),(34,3,'Churrasco'),(35,3,'Folha A4'),(36,3,'Fitas Adesivas'),(37,3,'Sacola JA'),(38,3,'Saco de Lixo'),(39,3,'Saco Bobina'),(40,3,'Saco Merc Livre'),(41,3,'Saco Nota Fiscal'),(42,3,'Papel Higiênico'),(43,3,'Tinta Impressora'),(44,3,'Tonner Impressora'),(45,3,'Material Limpeza'),(46,3,'Almoxerifado'),(47,7,'Agulhas'),(48,7,'Peças'),(49,7,'Compra de Máquina'),(50,2,'Luã'),(51,2,'China'),(52,2,'Eduardo'),(53,2,'Adina'),(54,2,'Oiapoc'),(55,2,'Brasmac'),(56,2,'Jorge Etiqueta'),(57,2,'Cordon Textil'),(59,2,'Santex'),(60,2,'Rogério Emborrachado'),(61,8,'Devolução Chris'),(62,8,'Devolução JC'),(64,9,'Devolução Tray');
/*!40000 ALTER TABLE `financial_outcome_origin` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-12-27 18:01:45
