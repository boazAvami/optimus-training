-- Drop existing tables if they exist
DROP TABLE IF EXISTS products_categories CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS categories CASCADE;

-- Sequences
CREATE SEQUENCE products_id_seq START 1;
CREATE SEQUENCE categories_id_seq START 1;

-- Categories Table
CREATE TABLE categories (
    id INT PRIMARY KEY DEFAULT nextval('categories_id_seq'),
    name VARCHAR(100) NOT NULL
);

-- Products Table
CREATE TABLE products (
    id INT PRIMARY KEY DEFAULT nextval('products_id_seq'),
    name VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    description TEXT,
    price NUMERIC(10,2) NOT NULL,
    seller_name VARCHAR(150) NOT NULL,
    image_url TEXT,
    status VARCHAR(50) NOT NULL
);

-- Many-to-Many: Products ↔ Categories
CREATE TABLE products_categories (
    product_id INT NOT NULL,
    category_id INT NOT NULL,
    PRIMARY KEY (product_id, category_id),
    FOREIGN KEY (product_id) REFERENCES products(id),
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
