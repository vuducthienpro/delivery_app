# Create Databases
CREATE DATABASE IF NOT EXISTS `laravel_app_db`;
CREATE DATABASE IF NOT EXISTS `laravel_app_db_test`;

# Create user and grant rights
FLUSH PRIVILEGES;
CREATE USER 'laravel_app'@'%' IDENTIFIED BY 'secret';
GRANT ALL ON *.* TO 'laravel_app'@'%';
