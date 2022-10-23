const mysql = require("mysql");

class GasBookingDatabase {
    constructor() {
        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: "localhost",
            user: "root",
        });
        this.createDatebase();
    }

    createDatebase = () => {
        this.pool.query(
            "CREATE DATABASE IF NOT EXISTS gasbooking",
            (err, result) => {
                if (err) throw err;
                this.close();
                this.pool = mysql.createPool({
                    connectionLimit: 10,
                    host: "localhost",
                    user: "root",
                    database: "gasbooking",
                });
                this.createTable();
            }
        );
    };

    createTable = () => {
        this.pool.query(
            "CREATE TABLE IF NOT EXISTS customer (id int NOT NULL AUTO_INCREMENT,firstname varchar(40),lastname varchar(40),username varchar(40) unique not null,password varchar(40),pincode int,email varchar(40) unique not null,address varchar(40),phone_number int,company varchar(40),PRIMARY KEY (id))",
            (err, result) => {
                if (err) throw err;
                console.log("database connected");
            }
        );
    };

    register({
        firstname,
        lastname,
        username,
        password,
        pincode,
        email,
        address,
        phone_number,
        company,
    },res) {
        this.pool.query(
            `INSERT INTO customer (firstname,lastname,username,password,pincode,email,address,phone_number,company) VALUES ('${firstname}','${lastname}','${username}','${password}',${pincode},'${email}','${address}',${phone_number},'${company}')`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("failure");
                } else {
                    console.log("successfully registered");
                    res.send("success");
                }
            }
        );
    }
    checkUser({ username, password }, res) {
        this.pool.query(
            `select username,password from  customer where username='${username}' and password='${password}'`,
            (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("failure");
                } else {
                    if (result.length > 0) {
                        const r = {
                            username: username,
                            password: password,
                        };
                        res.send(r);
                    } else {
                        const r = {
                            username: "",
                            password: "",
                        };
                        res.send(r);
                    }
                }
            }
        );
    }

    close() {
        this.pool.end();
    }
}

module.exports = GasBookingDatabase;
