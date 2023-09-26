CREATE SCHEMA counselling;
USE counselling;

CREATE TABLE users (
	id INT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_role VARCHAR(255)
);

CREATE TABLE user_details (
	id INT PRIMARY KEY,
    name VARCHAR(255),
    address VARCHAR(255),
    contact_no INT,
    email_id VARCHAR(255),
    photo VARCHAR(255),
    gender VARCHAR(255),
    age INT, 
    info LONGTEXT,
    FOREIGN KEY(id) REFERENCES users(id)
);

CREATE TABLE transactions (
	booking_id INT PRIMARY KEY, 
    payment_id INT
);

CREATE TABLE sessions (
	booking_id INT PRIMARY KEY,
	counselee_id INT,
    counsellor_id INT,
    session_date DATE,
    session_time TIME,
    counselling_status VARCHAR(255),
    counselling_fee INT,
    FOREIGN KEY(counselee_id) REFERENCES users(id),
    FOREIGN KEY(counsellor_id) REFERENCES users(id),
    FOREIGN KEY(booking_id) REFERENCES transactions(booking_id)
);