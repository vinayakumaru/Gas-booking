const mysql = require("mysql");

class GasBookingDatabase {
    constructor() {
        this.pool = null;
    }
    
    connect(){
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            database: "gasbooking",
        });

        this.pool.query(
            'select * from Admin',
            (err, _) => {
                if (err) {
                    console.log("unable to connect database");
                    return;
                }
                console.log("connected to database");
            }
        );
    }

    register(
        {
            firstname,
            lastname,
            username,
            password,
            pincode,
            email,
            address,
            phone_number,
            company,
        },
        callback
    ) {
        this.pool.query(
            `INSERT INTO customer (firstname,lastname,username,password,pincode,email,address,phone_number,company) VALUES ('${firstname}','${lastname}','${username}','${password}',${pincode},'${email}','${address}',${phone_number},'${company}')`,
            (err, result) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully registered");
                callback(true);
            }
        );
    }

    checkUser({ username, password }, callback) {
        this.pool.query(
            `select username,password from customer where username='${username}' and password='${password}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(true);
                else callback(false);
            }
        );
    }

    checkDealer({ username }, callback) {
        this.pool.query(
            `select License_No from dealer where license_no='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback(false);
                    return;
                }
                if (result.length > 0) callback(true);
                else callback(false);
            }
        );
    }

    updateProfile(user, callback) {
        this.pool.query(
            `UPDATE customer SET firstname='${user.firstname}',lastname='${user.lastname}',pincode=${user.pincode},address='${user.address}',company='${user.company}' WHERE username='${user.username}'`,
            (err, result) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully updated");
                callback(true);
            }
        );
    }

    getProfile(username, callback) {
        this.pool.query(
            `select * from customer where username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getOrders(username, callback) {
        this.pool.query(
            `select * from orders join payment on orders.order_id = payment.order_id where username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    
    getGasTypesByUser({username},callback) {
        console.log(username);
        this.pool.query(
            `select g.gas_type,g.price,g.company_name from gas_type as g inner join customer as c on g.company_name=c.company where c.username='${username}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                console.log(result);
                callback(result);
            }
        );
    }

    getGasTypes(callback) {
        this.pool.query(
            `select gas_type,price,company_name from gas_type`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }
    getGasCompanies(callback) {
        this.pool.query(
            `select company_name from dealer`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }

    getGasTypesByCompany(company,callback) {
        this.pool.query(
            `select gas_type,price from gas_type where company_name='${company}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                callback(result);
            }
        );
    }
    updatePassword({username,password,email}, callback) {
        console.log(username);
        this.pool.query(`update customer set password='${password}' where username='${username}' and email='${email}'`),
        (err, result) => {
            if (err) {
                console.log(err);
                callback(false);
                return;
            }
           
            callback(true);
        }
    }

    insertOrder(order, callback) {
        this.pool.query(
            `CALL insert_to_orders('${order.username}','${order.gas_type}','${order.payment_method}',${order.amount})`,
            (err, result) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully inserted");
                callback(true);
            }
        );
    }

    updateCompany({username,company}, callback) {
        this.pool.query(
            `UPDATE customer SET company='${company}' WHERE username='${username}'`,
            (err, _) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully updated");
                callback(true);
            }
        )
    }

    getDealerOrders({username}, callback) {
        this.pool.query(
            `SELECT order_id,customer.username,gas_type,address from customer join (select order_id,username,gas_type from dealer join (select orders.order_id,username,company_name,gas_type from order_status join orders on order_status.order_id = orders.order_id WHERE order_status.order_status = "pending") as t on t.company_name = dealer.company_name where dealer.License_No='${username}') as c on customer.username = c.username`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    callback([]);
                    return;
                }
                console.log(result);
                callback(result);
            }
        );
    }

    updateOrderStatus({order_id}, callback) {
        this.pool.query(
            `UPDATE order_status SET order_status='shipped' WHERE order_id=${order_id}`,
            (err, _) => {
                if (err) {
                    console.log(err.sqlMessage);
                    callback(false);
                    return;
                }
                console.log("successfully updated");
                callback(true);
            }
        )
    }
}

module.exports = GasBookingDatabase;
