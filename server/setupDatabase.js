const mysql = require("mysql");
var pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
});

createDatabase();

function createDatabase(){
    pool.query("CREATE DATABASE IF NOT EXISTS gasbooking", (err, result) => {
        if (err) throw err;
        console.log("database created");
        setupTable();
    });
};

function setupTable() {
    pool = mysql.createPool({
        connectionLimit: 10,
        host: "localhost",
        user: "root",
        database: "gasbooking",
    });

    setupAdminTable();
    setupCustomerTable();
    setupDealerTable();
    setupGasTypeTable();
    setupOrderTable();
};

function setupAdminTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS admin (id INT AUTO_INCREMENT PRIMARY KEY, firstname VARCHAR(40), lastname VARCHAR(40), username VARCHAR(40) unique not null, password VARCHAR(40), email VARCHAR(40) unique not null, phone_number bigint)",
        (err, result) => {
            if (err) throw err;
            console.log("admin table created");
        }
    );
};

function setupCustomerTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS customer (id int AUTO_INCREMENT,firstname varchar(40),lastname varchar(40),username varchar(40) unique not null,password varchar(40),pincode int,email varchar(40) unique not null,address varchar(40),phone_number bigint,company varchar(40),PRIMARY KEY (id))",
        (err, result) => {
            if (err) throw err;
            console.log("customer table created");
        }
    );
};

function setupDealerTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS dealer (dealer_id int AUTO_INCREMENT PRIMARY KEY,company_name varchar(40),License_No varchar(40) unique NOT NULL)",
        (err, result) => {
            if (err) throw err;
            console.log("dealer table created");
        }
    );
};

function setupGasTypeTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS gas_type (gas_id int AUTO_INCREMENT PRIMARY KEY,company_name varchar(40),gas_type varchar(40),price int)",
        (err, result) => {
            if (err) throw err;
            console.log("gas_type table created");
        }
    );
};

function setupOrderTable() {
    pool.query(
        "CREATE TABLE IF NOT EXISTS orders (order_id int AUTO_INCREMENT PRIMARY KEY,username varchar(40),gas_type varchar(40),order_date date)",
        (err, result) => {
            if (err) throw err;
            console.log("orders table created");
        }
    );
}