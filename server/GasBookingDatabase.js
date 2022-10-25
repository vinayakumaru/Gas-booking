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
                    console.log(err);
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
}

module.exports = GasBookingDatabase;
