INSERT INTO user_history (`id_user`, `id_product`)
        SELECT `id_user`, `id_product` FROM `shoppingcartitems` WHERE `id_user` = 1;
		DELETE FROM shoppingcartitems WHERE `shoppingcartitems`.`id_user` = 1;
SELECT * from shoppingcartitems
SELECT * from user_history
TRUNCATE TABLE user_history;

CREATE TABLE shoppingcartitems
(
	id_shoppingCartItem INT NOT NULL AUTO_INCREMENT,
    id_user INT NOT NULL,
    id_product INT NOT NULL,
    PRIMARY KEY(id_shoppingCartItem),
    CONSTRAINT FK_SCI_USER FOREIGN KEY (id_user) 
    REFERENCES pwci.users(id_user)
) ENGINE = InnoDB;

INSERT INTO sales (`id_buyer`, `id_product`, `price_sold`, `sale_date`)
VALUES (1, 1, 5999.00, NOW());
SELECT * FROM sales
SELECT
(SELECT username FROM pwci.users u WHERE u.id_user = s.id_buyer) buyer,
(SELECT id_owner FROM pwci.products p WHERE p.id_product = s.id_product) id_seller
FROM sales s 
WHERE (SELECT id_owner FROM pwci.products p WHERE p.id_product = s.id_product) = 2;

ALTER TABLE products
ADD CONSTRAINT FK_PRO_USER
FOREIGN KEY (id_owner) REFERENCES users(id_user);


CREATE TABLE pwci.sales
(
	id_sales INT NOT NULL AUTO_INCREMENT,
    id_buyer INT NOT NULL,
    id_product INT NOT NULL,
    price_sold FLOAT NOT NULL,
    sale_date DATETIME NOT NULL,
    PRIMARY KEY(id_sales),
    CONSTRAINT FK_SALES_USERS FOREIGN KEY (id_buyer) 
    REFERENCES pwci.users(id_user),
    CONSTRAINT FK_SALES_PRODUCT FOREIGN KEY(id_product)
    REFERENCES pwci.products(id_product)
) ENGINE = InnoDB;