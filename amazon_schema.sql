CREATE database Bamazon;

USE Bamazon;

CREATE TABLE products (
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(45) NULL,
    product_price DECIMAL (10,2) NULL,
    department_name VARCHAR(45) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products ( product_name, department_name, product_price, stock_quantity)
VALUES ("Fire TV Stick", "Electronics", 39.99,100), 
	("Echo Dot", "Electronics", 49.99,100),
    ("Kindle Paperwhite", "Electronics", 119.99,100),
    ("Super Mario Odyssey", "Video Games", 49.99,100),
    ("Call of Duty: WWII", "Video Games", 59.99,390),
    ("Star Wars Battlefront II", "Video Games", 59.99,200),
    ("Obama: An Intimate Portrait", "Books", 29.99,100),
    ("Harry Potter and the Prisoner of Azkaban", "Books", 39.99,100),
    ("Ulysses S. Grant", "Books", 39.99,100),
    ("Crosstour Action Camera", "Camera & Photo", 46.77,100);

SELECT * FROM products;