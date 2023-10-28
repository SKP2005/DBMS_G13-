-- Create the "counselling" database if it doesn't exist
CREATE DATABASE IF NOT EXISTS counsellinguser;
USE counselling;

-- Create the "roles" table to store user roles
CREATE TABLE roles (
    role_id INT PRIMARY KEY AUTO_INCREMENT,
    role_name VARCHAR(50) NOT NULL UNIQUE
);

-- Populate the roles table with some initial roles
INSERT INTO roles (role_name) VALUES ('counselee'), ('counsellor'), ('admin');

-- Create the "user" table to store user information
CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL UNIQUE,
    user_password VARCHAR(255) NOT NULL
);

-- Create the "user_roles" table to associate users with roles
CREATE TABLE user_roles (
    user_id INT,
    role_id INT,
    PRIMARY KEY (user_id, role_id),
    FOREIGN KEY (user_id) REFERENCES user(id),
    FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- Create the "user_details" table to store additional user details
CREATE TABLE user_details (
    id INT PRIMARY KEY auto_increment,
    name VARCHAR(100),
    username VARCHAR(100),
	password VARCHAR(100),
    address VARCHAR(255),
    contact_no INT,
    email_id VARCHAR(100),
    photo VARCHAR(255),
    is_counc BOOLEAN DEFAULT FALSE,
    gender ENUM('male', 'female', 'other'),
    age INT,
    info TEXT

);

DROP TABLE user_details;
-- Create the "payments" table to store payment detailsuser_detailsuser_details
CREATE TABLE payments (
    payment_id INT PRIMARY KEY AUTO_INCREMENT,
    amount DECIMAL(10, 2) NOT NULL,
    payment_date DATE NOT NULL,
    payment_status ENUM('pending', 'completed', 'cancelled') DEFAULT 'pending'
);

-- Create the "transactions" table to store booking and payment information
CREATE TABLE transactions (
    booking_id INT PRIMARY KEY AUTO_INCREMENT,
    payment_id INT,
    FOREIGN KEY (payment_id) REFERENCES payments(payment_id)
);

-- Create the "sessions" table to store counseling sessions
CREATE TABLE sessions (
    session_id INT PRIMARY KEY AUTO_INCREMENT,
    booking_id INT,
    counselee_id INT,
    counsellor_id INT,
    session_date DATE,
       session_time time,
    counseling_status ENUM('scheduled', 'in_progress', 'completed', 'cancelled') DEFAULT 'scheduled',
    counseling_fee DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES transactions(booking_id),
    FOREIGN KEY (counselee_id) REFERENCES user(id),
    FOREIGN KEY (counsellor_id) REFERENCES user(id)
);

DROP TABLE sessions;