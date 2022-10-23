const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = process.env.PORT || 4000;
const GasBookingDatabase = require("./GasBookingDatabase");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const gasBookingDatabase = new GasBookingDatabase();

app.post("/api/register", (req, res) => {
  const firstname = req.body.firstname;
  const password = req.body.password;
  const lastname = req.body.lastname;
  const username = req.body.username;
  const pincode = req.body.pincode;
  const email = req.body.email;
  const address = req.body.address;
  const phone_number = req.body.phone_number;
  const company = req.body.company;
  const sqlInsert =
    `INSERT INTO customer (firstname,lastname,username,password,pincode,email,address,phone_number,company) VALUES ('${firstname}','${lastname}','${username}','${password}',${pincode},'${email}','${address}',${phone_number},'${company}')`;
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
      company,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
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
          company: result[0].company,
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
