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


CREATE VIEW IF NOT EXISTS get_dealer_orders AS
SELECT order_id,customer.username,gas_type,address,License_No from customer join (select order_id,username,gas_type,License_No from dealer join (select orders.order_id,username,company_name,gas_type from order_status join orders on order_status.order_id = orders.order_id WHERE order_status.order_status ="pending") as t on t.company_name = dealer.company_name) as c on customer.username = c.username;