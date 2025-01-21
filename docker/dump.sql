-- MySQL dump 10.13  Distrib 8.4.3, for macos13.7 (arm64)
--
-- Host: localhost    Database: yhangrydb
-- ------------------------------------------------------
-- Server version	8.4.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `yhangrydb`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `yhangrydb` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `yhangrydb`;

--
-- Table structure for table `cuisines`
--

DROP TABLE IF EXISTS `cuisines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cuisines` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuisines`
--

LOCK TABLES `cuisines` WRITE;
/*!40000 ALTER TABLE `cuisines` DISABLE KEYS */;
/*!40000 ALTER TABLE `cuisines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `menu_groups`
--

DROP TABLE IF EXISTS `menu_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE menu_groups (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `set_menu_id` INT NOT NULL,        
  `groups` JSON NULL,                 
  `dishes_count` INT DEFAULT NULL,    
  `selectable_dishes_count` INT DEFAULT NULL, 
  FOREIGN KEY (`set_menu_id`) REFERENCES `set_menus`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `menu_groups`
--

LOCK TABLES `menu_groups` WRITE;
/*!40000 ALTER TABLE `menu_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `menu_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `set_menu_cuisines`
--

DROP TABLE IF EXISTS `set_menu_cuisines`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `set_menu_cuisines` (
  `id` int NOT NULL AUTO_INCREMENT,
  `set_menu_id` int NOT NULL,
  `cuisine_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `set_menu_id` (`set_menu_id`),
  KEY `cuisine_id` (`cuisine_id`),
  CONSTRAINT `set_menu_cuisines_ibfk_1` FOREIGN KEY (`set_menu_id`) REFERENCES `set_menus` (`id`),
  CONSTRAINT `set_menu_cuisines_ibfk_2` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisines` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `set_menu_cuisines`
--

LOCK TABLES `set_menu_cuisines` WRITE;
/*!40000 ALTER TABLE `set_menu_cuisines` DISABLE KEYS */;
/*!40000 ALTER TABLE `set_menu_cuisines` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `set_menus`
--

DROP TABLE IF EXISTS `set_menus`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `set_menus` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `display_text` tinyint(1) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `thumbnail` varchar(255) DEFAULT NULL,
  `is_vegan` tinyint(1) DEFAULT NULL,
  `is_vegetarian` tinyint(1) DEFAULT NULL,
  `status` int DEFAULT NULL,
  `price_per_person` decimal(10,2) DEFAULT NULL,
  `min_spend` decimal(10,2) DEFAULT NULL,
  `is_seated` tinyint(1) DEFAULT NULL,
  `is_standing` tinyint(1) DEFAULT NULL,
  `is_canape` tinyint(1) DEFAULT NULL,
  `is_mixed_dietary` tinyint(1) DEFAULT NULL,
  `is_meal_prep` tinyint(1) DEFAULT NULL,
  `is_halal` tinyint(1) DEFAULT NULL,
  `is_kosher` tinyint(1) DEFAULT NULL,
  `price_includes` text,
  `highlight` text,
  `available` tinyint(1) DEFAULT NULL,
  `number_of_orders` int DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `set_menus`
--

LOCK TABLES `set_menus` WRITE;
/*!40000 ALTER TABLE `set_menus` DISABLE KEYS */;
/*!40000 ALTER TABLE `set_menus` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-01-17 22:35:07
