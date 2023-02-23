-- prepares a MySQL server for the project

DROP DATABASE IF EXISTS dev_db;
CREATE DATABASE IF NOT EXISTS dev_db;
CREATE USER IF NOT EXISTS 'dev'@'localhost' IDENTIFIED BY 'minENTLE12&';
GRANT ALL PRIVILEGES ON `dev_db`.* TO 'dev'@'localhost';
GRANT SELECT ON `performance_schema`.* TO 'dev'@'localhost';
FLUSH PRIVILEGES;
