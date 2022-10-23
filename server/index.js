const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());
//mysql connection

const pool = mysql.createPool({
  connectionLimit: 10,
  host: "localhost",
  user: "root",

  database: "gasbooking",
});

app.post("/api/register", (req, res) => {
  const firstname = req.body.firstname;

  const password = req.body.password;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const pincode = req.body.pincode;
  const email = req.body.email;
  const address = req.body.address;
  const phone_number = req.body.phone_number;
  const comapny = req.body.comapny;
  const sqlInsert =
    "INSERT INTO customer (firstname,lastname,username,password,pincode,email,address,phone_number,comapny) VALUES (?,?,?,?,?,?,?,?,?)";
  pool.query(
    sqlInsert,
    [
      firstname,
      lastname,
      username,
      password,
      pincode,
      email,
      address,
      phone_number,
      comapny,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("values inserted");
      }
    }
  );
});

app.post("/api/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const sqlinerti = `select username,password from  customer where username='${username}' and password='${password}'`;
  pool.query(sqlinerti, (err, result) => {
    console.log(result.username);
    if (err) console.log(err);
    else {
      //check if the result is empty
      if (result.length > 0) {
        const r = {
          username: username,
          password: password,
          comapny: result[0].comapny,
        };
        console.log(result);
        res.send(r);
      } else {
        res.send("auth failed");
      }
    }
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
