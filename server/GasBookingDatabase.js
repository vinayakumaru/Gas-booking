const mysql = require("mysql");


class GasBookingDatabase {
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
            database: "gasbooking",
        });
        this.createDatebase();
    }

    createDatebase = () => {
        this.pool.query("CREATE DATABASE IF NOT EXISTS gasbooking", (err, result) => {
            if (err) throw err;
            this.createTable();
        });
    };

    createTable = () => {
        this.pool.query(
            "CREATE TABLE IF NOT EXISTS customer (id int NOT NULL AUTO_INCREMENT,firstname varchar(255),lastname varchar(255),username varchar(255),password varchar(255),pincode int,email varchar(255) unique,address varchar(255),phone_number int,company varchar(255),PRIMARY KEY (id))",
            (err, result) => {
                if (err) throw err;
                console.log("database connected");
            }
        );
    };

    register({firstname, lastname, username, password, pincode, email, address, phone_number, company}) {
        this.pool.query(
            `INSERT INTO customer VALUES ('${firstname}','${lastname}','${username}','${password}',${pincode},'${email}','${address}',${phone_number},'${company}')`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return false;
                } else {
                    console.log(result);
                    return true;
                }
            }
        );

    }
    checkUser({username, password}) {
        this.pool.query(
            `select username,password from  customer where username='${username}' and password='${password}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    return false;
                } else {
                    console.log(result);
                    if (result.length > 0) {
                        return true;
                    }
                    return false;
                }
            }
        );
    }

    close() {
        this.pool.end();
    }
}

module.exports = GasBookingDatabase;

