CREATE DATABASE IF NOT EXISTS travelo_db;
USE travelo_db;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'USER' -- 'USER' or 'ADMIN'
);

CREATE TABLE IF NOT EXISTS packages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    destination VARCHAR(100) NOT NULL,
    description TEXT,
    price DOUBLE NOT NULL,
    duration VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS hotels (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    price_per_night DOUBLE NOT NULL,
    image_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    booking_type VARCHAR(20), -- 'PACKAGE' or 'HOTEL'
    reference_id INT, -- Refers to either package_id or hotel_id
    total_price DOUBLE,
    booking_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'CONFIRMED',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert Demo Admin
INSERT IGNORE INTO users (id, name, email, password, role) VALUES 
(1, 'Admin UI', 'admin@travelo.com', 'admin123', 'ADMIN');

-- Insert Demo Packages
INSERT IGNORE INTO packages (id, destination, description, price, duration) VALUES 
(1, 'Goa Beach Resort', 'Relaxing 3 days trip to the sunny beaches of Goa.', 12000.0, '3 Days 2 Nights'),
(2, 'Manali Adventure', 'Thrilling 5 days trip in the mountains.', 18000.0, '5 Days 4 Nights'),
(3, 'Kerala Backwaters', 'Peaceful stay in the beautiful houseboats.', 15000.0, '4 Days 3 Nights');

-- Insert Demo Hotels
INSERT IGNORE INTO hotels (id, name, location, price_per_night, image_url) VALUES 
(1, 'Taj Exotica', 'Goa', 8000.0, 'https://images.unsplash.com/photo-1542314831-c6a4d2731d75?auto=format&fit=crop&q=80&w=400&h=300'),
(2, 'The Himalayan', 'Manali', 6000.0, 'https://images.unsplash.com/photo-1517840901100-8179e982acb7?auto=format&fit=crop&q=80&w=400&h=300'),
(3, 'Kumarakom Lake Resort', 'Kerala', 7500.0, 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80&w=400&h=300');
