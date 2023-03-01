-- MySQL dump 10.13  Distrib 8.0.32, for Linux (x86_64)
--
-- Host: localhost    Database: dev_db
-- ------------------------------------------------------
-- Server version	8.0.32-0ubuntu0.20.04.2

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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `doctor` varchar(128) NOT NULL,
  `patient_id` varchar(60) NOT NULL,
  `doctor_id` varchar(60) NOT NULL,
  `date` date DEFAULT NULL,
  `start_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `confirmed` varchar(60) DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES ('Jane','Smith','Dr. Khumalo','1bef9e61-e941-490a-8b8d-45bb6a756c44','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-02-24','16:10:00','16:40:00','false','157e0fde-5a1a-425b-9ba8-6a0c94f7d07e'),('Thando','Nkosi','Dr. Khumalo','5ff7a961-2184-4daa-87f3-30ee05ebe02e','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-03-10','13:10:00','13:40:00','false','181b4899-da3f-4ff0-8a4c-009daaeda404'),('Zanele','Mkhize','Dr. Mashaba','a552864e-21ab-459c-a951-6cec45f7b86b','53f55456-f287-482e-a592-e3b2d3112d6c','2023-02-25','11:00:00','11:30:00','false','2fd5468c-c65d-4c70-b1c3-473360cefb8b'),('Nkosazana','Dlamini','Dr. Khumalo','7480a4b5-ee6e-4651-b0ab-7a99f8fc27ff','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-03-08','15:10:00','15:40:00','false','638838b4-20c0-4924-be73-03cd9dbb8152'),('Siyabonga','Ndlovu','Dr. Mashaba','7d60e675-b5ee-4442-b55d-5a80ec8d9f4b','53f55456-f287-482e-a592-e3b2d3112d6c','2023-02-23','10:00:00','10:30:00','false','6d63dc19-1f26-4f1c-9cd6-3a0f62c613b7'),('Jane','Smith','Dr. Khumalo','1bef9e61-e941-490a-8b8d-45bb6a756c44','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-02-28','15:40:00','16:10:00','false','8b567aee-e107-46cb-ad17-454f65906bb3'),('Sipho','Khumalo','Dr. Mashaba','82b1034f-2ce1-4617-a3cb-476caf080ffe','53f55456-f287-482e-a592-e3b2d3112d6c','2023-03-13','11:30:00','12:00:00','false','8eab371c-449b-4db9-a110-28580f571499'),('Zanele','Ngubane','Dr. Mashaba','f4263166-3c49-4b3e-a14a-cb4f929ce18a','53f55456-f287-482e-a592-e3b2d3112d6c','2023-03-01','16:10:00','16:40:00','false','99e65d6d-78fe-4f2c-9352-1b4e67d0633c'),('Sipho','Khumalo','Dr. Khumalo','82b1034f-2ce1-4617-a3cb-476caf080ffe','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-03-14','16:10:00','16:40:00','false','9d8754b8-cca7-4a8a-bc7c-299fba08729d'),('Lerato','Mabaso','Dr. Mashaba','b8109144-639e-4b78-824c-0bf9f3790ecc','53f55456-f287-482e-a592-e3b2d3112d6c','2023-03-15','09:30:00','10:00:00','false','b19aff7b-5512-4813-8efc-4c4d8c508501'),('Lerato','Mabaso','Dr. Mashaba','b8109144-639e-4b78-824c-0bf9f3790ecc','53f55456-f287-482e-a592-e3b2d3112d6c','2023-03-09','14:10:00','14:40:00','false','bd3bd414-d3ae-44b4-967e-2144349663cc'),('Lerato','Mabaso','Dr. Mashaba','b8109144-639e-4b78-824c-0bf9f3790ecc','53f55456-f287-482e-a592-e3b2d3112d6c','2023-03-03','11:00:00','11:30:00','false','dbd5f139-ed4d-4b6f-9e33-dcaf06e5828a'),('Siyabonga','Ndlovu','Dr. Khumalo','7d60e675-b5ee-4442-b55d-5a80ec8d9f4b','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-03-02','15:40:00','16:10:00','false','e322e62b-2c7a-41e4-8b98-2ef0349b35a1'),('Thabo','Khumalo','Dr. Mashaba','156bdad2-6f5f-4a57-bd61-26d3b2c628fa','53f55456-f287-482e-a592-e3b2d3112d6c','2023-03-07','16:10:00','16:40:00','false','e5cffec6-3391-445d-9d50-ea3147572af6'),('Zanele','Ngubane','Dr. Khumalo','f4263166-3c49-4b3e-a14a-cb4f929ce18a','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-03-06','14:40:00','15:10:00','false','ed9d3e1e-ba98-4988-884e-8c37e925bd75'),('Jane','Smith','Dr. Khumalo','1bef9e61-e941-490a-8b8d-45bb6a756c44','e45fc4f8-ea35-4ac5-92b1-5db303203b51','2023-03-16','09:00:00','09:30:00','false','ee18f8a9-9659-4a12-9111-08b4d82c97fc');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_records`
--

DROP TABLE IF EXISTS `medical_records`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_records` (
  `doctor` varchar(128) NOT NULL,
  `doctor_id` varchar(60) NOT NULL,
  `patient_id` varchar(60) NOT NULL,
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `gender` varchar(60) NOT NULL,
  `age` int NOT NULL,
  `date` date NOT NULL,
  `symptoms` json NOT NULL,
  `diagnosis` json NOT NULL,
  `prescription` json NOT NULL,
  `id` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `medical_records_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_records`
--

LOCK TABLES `medical_records` WRITE;
/*!40000 ALTER TABLE `medical_records` DISABLE KEYS */;
INSERT INTO `medical_records` VALUES ('Dr. Mashaba','53f55456-f287-482e-a592-e3b2d3112d6c','a4e7cd77-be61-493b-8b24-e4a8e61e2bce','Nomvula','Nkosi','female',55,'2021-09-23','\"[\\\"abdominal pain\\\", \\\"vomiting\\\", \\\"diarrhea\\\"]\"','\"\\\"gastroenteritis\\\"\"','\"[{\\\"medication_name\\\": \\\"Loperamide\\\", \\\"dosage\\\": \\\"2mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"2 days\\\"}, {\\\"medication_name\\\": \\\"Ondansetron\\\", \\\"dosage\\\": \\\"8mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}]\"','194a7b67-752a-48ca-8f3b-e7b5783b92c6'),('Dr. Mashaba','53f55456-f287-482e-a592-e3b2d3112d6c','b8109144-639e-4b78-824c-0bf9f3790ecc','Lerato','Mabaso','male',60,'2022-01-10','\"[\\\"chest pain\\\", \\\"shortness of breath\\\", \\\"nausea\\\"]\"','\"\\\"myocardial infarction\\\"\"','\"[{\\\"medication_name\\\": \\\"Aspirin\\\", \\\"dosage\\\": \\\"325mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"once daily\\\", \\\"duration\\\": \\\"indefinitely\\\"}, {\\\"medication_name\\\": \\\"Nitroglycerin\\\", \\\"dosage\\\": \\\"0.4mg\\\", \\\"route\\\": \\\"sublingual\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}, {\\\"medication_name\\\": \\\"Clopidogrel\\\", \\\"dosage\\\": \\\"75mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"once daily\\\", \\\"duration\\\": \\\"indefinitely\\\"}]\"','312bb643-16a8-4bbb-a795-e58ed5e5190b'),('Dr. Mashaba','53f55456-f287-482e-a592-e3b2d3112d6c','c4cb6dee-4740-44ed-abfb-4244ccd8d54b','Bongani','Moyo','male',40,'2022-01-10','\"[\\\"chest pain\\\", \\\"shortness of breath\\\", \\\"fatigue\\\"]\"','\"\\\"coronary artery disease\\\"\"','\"[{\\\"medication_name\\\": \\\"Atorvastatin\\\", \\\"dosage\\\": \\\"40mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"once daily\\\", \\\"duration\\\": \\\"indefinitely\\\"}, {\\\"medication_name\\\": \\\"Aspirin\\\", \\\"dosage\\\": \\\"81mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"once daily\\\", \\\"duration\\\": \\\"indefinitely\\\"}, {\\\"medication_name\\\": \\\"Metoprolol\\\", \\\"dosage\\\": \\\"50mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"twice daily\\\", \\\"duration\\\": \\\"indefinitely\\\"}]\"','496bacb0-9abe-42bb-9ab0-dd78e2d5e947'),('Dr. Mashaba','53f55456-f287-482e-a592-e3b2d3112d6c','7480a4b5-ee6e-4651-b0ab-7a99f8fc27ff','Nkosazana','Dlamini','male',50,'2022-01-10','\"[\\\"chest pain\\\", \\\"shortness of breath\\\", \\\"fatigue\\\"]\"','\"\\\"coronary artery disease\\\"\"','\"[{\\\"medication_name\\\": \\\"Aspirin\\\", \\\"dosage\\\": \\\"81mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"once daily\\\", \\\"duration\\\": \\\"indefinitely\\\"}, {\\\"medication_name\\\": \\\"Atorvastatin\\\", \\\"dosage\\\": \\\"40mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"once daily\\\", \\\"duration\\\": \\\"indefinitely\\\"}]\"','4a0e216d-b238-460f-b318-78de829fb337'),('Dr. Mashaba','53f55456-f287-482e-a592-e3b2d3112d6c','a552864e-21ab-459c-a951-6cec45f7b86b','Zanele','Mkhize','male',42,'2021-09-23','\"[\\\"abdominal pain\\\", \\\"nausea\\\", \\\"vomiting\\\"]\"','\"\\\"gastroenteritis\\\"\"','\"[{\\\"medication_name\\\": \\\"Ondansetron\\\", \\\"dosage\\\": \\\"8mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}, {\\\"medication_name\\\": \\\"Loperamide\\\", \\\"dosage\\\": \\\"2mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"2 days\\\"}, {\\\"medication_name\\\": \\\"Acetaminophen\\\", \\\"dosage\\\": \\\"500mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"every 6 hours\\\", \\\"duration\\\": \\\"5 days\\\"}]\"','662cdf19-b8a9-4d01-b51a-2c1d7222aca7'),('Dr. Mashaba','53f55456-f287-482e-a592-e3b2d3112d6c','a4e7cd77-be61-493b-8b24-e4a8e61e2bce','Nomvula','Nkosi','female',55,'2021-09-23','\"[\\\"abdominal pain\\\", \\\"vomiting\\\", \\\"diarrhea\\\"]\"','\"\\\"gastroenteritis\\\"\"','\"[{\\\"medication_name\\\": \\\"Loperamide\\\", \\\"dosage\\\": \\\"2mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"2 days\\\"}, {\\\"medication_name\\\": \\\"Ondansetron\\\", \\\"dosage\\\": \\\"8mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}]\"','79b3c1f3-906a-43c4-af96-78aa41e3c1b4'),('Dr. Khumalo','e45fc4f8-ea35-4ac5-92b1-5db303203b51','a4e7cd77-be61-493b-8b24-e4a8e61e2bce','Nomvula','Nkosi','female',55,'2021-09-23','\"[\\\"abdominal pain\\\", \\\"vomiting\\\", \\\"diarrhea\\\"]\"','\"\\\"gastroenteritis\\\"\"','\"[{\\\"medication_name\\\": \\\"Loperamide\\\", \\\"dosage\\\": \\\"2mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"2 days\\\"}, {\\\"medication_name\\\": \\\"Ondansetron\\\", \\\"dosage\\\": \\\"8mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}]\"','7a8e40ba-e3d5-4c03-bcb0-6b85111482c1'),('Dr. Khumalo','e45fc4f8-ea35-4ac5-92b1-5db303203b51','a4e7cd77-be61-493b-8b24-e4a8e61e2bce','Nomvula','Nkosi','female',55,'2021-09-23','\"[\\\"abdominal pain\\\", \\\"vomiting\\\", \\\"diarrhea\\\"]\"','\"\\\"gastroenteritis\\\"\"','\"[{\\\"medication_name\\\": \\\"Loperamide\\\", \\\"dosage\\\": \\\"2mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"2 days\\\"}, {\\\"medication_name\\\": \\\"Ondansetron\\\", \\\"dosage\\\": \\\"8mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}]\"','905fcfde-9136-4231-9c25-9c38e4e1afd2'),('Dr. Khumalo','e45fc4f8-ea35-4ac5-92b1-5db303203b51','7d60e675-b5ee-4442-b55d-5a80ec8d9f4b','Siyabonga','Ndlovu','female',35,'2022-01-10','\"[\\\"fatigue\\\", \\\"weakness\\\", \\\"dizziness\\\"]\"','\"\\\"anemia\\\"\"','\"[{\\\"medication_name\\\": \\\"Iron supplements\\\", \\\"dosage\\\": \\\"325mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"once daily\\\", \\\"duration\\\": \\\"3 months\\\"}]\"','9a302098-13cc-4f08-b3ac-c8d5267e77df'),('Dr. Khumalo','e45fc4f8-ea35-4ac5-92b1-5db303203b51','82b1034f-2ce1-4617-a3cb-476caf080ffe','Sipho','Khumalo','female',24,'2022-01-10','\"[\\\"sore throat\\\", \\\"fever\\\", \\\"body aches\\\"]\"','\"\\\"pharyngitis\\\"\"','\"[{\\\"medication_name\\\": \\\"Penicillin VK\\\", \\\"dosage\\\": \\\"500mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"four times daily\\\", \\\"duration\\\": \\\"10 days\\\"}, {\\\"medication_name\\\": \\\"Acetaminophen\\\", \\\"dosage\\\": \\\"500mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"every 6 hours\\\", \\\"duration\\\": \\\"5 days\\\"}]\"','b58e07ff-410c-48d6-9ecc-f82e9a3113c6'),('Dr. Khumalo','e45fc4f8-ea35-4ac5-92b1-5db303203b51','f4263166-3c49-4b3e-a14a-cb4f929ce18a','Zanele','Ngubane','female',28,'2021-09-23','\"[\\\"headache\\\", \\\"dizziness\\\", \\\"nausea\\\"]\"','\"\\\"migraine\\\"\"','\"[{\\\"medication_name\\\": \\\"Sumatriptan\\\", \\\"dosage\\\": \\\"100mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}]\"','c67ef610-905f-413c-bd6e-6568317d9ea7'),('Dr. Khumalo','e45fc4f8-ea35-4ac5-92b1-5db303203b51','1bef9e61-e941-490a-8b8d-45bb6a756c44','Jane','Smith','female',45,'2021-09-23','\"[\\\"headache\\\", \\\"dizziness\\\", \\\"nausea\\\"]\"','\"\\\"migraine\\\"\"','\"[{\\\"medication_name\\\": \\\"Sumatriptan\\\", \\\"dosage\\\": \\\"50mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"2 days\\\"}, {\\\"medication_name\\\": \\\"Naproxen\\\", \\\"dosage\\\": \\\"500mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"twice daily\\\", \\\"duration\\\": \\\"5 days\\\"}]\"','cd4e4dc8-a2ba-404b-ba18-0483e44b33f7'),('Dr. Mashaba','53f55456-f287-482e-a592-e3b2d3112d6c','5ff7a961-2184-4daa-87f3-30ee05ebe02e','Thando','Nkosi','male',35,'2021-09-23','\"[\\\"fever\\\", \\\"cough\\\", \\\"fatigue\\\"]\"','\"\\\"influenza\\\"\"','\"[{\\\"medication_name\\\": \\\"Tamiflu\\\", \\\"dosage\\\": \\\"75mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"twice daily\\\", \\\"duration\\\": \\\"5 days\\\"}, {\\\"medication_name\\\": \\\"Ibuprofen\\\", \\\"dosage\\\": \\\"200mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"as needed\\\", \\\"duration\\\": \\\"3 days\\\"}]\"','cf24bc9d-44fd-475c-b598-6a7de610f0ea'),('Dr. Khumalo','e45fc4f8-ea35-4ac5-92b1-5db303203b51','156bdad2-6f5f-4a57-bd61-26d3b2c628fa','Thabo','Khumalo','male',32,'2020-05-17','\"[\\\"cough\\\", \\\"fever\\\", \\\"fatigue\\\"]\"','\"\\\"pneumonia\\\"\"','\"[{\\\"medication_name\\\": \\\"Amoxicillin\\\", \\\"dosage\\\": \\\"500mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"three times daily\\\", \\\"duration\\\": \\\"10 days\\\"}, {\\\"medication_name\\\": \\\"Ibuprofen\\\", \\\"dosage\\\": \\\"400mg\\\", \\\"route\\\": \\\"oral\\\", \\\"frequency\\\": \\\"every 6 hours\\\", \\\"duration\\\": \\\"5 days\\\"}]\"','e5cc8217-a202-421f-b52d-cf774f14dfb4');
/*!40000 ALTER TABLE `medical_records` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `user_id` varchar(60) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `session_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `first_name` varchar(128) NOT NULL,
  `last_name` varchar(128) NOT NULL,
  `age` int DEFAULT NULL,
  `gender` varchar(60) DEFAULT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `position` varchar(128) NOT NULL,
  `calendar_id` int DEFAULT NULL,
  `id` varchar(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('Sifiso','Sithole',26,'Male','min','sitholesifisobrian@gmail.com','Admin',1,'010c89ec-25f8-420c-be28-d0273d7de23a'),('Thabo','Khumalo',32,'male','min','thabokhumalo@sample.com','Patient',11,'156bdad2-6f5f-4a57-bd61-26d3b2c628fa'),('Jane','Smith',45,'female','min','janesmith@sample.com','Patient',5,'1bef9e61-e941-490a-8b8d-45bb6a756c44'),('Lerato','Mashaba',30,'Female','min','leratomashaba@example.com','Doctor',2,'53f55456-f287-482e-a592-e3b2d3112d6c'),('Thando','Nkosi',35,'male','min','thandonkosi@sample.com','Patient',4,'5ff7a961-2184-4daa-87f3-30ee05ebe02e'),('Nkosazana','Dlamini',50,'male','min','nkosazanadlamini@sample.com','Patient',6,'7480a4b5-ee6e-4651-b0ab-7a99f8fc27ff'),('Siyabonga','Ndlovu',35,'female','min','siyabongandlovu@sample.com','Patient',9,'7d60e675-b5ee-4442-b55d-5a80ec8d9f4b'),('Sipho','Khumalo',24,'female','min','siphokhumalo@sample.com','Patient',7,'82b1034f-2ce1-4617-a3cb-476caf080ffe'),('Nomvula','Nkosi',55,'female','min','nomvulankosi@sample.com','Patient',12,'a4e7cd77-be61-493b-8b24-e4a8e61e2bce'),('Zanele','Mkhize',42,'male','min','zanelemkhize@sample.com','Patient',10,'a552864e-21ab-459c-a951-6cec45f7b86b'),('Lerato','Mabaso',60,'male','min','leratomabaso@sample.com','Patient',8,'b8109144-639e-4b78-824c-0bf9f3790ecc'),('Bongani','Moyo',40,'male','min','bonganimoyo@sample.com','Patient',13,'c4cb6dee-4740-44ed-abfb-4244ccd8d54b'),('Lerato','Khumalo',30,'Female','min','leratokhumalo@example.com','Doctor',3,'e45fc4f8-ea35-4ac5-92b1-5db303203b51'),('Zanele','Ngubane',28,'female','min','zanelengubane@sample.com','Patient',14,'f4263166-3c49-4b3e-a14a-cb4f929ce18a');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-01  7:15:11
