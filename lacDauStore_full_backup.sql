-- MySQL dump 10.13  Distrib 8.0.41, for macos14.7 (x86_64)
--
-- Host: localhost    Database: lacDauStore
-- ------------------------------------------------------
-- Server version	9.1.0

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
-- Current Database: `lacDauStore`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `lacDauStore` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `lacDauStore`;

--
-- Table structure for table `addresses`
--

DROP TABLE IF EXISTS `addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `addresses` (
  `address_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `address_line` varchar(255) NOT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `postal_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `is_default` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `addresses_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `addresses`
--

LOCK TABLES `addresses` WRITE;
/*!40000 ALTER TABLE `addresses` DISABLE KEYS */;
INSERT INTO `addresses` VALUES (3,2,'Lê Quốc kỳ','0909876543','789 Đường Hai Bà Trưng','Ninh Kiều','Cần Thơ','900000','Vietnam',0,'2025-02-09 20:23:57','2025-02-11 15:17:38'),(9,2,'Qwdqwd','Qwdqwd','Wqd','','','','',1,'2025-02-09 18:50:46','2025-02-11 15:17:38'),(10,2,'Qwdqwd','Qwdqwd','Was','','','','',0,'2025-02-09 18:51:34','2025-02-11 07:40:16');
/*!40000 ALTER TABLE `addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `cart_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `status` int DEFAULT '1',
  PRIMARY KEY (`cart_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
INSERT INTO `cart` VALUES (35,2,2,1,'2025-02-13 14:58:40',1);
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `parent_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`category_id`),
  KEY `parent_id` (`parent_id`),
  CONSTRAINT `categories_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`category_id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics','Devices and gadgets',NULL,'2024-12-09 18:09:35','2024-12-09 18:09:35'),(2,'Mobile Phones','Smartphones and accessories',1,'2024-12-09 18:09:35','2024-12-09 18:09:35'),(3,'Laptops','Portable computers',1,'2024-12-09 18:09:35','2024-12-09 18:09:35'),(4,'Home Appliances','Household electronic items',NULL,'2024-12-09 18:09:35','2024-12-09 18:09:35'),(5,'Cameras','Photography equipment and accessories',NULL,'2024-12-09 18:09:35','2024-12-09 18:09:35'),(6,'Wearables','Smartwatches, fitness trackers, etc.',1,'2024-12-09 18:09:35','2024-12-09 18:09:35'),(7,'Accessories','Phone cases, chargers, and other accessories',2,'2024-12-09 18:09:35','2024-12-09 18:09:35'),(8,'Gaming','Gaming consoles and accessories',NULL,'2024-12-09 18:09:35','2024-12-09 18:09:35');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `inventory_id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `quantity` int DEFAULT '0',
  `location` varchar(50) DEFAULT NULL,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`inventory_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES (4,1,60,'Warehouse A','2024-12-16 20:51:37'),(5,2,40,'Warehouse B','2024-12-16 20:49:36'),(6,3,40,'Warehouse C','2024-12-16 20:49:36'),(7,4,60,'Warehouse A','2024-12-16 20:49:36'),(8,5,25,'Warehouse B','2024-12-16 20:49:36'),(9,6,15,'Warehouse C','2024-12-16 20:49:36'),(10,7,20,'Warehouse A','2024-12-16 20:49:36'),(11,8,80,'Warehouse B','2024-12-16 20:49:36'),(12,9,100,'Warehouse C','2024-12-16 20:49:36'),(13,10,120,'Warehouse A','2024-12-16 20:49:36'),(14,11,200,'Warehouse B','2024-12-16 20:49:36'),(15,12,150,'Warehouse C','2024-12-16 20:49:36'),(16,13,60,'Warehouse A','2024-12-16 20:49:36'),(17,14,45,'Warehouse B','2024-12-16 20:49:36'),(18,15,10,'Warehouse C','2024-12-16 20:49:36'),(19,16,35,'Warehouse A','2024-12-16 20:49:36'),(20,17,80,'Warehouse B','2024-12-16 20:49:36'),(21,18,110,'Warehouse C','2024-12-16 20:49:36'),(22,19,220,'Warehouse A','2024-12-16 20:49:36'),(23,20,180,'Warehouse B','2024-12-16 20:49:36'),(24,21,50,'Warehouse C','2024-12-16 20:49:36'),(25,22,20,'Warehouse A','2024-12-16 20:49:36'),(26,23,90,'Warehouse B','2024-12-16 20:49:36'),(27,24,75,'Warehouse C','2024-12-16 20:49:36'),(28,25,30,'Warehouse A','2024-12-16 20:49:36'),(29,26,25,'Warehouse B','2024-12-16 20:49:36'),(30,27,150,'Warehouse C','2024-12-16 20:49:36'),(31,28,200,'Warehouse A','2024-12-16 20:49:36'),(32,29,40,'Warehouse B','2024-12-16 20:49:36');
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sync_product_stock_after_inventory_insert` AFTER INSERT ON `inventory` FOR EACH ROW BEGIN
    DECLARE total_quantity INT DEFAULT 0;

    -- Tính tổng số lượng từ tất cả các kho cho sản phẩm này
    SELECT COALESCE(SUM(quantity), 0) INTO total_quantity
    FROM inventory
    WHERE product_id = NEW.product_id;

    -- Cập nhật bảng products
    UPDATE products
    SET stock = total_quantity
    WHERE product_id = NEW.product_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sync_product_stock_after_inventory_update` AFTER UPDATE ON `inventory` FOR EACH ROW BEGIN
    DECLARE total_quantity INT DEFAULT 0;

    -- Tính tổng số lượng từ tất cả các kho cho sản phẩm này
    SELECT COALESCE(SUM(quantity), 0) INTO total_quantity
    FROM inventory
    WHERE product_id = NEW.product_id;

    -- Cập nhật bảng products
    UPDATE products
    SET stock = total_quantity
    WHERE product_id = NEW.product_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `sync_product_stock_after_inventory_delete` AFTER DELETE ON `inventory` FOR EACH ROW BEGIN
    DECLARE total_quantity INT DEFAULT 0;

    -- Tính tổng số lượng từ tất cả các kho cho sản phẩm này
    SELECT COALESCE(SUM(quantity), 0) INTO total_quantity
    FROM inventory
    WHERE product_id = OLD.product_id;

    -- Cập nhật bảng products
    UPDATE products
    SET stock = total_quantity
    WHERE product_id = OLD.product_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `discount` decimal(5,2) DEFAULT '0.00',
  PRIMARY KEY (`order_item_id`),
  KEY `order_id` (`order_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `order_items_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_items_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (28,23,1,1,999.99,NULL),(29,23,2,2,1199.99,NULL),(30,24,1,1,399.99,60.00),(31,24,2,1,479.99,60.00);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `status` enum('pending','shipped','completed','cancelled') DEFAULT 'pending',
  `payment_method_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `discount_applied` text,
  `order_information` text,
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `fk_orders_payment_method` (`payment_method_id`),
  CONSTRAINT `fk_orders_payment_method` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_methods` (`payment_method_id`) ON DELETE SET NULL,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (23,2,3399.97,'completed',2,'2025-02-12 17:12:32','2025-02-13 22:51:52','','Recipient name: Qwdqwd, Phone: Qwdqwd, Address: Wqd, City: , State: , Postal Code: '),(24,2,703.98,'cancelled',1,'2025-02-12 17:24:03','2025-02-13 22:52:29','Test','Recipient name: Qwdqwd, Phone: Qwdqwd, Address: Wqd, City: , State: , Postal Code: ');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment_methods`
--

DROP TABLE IF EXISTS `payment_methods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment_methods` (
  `payment_method_id` int NOT NULL AUTO_INCREMENT,
  `method_name` varchar(50) NOT NULL,
  `description` text,
  `status` enum('active','inactive') DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_method_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment_methods`
--

LOCK TABLES `payment_methods` WRITE;
/*!40000 ALTER TABLE `payment_methods` DISABLE KEYS */;
INSERT INTO `payment_methods` VALUES (1,'PayPal','Payment via PayPal','active','2025-02-12 23:53:05'),(2,'Cash on Delivery','Payment upon receiving the goods','active','2025-02-12 23:53:05');
/*!40000 ALTER TABLE `payment_methods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status` enum('pending','completed','failed') DEFAULT 'pending',
  `transaction_date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`payment_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `payments_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_promotions`
--

DROP TABLE IF EXISTS `product_promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_promotions` (
  `product_id` int NOT NULL,
  `promotion_id` int NOT NULL,
  PRIMARY KEY (`product_id`,`promotion_id`),
  KEY `promotion_id` (`promotion_id`),
  CONSTRAINT `product_promotions_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `product_promotions_ibfk_2` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`promotion_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_promotions`
--

LOCK TABLES `product_promotions` WRITE;
/*!40000 ALTER TABLE `product_promotions` DISABLE KEYS */;
INSERT INTO `product_promotions` VALUES (1,1),(2,1),(4,2);
/*!40000 ALTER TABLE `product_promotions` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_promotion_insert` AFTER INSERT ON `product_promotions` FOR EACH ROW BEGIN
  DECLARE promo_discount DECIMAL(5, 2);

  -- Lấy tỷ lệ giảm giá nếu khuyến mãi còn hiệu lực
  SELECT discount_percent INTO promo_discount
  FROM promotions
  WHERE promotion_id = NEW.promotion_id
    AND status = 'active'
    AND start_date <= NOW()
    AND end_date >= NOW();

  -- Cập nhật giá khuyến mãi nếu có khuyến mãi hợp lệ
  IF promo_discount IS NOT NULL THEN
    UPDATE products
    SET discount_price = TRUNCATE(price * (1 - promo_discount / 100), 2)
    WHERE product_id = NEW.product_id;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_product_promotion_update` AFTER UPDATE ON `product_promotions` FOR EACH ROW BEGIN
  DECLARE promo_discount DECIMAL(5, 2);
  -- Lấy tỷ lệ giảm giá nếu khuyến mãi còn hiệu lực
  SELECT discount_percent INTO promo_discount
  FROM promotions
  WHERE promotion_id = NEW.promotion_id
    AND status = 'active'
    AND start_date <= NOW()
    AND end_date >= NOW();

  -- Cập nhật giá khuyến mãi cho sản phẩm
  IF promo_discount IS NOT NULL THEN
    -- Nếu có khuyến mãi hợp lệ
    UPDATE products
    SET discount_price = TRUNCATE(price * (1 - promo_discount / 100), 2)
    WHERE product_id = NEW.product_id;
  ELSE
    -- Nếu không có khuyến mãi hợp lệ, đặt discount_price về NULL
    UPDATE products
    SET discount_price = NULL
    WHERE product_id = NEW.product_id;
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_promotion_delete` AFTER DELETE ON `product_promotions` FOR EACH ROW BEGIN
  -- Đặt giá khuyến mãi thành NULL khi khuyến mãi bị xóa
  UPDATE products
  SET discount_price = NULL
  WHERE product_id = OLD.product_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `product_views`
--

DROP TABLE IF EXISTS `product_views`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_views` (
  `view_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  `viewed_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`view_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `product_views_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `product_views_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_views`
--

LOCK TABLES `product_views` WRITE;
/*!40000 ALTER TABLE `product_views` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_views` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `supplier_id` int DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `description` text,
  `price` decimal(10,2) NOT NULL,
  `discount_price` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT '0',
  `image_url` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`product_id`),
  KEY `category_id` (`category_id`),
  KEY `supplier_id` (`supplier_id`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,2,1,'iPhone 14','Latest Apple smartphone',999.99,NULL,60,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 17:09:35','2025-02-13 12:27:21'),(2,3,2,'Dell XPS 13','High-end portable laptop',1199.99,NULL,30,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 19:09:35','2025-02-13 12:27:21'),(3,2,1,'Samsung Galaxy S23','Flagship Samsung smartphone',799.99,NULL,40,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2025-01-17 16:33:28'),(4,2,3,'Google Pixel 7','Google’s flagship smartphone',899.99,NULL,60,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 16:09:35','2025-01-18 16:50:14'),(5,3,5,'MacBook Air','Lightweight laptop with Apple Silicon',999.99,NULL,25,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2025-01-17 23:14:19'),(6,4,6,'Dyson V15 Vacuum','High-power cordless vacuum cleaner',599.99,NULL,15,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(7,5,4,'Canon EOS R5','Professional mirrorless camera',3899.99,NULL,20,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 20:09:35','2025-01-15 16:53:08'),(8,6,3,'Apple Watch Series 8','Latest Apple smartwatch with new features',399.99,NULL,80,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(9,8,6,'PlayStation 5','Next-gen gaming console by Sony',499.99,NULL,100,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(10,8,6,'Xbox Series X','Next-gen gaming console by Microsoft',499.99,NULL,120,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(11,7,1,'OtterBox Defender Case','Durable phone case for iPhone 14',49.99,NULL,200,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(12,7,5,'Laptop Stand Pro','Adjustable laptop stand for ergonomics',29.99,NULL,150,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(13,2,2,'OnePlus 9','Affordable high-performance smartphone',699.99,NULL,60,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(14,3,2,'HP Spectre x360','Convertible laptop with sleek design',1499.99,NULL,45,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(15,4,3,'Samsung Smart Refrigerator','Smart fridge with Wi-Fi and touch screen',2999.99,NULL,10,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(16,5,3,'Sony Alpha 7C','Compact mirrorless camera with full-frame sensor',2299.99,NULL,35,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(17,6,4,'Garmin Forerunner 945','Advanced fitness and GPS smartwatch',599.99,NULL,80,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(18,8,2,'Nintendo Switch OLED','OLED display version of Nintendo Switch',349.99,NULL,110,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(19,7,1,'Spigen Rugged Armor Case','Heavy-duty case for Samsung Galaxy S23',39.99,NULL,220,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(20,7,6,'JBL Flip 5 Speaker','Portable Bluetooth speaker with excellent sound',99.99,NULL,180,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(21,2,2,'Xiaomi Mi 11','Affordable flagship smartphone from Xiaomi',749.99,NULL,50,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(22,3,5,'Lenovo ThinkPad X1 Carbon','Business laptop with ultra-thin profile',1799.99,NULL,20,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(23,6,4,'Fitbit Charge 5','Fitness tracker with built-in GPS and heart rate monitor',179.99,NULL,90,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(24,8,1,'Oculus Quest 2','Standalone VR headset',299.99,NULL,75,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(25,4,6,'Samsung Air Purifier','Air purifier with smart features and HEPA filter',249.99,NULL,30,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(26,5,5,'Nikon D850','Full-frame DSLR with high resolution',2999.99,NULL,25,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2025-01-15 16:53:08'),(27,7,3,'Razer DeathAdder V2','Ergonomic gaming mouse with Razer Optical Mouse Switches',69.99,NULL,150,'https://www.kasandbox.org/programming-images/avatars/leafers-ultimate.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(28,7,2,'Anker PowerPort 3','Fast charging power adapter for all devices',29.99,NULL,200,'https://www.kasandbox.org/programming-images/avatars/leafers-sapling.png','2024-12-09 18:09:35','2024-12-09 18:09:35'),(29,6,3,'Suunto 9 Baro','Multisport GPS watch with long battery life',499.99,NULL,40,'https://www.kasandbox.org/programming-images/avatars/leafers-tree.png','2024-12-09 18:09:35','2024-12-09 18:09:35');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promotions`
--

DROP TABLE IF EXISTS `promotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `promotions` (
  `promotion_id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(20) NOT NULL,
  `discount_percent` decimal(5,2) NOT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `min_order_value` decimal(10,2) DEFAULT NULL,
  `status` enum('active','expired') DEFAULT 'active',
  PRIMARY KEY (`promotion_id`),
  UNIQUE KEY `code` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promotions`
--

LOCK TABLES `promotions` WRITE;
/*!40000 ALTER TABLE `promotions` DISABLE KEYS */;
INSERT INTO `promotions` VALUES (1,'NEWYEAR2025',60.00,'2025-01-01 00:00:00','2025-02-13 12:15:00',100.00,'expired'),(2,'NEWYEAR2024',40.00,'2025-01-01 00:00:00','2025-01-18 16:45:00',100.00,'expired'),(4,'Test',20.00,'2024-01-01 00:00:00','2025-03-16 00:00:00',100.00,'active');
/*!40000 ALTER TABLE `promotions` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `before_promotion_update` BEFORE UPDATE ON `promotions` FOR EACH ROW BEGIN
  -- Kích hoạt lại khuyến mãi nếu thời gian hợp lệ
  IF NEW.start_date <= NOW() AND NEW.end_date >= NOW() THEN
    SET NEW.status = 'active';
  ELSE
    SET NEW.status = 'expired';
  END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_promotion_update` AFTER UPDATE ON `promotions` FOR EACH ROW BEGIN
  -- Cập nhật giá khuyến mãi cho tất cả các sản phẩm liên quan
  UPDATE products p
  JOIN product_promotions pp ON p.product_id = pp.product_id
  SET p.discount_price = 
      CASE
        -- Nếu khuyến mãi còn hiệu lực
        WHEN NEW.status = 'active'
             AND NEW.start_date <= NOW()
             AND NEW.end_date >= NOW() THEN TRUNCATE(p.price * (1 - NEW.discount_percent / 100), 2)
        -- Nếu khuyến mãi hết hạn hoặc bị vô hiệu hóa
        ELSE NULL
      END
  WHERE pp.promotion_id = NEW.promotion_id;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `review_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`review_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `reviews_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`) ON DELETE CASCADE,
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `suppliers`
--

DROP TABLE IF EXISTS `suppliers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `suppliers` (
  `supplier_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `contact_info` text,
  `address` text,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`supplier_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `suppliers`
--

LOCK TABLES `suppliers` WRITE;
/*!40000 ALTER TABLE `suppliers` DISABLE KEYS */;
INSERT INTO `suppliers` VALUES (1,'Tech Supplier Co.','tech@example.com, +123456789','456 Tech Blvd','2024-12-09 18:09:35'),(2,'Gadget World','gadget@example.com, +987654321','789 Gadget Lane','2024-12-09 18:09:35'),(3,'SmartTech Inc.','contact@smarttech.com, +135792468','321 Innovation St','2024-12-09 18:09:35'),(4,'Mobile Depot','support@mobiledepot.com, +246813579','101 Mobile Ave','2024-12-09 18:09:35'),(5,'Laptops Unlimited','info@laptopsunlimited.com, +357913582','202 Laptop St','2024-12-09 18:09:35'),(6,'Gamer’s Paradise','sales@gamersparadise.com, +112233445','555 Game Blvd','2024-12-09 18:09:35');
/*!40000 ALTER TABLE `suppliers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_logs`
--

DROP TABLE IF EXISTS `user_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_logs` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `login_time` datetime DEFAULT NULL,
  `logout_time` datetime DEFAULT NULL,
  `ip_address` varchar(50) DEFAULT NULL,
  `user_agent` text,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `user_logs_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_logs`
--

LOCK TABLES `user_logs` WRITE;
/*!40000 ALTER TABLE `user_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) DEFAULT NULL,
  `role` enum('customer','admin','staff') DEFAULT 'customer',
  `status` enum('active','inactive','banned') DEFAULT 'active',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (2,'ducan2210','$2a$10$16kPLuNwcvtFegflY0Y8hOJDqFdVYm31X69TQsN/n6n/cj8ihsSV.','ducan22102000@gmail.com','222222','customer','active','2024-12-16 10:06:32','2024-12-16 10:26:37'),(3,'ngocphuong1002','$2a$10$69/w6agjRC8uv0L.ZVkKIuPp2Xdto7aiYx.REKb.jgHKUpS/nom0m','ngocphuong1002@gmail.com',NULL,'customer','active','2024-12-20 05:07:43','2024-12-20 05:07:43'),(4,'qeqeqe','$2a$10$amerVIyavUiPx9B7QWH/3.sko.sLAjYT0zFVISUOvzaF6gBEi8af6','email',NULL,'customer','active','2025-02-18 11:35:06','2025-02-18 11:35:06'),(5,'qrqrqr','$2a$10$6euCT8xUWWOR4Oy.IHF24uaBYfqSwPgH03nms2lIuD/KCbNUmp2XO','2',NULL,'customer','active','2025-02-18 11:40:35','2025-02-18 11:40:35'),(6,'Andeptrai','$2a$10$GtC6wC2MBVkSzfP8ml8C8uxg6b8Fko4HRpN6SyXZjE317bcZg0SwO','123123',NULL,'customer','active','2025-02-20 06:42:19','2025-02-20 06:42:19'),(7,'testthu1','$2a$10$pnnnvYkqvMepFsvRX7rGQu60FCSiHDFSPKbKI2gWmv0HTVahoq0BO','ducan2210200@gmail.com',NULL,'customer','active','2025-02-20 07:30:50','2025-02-20 07:30:50'),(8,'Ducan22100000','$2a$10$HN9lWT8f2amVcNerlsr8SeTjb6mb0ekW31e7c4QorNosbPmKSdiTq','123123@gmail.com',NULL,'customer','active','2025-02-20 07:42:38','2025-02-20 07:42:38'),(9,'Ducan2210000','$2a$10$zm9IPYbFsEJO6cs6A2973eLLOwZ.A/kZ7HYa2Auo/fOJc2T4UHTc.','123123@gmail.co',NULL,'customer','active','2025-02-20 07:42:57','2025-02-20 07:42:57');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `wishlist_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `added_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`wishlist_id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`),
  CONSTRAINT `wishlist_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `wishlist_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (4,2,4,'2025-01-14 18:01:14'),(7,2,1,'2025-01-17 17:32:58'),(8,2,3,'2025-01-17 17:40:30'),(9,2,2,'2025-01-24 16:09:42');
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'lacDauStore'
--
/*!50106 SET @save_time_zone= @@TIME_ZONE */ ;
/*!50106 DROP EVENT IF EXISTS `update_promotions_daily` */;
DELIMITER ;;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;;
/*!50003 SET character_set_client  = utf8mb4 */ ;;
/*!50003 SET character_set_results = utf8mb4 */ ;;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;;
/*!50003 SET @saved_time_zone      = @@time_zone */ ;;
/*!50003 SET time_zone             = 'SYSTEM' */ ;;
/*!50106 CREATE*/ /*!50117 DEFINER=`root`@`localhost`*/ /*!50106 EVENT `update_promotions_daily` ON SCHEDULE EVERY 1 MINUTE STARTS '2025-01-17 16:19:28' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
  -- 1. Cập nhật trạng thái khuyến mãi
  UPDATE promotions
  SET status = 'expired'
  WHERE end_date < NOW()
    AND status = 'active';

  -- 2. Cập nhật giá khuyến mãi cho sản phẩm
  UPDATE products p
  LEFT JOIN product_promotions pp ON p.product_id = pp.product_id
  LEFT JOIN promotions pr ON pp.promotion_id = pr.promotion_id
  SET p.discount_price = 
      CASE
        -- Nếu khuyến mãi còn hiệu lực
        WHEN pr.status = 'active'
             AND pr.start_date <= NOW()
             AND pr.end_date >= NOW() THEN TRUNCATE(p.price * (1 - NEW.discount_percent / 100), 2)
        -- Nếu không còn khuyến mãi
        ELSE NULL
      END;
END */ ;;
/*!50003 SET time_zone             = @saved_time_zone */ ;;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;;
/*!50003 SET character_set_client  = @saved_cs_client */ ;;
/*!50003 SET character_set_results = @saved_cs_results */ ;;
/*!50003 SET collation_connection  = @saved_col_connection */ ;;
DELIMITER ;
/*!50106 SET TIME_ZONE= @save_time_zone */ ;

--
-- Dumping routines for database 'lacDauStore'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-02-23 13:49:10
