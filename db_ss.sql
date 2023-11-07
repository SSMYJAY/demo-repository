-- MySQL dump 10.13  Distrib 8.0.30, for Win64 (x86_64)
--
-- Host: localhost    Database: db_ss
-- ------------------------------------------------------
-- Server version	8.0.30

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
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `friends` (
  `user_id` int NOT NULL,
  `friend_user_id` int NOT NULL,
  PRIMARY KEY (`user_id`,`friend_user_id`),
  KEY `FK_friends_user_2` (`friend_user_id`),
  CONSTRAINT `FK_friends_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  CONSTRAINT `FK_friends_user_2` FOREIGN KEY (`friend_user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (13,1),(22,1),(40,1),(42,2),(44,2),(45,2),(8,3),(15,3),(20,3),(3,4),(6,4),(23,4),(36,4),(43,4),(44,4),(4,5),(23,5),(36,5),(3,6),(11,6),(35,6),(37,6),(42,6),(46,7),(34,9),(43,9),(51,9),(15,10),(40,10),(41,10),(7,11),(28,11),(38,11),(42,11),(9,12),(40,12),(45,12),(7,13),(13,13),(35,13),(11,14),(30,14),(44,14),(46,14),(2,15),(21,15),(27,15),(51,15),(13,16),(18,16),(38,16),(45,16),(16,17),(18,17),(19,17),(21,18),(33,18),(44,18),(51,18),(34,19),(35,19),(36,19),(49,19),(22,20),(29,20),(40,20),(47,20),(49,20),(37,22),(8,23),(15,23),(21,23),(31,23),(36,24),(51,24),(2,25),(14,25),(41,25),(13,26),(28,26),(45,26),(2,27),(31,27),(20,28),(49,28),(13,29),(26,29),(31,29),(10,30),(22,30),(46,30),(30,31),(45,31),(7,32),(9,32),(41,32),(43,32),(39,33),(44,33),(16,34),(18,34),(36,34),(37,34),(11,35),(14,35),(20,35),(21,35),(40,35),(3,36),(18,36),(38,36),(1,37),(27,37),(40,37),(44,37),(47,37),(43,38),(25,39),(29,39),(32,39),(36,39),(23,40),(30,40),(32,40),(36,40),(35,41),(51,41),(30,42),(46,42),(47,42),(14,43),(16,43),(20,43),(42,43),(35,44),(44,44),(33,45),(22,46),(28,46),(31,46),(37,46),(28,47),(29,47),(32,47),(30,49),(32,49),(45,49),(9,50);
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hashtag`
--

DROP TABLE IF EXISTS `hashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hashtag` (
  `tag_number` varchar(10) NOT NULL,
  `content` varchar(255) NOT NULL,
  PRIMARY KEY (`tag_number`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hashtag`
--

LOCK TABLES `hashtag` WRITE;
/*!40000 ALTER TABLE `hashtag` DISABLE KEYS */;
INSERT INTO `hashtag` VALUES ('0001','Introvert'),('0002','Extrovert'),('0003','Organized'),('0004','Spontaneous'),('0101','ENFJ'),('0102','ENFP'),('0103','ENTJ'),('0104','ENTP'),('0105','ESFJ'),('0106','ESFP'),('0107','ESTJ'),('0108','ESTP'),('0109','INFJ'),('0110','INFP'),('0111','INTJ'),('0112','INTP'),('0113','ISFJ'),('0114','ISFP'),('0115','ISTJ'),('0116','ISTP'),('0201','Kpop'),('0202','Kdrama'),('0203','Pop'),('0204','Band'),('0205','Hiphop'),('0206','Movie'),('0207','Anime'),('0208','Netflix'),('0301','FamousRestaurant'),('0302','Coffeeshop'),('0303','Dessert'),('0304','Chicken'),('0305','Meat'),('0306','Vegan'),('0307','Spicyfood'),('0401','Vodka'),('0402','Wine'),('0403','Beer'),('0404','Soju'),('0405','Cocktail'),('0406','AlcoholFree'),('0407','Pub'),('0408','Bar'),('0409','Club'),('0410','Party'),('0501','Sports'),('0502','Weight'),('0503','Crossfit'),('0504','Running'),('0505','Climbing'),('0506','Soccer'),('0507','Basketball'),('0508','Baseball'),('0509','Volleyball'),('0510','Golf'),('0511','OtherSports'),('0512','Sports'),('0601','Games'),('0602','LeagueOfLegends'),('0603','FIFA'),('0604','PCgames'),('0605','ConsoleGames'),('0606','Nintendo'),('0701','Cooking'),('0702','Baking'),('0703','Books'),('0704','Photo'),('0705','Travel'),('0706','Hiking'),('0707','Riding'),('0708','Camping'),('0709','Healing'),('0710','Festival'),('0711','Concert'),('0712','Museum'),('0713','Gallery'),('0714','Karaoke'),('0715','Activity'),('0801','Seoul'),('0802','HanRiver'),('0803','Busan'),('0804','Jeju'),('0805','Ocean'),('0806','Mountain'),('0807','Historic'),('0808','Nature'),('0809','Drive'),('0901','Studying_Together'),('0902','Calling'),('0903','Talkative'),('0904','LanguageExchange'),('0905','Pets'),('0906','Dogs'),('0907','Cats');
/*!40000 ALTER TABLE `hashtag` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `registration_date` date NOT NULL,
  `bio` text CHARACTER SET utf8mb4,
  `major` varchar(255) NOT NULL,
  `year` year NOT NULL,
  `gender` enum('Male','Female','Other','Prefer not to say') NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'Sergeant Colt','$2a$04$2Me7AcX7u1jORvkll/npgeONyqEgLlhcrZkSzaEk9nCL0eiH3MlxO','scolt0@army.mil','2023-08-11','Synergized mobile capability','Nursing',2022,'Prefer not to say'),(2,'Jaymie Kidstoun','$2a$04$5oEdVqecru3dniFNSG2LZOsMcusvXH/BTO2.2mPC8IksAQn6rjxV2','jkidstoun1@jugem.jp','2023-04-22','Innovative analyzing hierarchy','Psychology',2018,'Other'),(3,'Bart Darrow','$2a$04$wI.HLALhGxRAL75PVFOJMOukwSnjOYYIWO7qbC1nrpmVjvE/YcGvy','bdarrow2@vistaprint.com','2023-06-26','Cloned didactic utilisation','Chemistry',2023,'Female'),(4,'Mercie Martynov','$2a$04$9CSMiQyXukM6IjfOIGLII.T6PUnCf04RRie3IyAgIWWWFoKpHwGQa','mmartynov3@last.fm','2023-08-21','Reduced high-level time-frame','Computer Science',2019,'Female'),(5,'Shanda Ledur','$2a$04$T7vATMLHMKI8cxyJP4eGKO1FdaNth8pNmmwXmGJjpxbqb8K4fwLSi','sledur4@nasa.gov','2023-05-26','Operative fresh-thinking infrastructure','Mechanical Engineering',2022,'Male'),(6,'Idalia Ben','$2a$04$3l16eOjDEaQBt4KxRzNxr.s2eL3DG3aTlTt8sX11wzCIg0RCnJW8a','iben5@naver.com','2023-02-28','Reverse-engineered bottom-line frame','Physics',2021,'Other'),(7,'Bucky Screeton','$2a$04$NDqQKD6POKwvgNOi7CzYFuWsxa0VcJ4Qw4njomx6SjrqD8wm4DcBu','bscreeton6@cornell.edu','2023-09-17','Devolved 4th generation solution','Communication',2021,'Other'),(8,'Nathanael Eard','$2a$04$mbblcBrX02BLHICw7RfZOO6pUmUPoX5R8MXZUfgEptis2JvVsQGH.','neard7@privacy.gov.au','2023-07-20','Customer-focused explicit Graphic Interface','Accounting',2018,'Prefer not to say'),(9,'Kacie Jeffels','$2a$04$6qQxocPZt.n8ROd6/HQnUOKd3S34wmvhPzVyfyvXrXWBn5W69KZ66','kjeffels8@nymag.com','2022-10-28','Centralized regional toolset','Communication',2019,'Prefer not to say'),(10,'Danell O\'Crowley','$2a$04$c6c/4UukdpxErjYz4f7ecuzW6sUOSqPvoYahIks3yYL4bYsYthi4W','docrowley9@yellowbook.com','2022-11-09','Polarised national knowledge base','English',2019,'Other'),(11,'Clari Skitt','$2a$04$QfLq1XIR3BFRqtG75Lpud.3ZDyYg4O3ROThNxJiBE2kreDFc9XAOi','cskitta@opensource.org','2023-09-01','Phased intangible projection','Finance',2022,'Female'),(12,'Vite Antham','$2a$04$Bf7LG9bBzgA1ZgLxnQXy6OVy85nEJm0iUc/LnePX41jW3YNscvpbi','vanthamb@cdc.gov','2023-05-09','Profit-focused user-facing portal','History',2018,'Female'),(13,'Cymbre Lowin','$2a$04$jlIlv9Q3SEhghkFCsQdmzeYGPU.U/egkKxd40yN5JQhUVZqsEGa66','clowinc@goo.ne.jp','2022-11-24','Advanced system-worthy moratorium','Economics',2019,'Female'),(14,'Walliw Maunder','$2a$04$2RqA9hXcOlZndLRTPgB/puQrtT.LU7g.NNnRna7Ui15NkLZ3g1rda','wmaunderd@epa.gov','2023-05-20','Expanded zero administration hardware','English',2018,'Male'),(15,'Kristan Stut','$2a$04$3bQEnuHSllQd2t6wnYRNbuZ3OQMenkr6JGvUIZ45Kfb.Mnw97aRYi','kstute@nifty.com','2022-11-09','Front-line stable approach','Business Administration',2022,'Male'),(16,'Lammond Heijne','$2a$04$GUhJNhyNGb3MI/n1T1ZeduYFv6L4NORnITcAgOT21Cp6q/fbi6vlm','lheijnef@trellian.com','2022-12-06','Streamlined executive data-warehouse','English',2021,'Female'),(17,'Katerina Presswell','$2a$04$TwCobsEVZBrZWiGfyxTSce8OrEO2PdoiKH48q5BpLJ.dcd4T1BwEW','kpresswellg@blogtalkradio.com','2023-01-11','Team-oriented stable standardization','Economics',2022,'Prefer not to say'),(18,'Leda Usherwood','$2a$04$7B7DvNueVFff4s..n/0LtOk5NdUOlDLLlb4TYTpKkOCJbEeaBB0zu','lusherwoodh@google.pl','2023-09-20','Cross-platform leading edge interface','Communication',2020,'Prefer not to say'),(19,'Ulrikaumeko Favelle','$2a$04$CZz4jToL1BiDhGJMI9uOoOXI7aiqLJ2mIGh6CoslqRZY.8K9x0bau','ufavellei@google.de','2023-01-17','Configurable zero administration hub','Finance',2018,'Female'),(20,'Nevin Daulby','$2a$04$PbzCGMJRwmR5oFWlIPRDHeYI/RlQJrPekBHh2hMx/ma7PasT/mCGq','ndaulbyj@businessweek.com','2022-12-07','Sharable modular analyzer','Biology',2021,'Prefer not to say'),(21,'Vikky Braidwood','$2a$04$xhBz.ihOBO6EWOfl5zb4Ke47PH83R27/wOp96WvMWR4/bJGvUxu..','vbraidwoodk@gravatar.com','2023-06-13','Synergized composite concept','Accounting',2019,'Prefer not to say'),(22,'Redd De Maria','$2a$04$AqecbAl.IDmId3VbuYbxc.GWljhQAWERwpkBAgKwh320hiki100N6','rdel@youtu.be','2023-09-16','Object-based zero administration open architecture','Chemistry',2018,'Prefer not to say'),(23,'Kahlil Housego','$2a$04$DyYshSmSRlbjA0gXbxneSu/th0z9CU.6tr2UnpC6jocr.dFEGmKgu','khousegom@miitbeian.gov.cn','2023-02-04','Organized empowering alliance','Economics',2019,'Female'),(24,'Leanora Gecks','$2a$04$3G53c8o4L1f0sw8Rp.wI4O8z0DNiZfKRHOkEtKpHfvkNHsAFXnRgO','lgecksn@indiatimes.com','2023-07-13','Monitored dynamic adapter','Marketing',2023,'Female'),(25,'Flossi Rigate','$2a$04$Vcgrx2Qw.ueQYVc73PCi/uShrByIFi9PUCSlPsUMvly/vBDwbwINO','frigateo@digg.com','2023-09-25','User-centric mission-critical synergy','Nursing',2021,'Other'),(26,'Deni Kliment','$2a$04$y5ORu298xr6.HTbM20o.eefM4ufEFu.XZcTx4r9iNNzbL0BtkMOHi','dklimentp@deviantart.com','2023-09-01','Fully-configurable static interface','Accounting',2021,'Female'),(27,'Berk Osant','$2a$04$bNFYiKSJifdWGkzEDwWjsOr8ULkAYIMq.UThtjfcPGS0C65e2FrLi','bosantq@va.gov','2023-06-17','Reverse-engineered exuding encryption','Sociology',2022,'Prefer not to say'),(28,'Harlan Flipek','$2a$04$XSGHvMJGg6OUdNT4thEzbu9s7I/7Wr51uiVqAMzKyVWDXU7PArfbK','hflipekr@discuz.net','2022-11-18','Monitored systemic Graphic Interface','Physics',2018,'Prefer not to say'),(29,'Finn Jeremaes','$2a$04$EeIohw5/7X4qpn1xCPVDgO1SZxx05SvH.HigrefMgo.LPhRp6OPO.','fjeremaess@istockphoto.com','2023-08-16','Down-sized radical alliance','Accounting',2018,'Prefer not to say'),(30,'Mathian Touson','$2a$04$d5AROCJm5BZ5QGxX.xT8a.TsdxhWM1fbIyVt11W3evvmFdjXGpYtq','mtousont@weibo.com','2023-06-07','Progressive optimizing application','Political Science',2022,'Male'),(31,'Harmonia Kennon','$2a$04$h5Qwv1GnkTa3cac4Ttw85.kpYoH96ZDn/5y8UT4srds.s9MLUkpkK','hkennonu@networksolutions.com','2023-08-17','Business-focused 5th generation internet solution','Marketing',2023,'Female'),(32,'Lissie Lampett','$2a$04$qNPybhJbPsvBfuv9mvsUIumLrUd2Wmk6rRgKrOHiXWvGrZXiRAcXu','llampettv@twitpic.com','2023-07-10','Multi-layered bottom-line projection','Mathematics',2021,'Male'),(33,'Emilio Farrance','$2a$04$8dxD7X4DarwEMrxCxpZbOuu5kYfBeKGFODs2s/FsJe3J6ziOeRl8e','efarrancew@github.com','2023-10-15','Diverse 3rd generation structure','Physics',2021,'Male'),(34,'Chevy Cooch','$2a$04$/eQSWEycpepMMwLkhkKoq.eGZ6Od7r3NWa6alNhCBI3ATICtMRgfq','ccoochx@networkadvertising.org','2023-06-14','Object-based value-added methodology','Chemistry',2021,'Prefer not to say'),(35,'Saxe Soane','$2a$04$G0Pn/cRcuaTzQWEQiXG6K.nkQekhGH4UmD33Ew9WXfh6petAPeoom','ssoaney@artisteer.com','2022-11-30','Stand-alone zero tolerance model','Education',2020,'Male'),(36,'Stacy Coucha','$2a$04$T2bBW71qNtKJUO5.Mi7I1uwoRFste9AhdiTjUkL/lm6hQzVH2IMcG','scouchaz@walmart.com','2023-09-05','Diverse 24/7 model','Environmental Science',2021,'Prefer not to say'),(37,'Sander Bercher','$2a$04$tQjVAW8WdCotRo8JVeKM2.hBneEEUJW/G/01wMeACxWJeTh9qj8Mi','sbercher10@jigsy.com','2022-11-11','Integrated dynamic internet solution','Computer Science',2022,'Other'),(38,'Stanleigh Crooks','$2a$04$vr/Y9WnZEVILz8FizI0oxeBjqUaseTK0opLnbT.6H306apyFG7xiy','scrooks11@cloudflare.com','2023-03-09','Right-sized web-enabled strategy','Finance',2022,'Male'),(39,'Margarete Titchard','$2a$04$Dha0eohSYQgKwJwuHSmUH.9X/4tnLcQwZidxOtA9XDxWtbVBxEaHS','mtitchard12@google.com.br','2023-01-25','Persevering eco-centric intranet','Mathematics',2021,'Prefer not to say'),(40,'Horatius Aspall','$2a$04$zvImSQoYA4VsTqk0rWTRwehcsJYmvr60lLcg517fzsDkdSzCNo3E.','haspall13@taobao.com','2023-01-23','Virtual global info-mediaries','Business Administration',2020,'Other'),(41,'Kirstin Pulteneye','$2a$04$Fiq.Xxnius/8x.EwVvSI6eSLTV7aN808QYOdzCEi34XxNdOxjUf6G','kpulteneye14@sciencedirect.com','2023-08-05','Advanced background orchestration','Nursing',2021,'Prefer not to say'),(42,'Allyn Blamire','$2a$04$2JJZnDvrLIw2Kvfd777yluyyYIIvoYRnQUqnj9VdPgLoUnYkFyAD6','ablamire15@washingtonpost.com','2022-10-24','Profit-focused fault-tolerant budgetary management','Chemistry',2022,'Other'),(43,'Teodoro Rundall','$2a$04$TcgEBKOnU3MV4Xb5V5MXjO443.VqpsPquOSQoQrYLTFgkJ4coWASW','trundall16@mashable.com','2023-10-16','Robust fresh-thinking parallelism','Psychology',2023,'Prefer not to say'),(44,'Ambur Jesson','$2a$04$ITAwQRvr67Tvvz94fjOjs.NU.GHjfXC9GsiXV0AecgDCyEYUfbppW','ajesson17@mayoclinic.com','2022-12-28','Pre-emptive optimizing moratorium','Environmental Science',2020,'Male'),(45,'Wenona Tattersall','$2a$04$kSZx2kckvgXWz3mY7Io2XOxlAmBBXp875UE4BDhYFhyYrIMb0Fq5e','wtattersall18@squidoo.com','2023-06-18','Multi-channelled upward-trending framework','Environmental Science',2018,'Other'),(46,'Bertine Hardwidge','$2a$04$bH6mgoI7peZNP1Is.7dnR.Nxtid5cA6nheZ08iCrLqmg56V9gC07S','bhardwidge19@harvard.edu','2023-08-23','Synchronised analyzing policy','Chemistry',2019,'Female'),(47,'Noak Harcarse','$2a$04$oJ81swtyZpTLip4Y/27Btu1nCb0lPNB3EN3cTODPO6g0umTDV9Mly','nharcarse1a@redcross.org','2023-05-11','Automated coherent hub','Mechanical Engineering',2022,'Male'),(48,'Drusy Alpine','$2a$04$iXUcGTroj03bO0wmSr.sZu1HEXpTmHs.VTFSVtn9I6VncatEt9un2','dalpine1b@umn.edu','2023-09-26','Quality-focused multi-tasking definition','English',2022,'Other'),(49,'Hollis Grzelczyk','$2a$04$I2OUuM0RanCe1p11t9j2MO7e6GqI/YCNzq.XRx.F0CAeA/GDcc46a','hgrzelczyk1c@google.com.hk','2023-05-26','Universal optimal installation','Education',2022,'Male'),(50,'Leandra Hildrew','$2a$04$5nMk5euO4yYO3yyIPJj2kO8jZLlpA1eyyGuMi26snvmMIBDGahyPW','lhildrew1d@blogs.com','2022-11-23','Decentralized intangible data-warehouse','Finance',2023,'Other'),(51,'Nasywa Syifa','$2b$10$dMNDdE1FSYv0S4nSbF7dX.03ZKwJqlTLinOBKZYk2RvbRM1k31gVC','nsyifa80@gmail.com','2023-11-05','Hello','Computer Science',2021,'Female'),(52,'Lilly Azmon','$2b$10$87Sjx2ZVgm/wJdCrY3MDcO0zdpJrJwAvhvxJA2rmVXI5QeV7DXvKC','burnerpurposes@gmail.com','2023-11-05',NULL,'Computer Science',2022,'Prefer not to say'),(53,'John Doe','$2b$10$Sdyha58YFXyVoiC6uqCWieikIuBrWPw/dgba6hoMVz.w4YSXb/LJG','johndoe@gmail.com','2023-11-06',NULL,'Economics',2020,'Male');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userhashtag`
--

DROP TABLE IF EXISTS `userhashtag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userhashtag` (
  `user_id` int NOT NULL,
  `tag_number` varchar(10) NOT NULL,
  PRIMARY KEY (`user_id`,`tag_number`),
  KEY `FK_userhashtag_hashtag` (`tag_number`),
  CONSTRAINT `FK_userhashtag_hashtag` FOREIGN KEY (`tag_number`) REFERENCES `hashtag` (`tag_number`),
  CONSTRAINT `FK_userhashtag_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userhashtag`
--

LOCK TABLES `userhashtag` WRITE;
/*!40000 ALTER TABLE `userhashtag` DISABLE KEYS */;
INSERT INTO `userhashtag` VALUES (1,'0001'),(15,'0001'),(24,'0001'),(34,'0001'),(44,'0001'),(51,'0001'),(4,'0002'),(10,'0002'),(42,'0002'),(46,'0002'),(52,'0002'),(24,'0003'),(25,'0003'),(31,'0003'),(32,'0003'),(44,'0003'),(25,'0004'),(29,'0004'),(30,'0004'),(45,'0004'),(48,'0004'),(8,'0101'),(14,'0101'),(15,'0101'),(17,'0101'),(46,'0101'),(5,'0102'),(26,'0102'),(30,'0102'),(32,'0102'),(9,'0103'),(16,'0103'),(22,'0103'),(35,'0103'),(41,'0103'),(23,'0104'),(34,'0104'),(35,'0104'),(52,'0104'),(10,'0105'),(11,'0105'),(12,'0105'),(18,'0105'),(20,'0105'),(17,'0106'),(31,'0106'),(33,'0106'),(45,'0106'),(48,'0106'),(11,'0107'),(13,'0107'),(14,'0107'),(23,'0107'),(37,'0107'),(1,'0108'),(32,'0108'),(37,'0108'),(45,'0108'),(48,'0108'),(2,'0109'),(8,'0109'),(11,'0109'),(15,'0109'),(25,'0109'),(1,'0110'),(4,'0110'),(15,'0110'),(50,'0110'),(9,'0111'),(23,'0111'),(36,'0111'),(41,'0111'),(47,'0111'),(25,'0112'),(27,'0112'),(30,'0112'),(38,'0112'),(41,'0112'),(51,'0112'),(4,'0113'),(9,'0113'),(11,'0113'),(36,'0113'),(49,'0113'),(6,'0114'),(21,'0114'),(27,'0114'),(35,'0114'),(44,'0114'),(9,'0115'),(15,'0115'),(20,'0115'),(27,'0115'),(48,'0115'),(7,'0116'),(25,'0116'),(28,'0116'),(39,'0116'),(50,'0116'),(10,'0201'),(17,'0201'),(34,'0201'),(38,'0201'),(42,'0201'),(1,'0202'),(7,'0202'),(17,'0202'),(24,'0202'),(46,'0202'),(18,'0203'),(19,'0203'),(30,'0203'),(41,'0203'),(49,'0203'),(4,'0204'),(12,'0204'),(35,'0204'),(39,'0204'),(44,'0204'),(51,'0204'),(52,'0204'),(11,'0205'),(21,'0205'),(33,'0205'),(49,'0205'),(3,'0206'),(14,'0206'),(33,'0206'),(50,'0206'),(17,'0207'),(37,'0207'),(40,'0207'),(45,'0207'),(18,'0208'),(22,'0208'),(46,'0208'),(3,'0301'),(6,'0301'),(37,'0301'),(42,'0301'),(4,'0302'),(5,'0302'),(40,'0302'),(44,'0302'),(15,'0303'),(26,'0303'),(32,'0303'),(42,'0303'),(2,'0304'),(27,'0304'),(46,'0304'),(50,'0304'),(22,'0305'),(35,'0305'),(43,'0305'),(48,'0305'),(4,'0306'),(30,'0306'),(34,'0306'),(35,'0306'),(52,'0306'),(2,'0307'),(13,'0307'),(23,'0307'),(40,'0307'),(25,'0401'),(39,'0401'),(40,'0401'),(48,'0401'),(13,'0402'),(21,'0402'),(36,'0402'),(39,'0402'),(9,'0403'),(19,'0403'),(39,'0403'),(40,'0403'),(12,'0404'),(13,'0404'),(26,'0404'),(35,'0404'),(2,'0405'),(24,'0405'),(28,'0405'),(42,'0405'),(3,'0406'),(5,'0406'),(12,'0406'),(18,'0406'),(28,'0407'),(36,'0407'),(39,'0407'),(49,'0407'),(2,'0408'),(13,'0408'),(33,'0408'),(36,'0408'),(11,'0409'),(15,'0409'),(31,'0409'),(34,'0409'),(10,'0410'),(12,'0410'),(18,'0410'),(47,'0410'),(4,'0501'),(40,'0501'),(41,'0501'),(49,'0501'),(14,'0502'),(18,'0502'),(39,'0502'),(43,'0502'),(9,'0503'),(12,'0503'),(23,'0503'),(40,'0503'),(4,'0504'),(11,'0504'),(17,'0504'),(33,'0504'),(3,'0505'),(27,'0505'),(37,'0505'),(43,'0505'),(24,'0506'),(25,'0506'),(27,'0506'),(32,'0506'),(10,'0507'),(11,'0507'),(31,'0507'),(35,'0507'),(9,'0508'),(19,'0508'),(32,'0508'),(37,'0508'),(1,'0509'),(12,'0509'),(15,'0509'),(34,'0509'),(1,'0510'),(2,'0510'),(11,'0510'),(15,'0510'),(8,'0511'),(13,'0511'),(21,'0511'),(40,'0511'),(13,'0512'),(19,'0512'),(43,'0512'),(17,'0601'),(18,'0601'),(34,'0601'),(50,'0601'),(18,'0602'),(22,'0602'),(39,'0602'),(45,'0602'),(15,'0603'),(22,'0603'),(26,'0603'),(39,'0603'),(13,'0604'),(32,'0604'),(42,'0604'),(46,'0604'),(9,'0605'),(17,'0605'),(41,'0605'),(43,'0605'),(2,'0606'),(9,'0606'),(14,'0606'),(37,'0606'),(29,'0701'),(30,'0701'),(31,'0701'),(39,'0701'),(1,'0702'),(8,'0702'),(19,'0702'),(35,'0702'),(1,'0703'),(3,'0703'),(30,'0703'),(42,'0703'),(24,'0704'),(26,'0704'),(28,'0704'),(44,'0704'),(7,'0705'),(10,'0705'),(42,'0705'),(49,'0705'),(6,'0706'),(24,'0706'),(43,'0706'),(2,'0707'),(7,'0707'),(18,'0707'),(22,'0707'),(7,'0708'),(8,'0708'),(35,'0708'),(37,'0708'),(24,'0709'),(30,'0709'),(31,'0709'),(42,'0709'),(11,'0710'),(19,'0710'),(31,'0710'),(32,'0710'),(1,'0711'),(13,'0711'),(19,'0711'),(21,'0711'),(2,'0712'),(26,'0712'),(42,'0712'),(48,'0712'),(6,'0713'),(8,'0713'),(14,'0713'),(47,'0713'),(4,'0714'),(11,'0714'),(21,'0714'),(36,'0714'),(8,'0715'),(26,'0715'),(32,'0715'),(47,'0715'),(9,'0801'),(12,'0801'),(23,'0801'),(34,'0801'),(6,'0802'),(8,'0802'),(33,'0802'),(50,'0802'),(6,'0803'),(37,'0803'),(43,'0803'),(47,'0803'),(7,'0804'),(8,'0804'),(20,'0804'),(34,'0804'),(2,'0805'),(46,'0805'),(48,'0805'),(8,'0806'),(21,'0806'),(24,'0806'),(38,'0806'),(3,'0807'),(6,'0807'),(12,'0807'),(15,'0807'),(26,'0808'),(33,'0808'),(37,'0808'),(47,'0808'),(26,'0809'),(34,'0809'),(35,'0809'),(48,'0809'),(9,'0901'),(29,'0901'),(39,'0901'),(44,'0901'),(5,'0902'),(17,'0902'),(22,'0902'),(35,'0902'),(16,'0903'),(19,'0903'),(20,'0903'),(29,'0903'),(14,'0904'),(31,'0904'),(49,'0904'),(24,'0905'),(26,'0905'),(44,'0905'),(5,'0906'),(10,'0906'),(19,'0906'),(26,'0906'),(3,'0907'),(12,'0907'),(17,'0907'),(40,'0907');
/*!40000 ALTER TABLE `userhashtag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-07  0:45:42
