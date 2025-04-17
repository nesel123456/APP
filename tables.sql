SELECT * FROM locations;
-- locations 
CREATE TABLE locations (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

--reviews 
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    review TEXT NOT NULL,
    location_id INT,
    FOREIGN KEY (location_id) REFERENCES locations(id) ON DELETE CASCADE
);

INSERT INTO locations (name) VALUES ('Москва');
INSERT INTO locations (name) VALUES ('Санкт-Петербург');

INSERT INTO reviews (review, location_id) VALUES ('Отличное место для прогулок!', 1);
INSERT INTO reviews (review, location_id) VALUES ('Немного холодно зимой, но очень красиво!', 1);
INSERT INTO reviews (review, location_id) VALUES ('Очень красивый город, много достопримечательностей.', 2);
INSERT INTO reviews (review, location_id) VALUES ('Зимой бывают сильные морозы, но город стоит того!', 2);
