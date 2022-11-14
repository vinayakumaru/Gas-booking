DELIMITER $$
DROP TRIGGER IF EXISTS insert_date_to_orders $$
CREATE TRIGGER insert_date_to_orders
BEFORE INSERT ON orders FOR EACH ROW
BEGIN
	SET NEW.order_date = NOW();
END $$
DELIMITER ;


DELIMITER $$
DROP PROCEDURE IF EXISTS insert_to_orders $$
CREATE PROCEDURE insert_to_orders(IN username varchar(40),IN gas_type varchar(40),IN payment_method varchar(20),IN amount INT)
	BEGIN
    	DECLARE id int;
        SET id = FLOOR(RAND()*100000000);
		INSERT INTO orders(order_id,username,company_name,gas_type) VALUES(id,username,getUserCompany(username),gas_type);
        INSERT INTO payment(order_id,payment_method,amount) VALUES(id,payment_method,amount);
        INSERT INTO order_status(order_id,order_status) VALUES(id,"pending");
	END $$
 DELIMITER ;

DELIMITER $$
DROP FUNCTION IF EXISTS getUserCompany $$
CREATE FUNCTION getUserCompany(username varchar(40)) RETURNS varchar(20)
BEGIN
  DECLARE company_name varchar(20);
  Select company into company_name FROM customer WHERE customer.username = username;
  RETURN company_name;
END $$
DELIMITER ;