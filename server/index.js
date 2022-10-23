const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 4000;
const GasBookingDatabase = require("./GasBookingDatabase");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const cors = require("cors");
app.use(cors());
const gasBookingDatabase = new GasBookingDatabase();

app.post("/api/register", (req, res) => {
  result = gasBookingDatabase.register(req.body);
  if (result) {
    res.send("success");
  } else {
    res.send("failure");
  }
});

app.post("/api/login", (req, res) => {
  result = gasBookingDatabase.checkUser(req.body);
  if (result) {
    const r = {
      username: req.body.username,
      password: req.body.password
    };
    res.send(r);
  } else {
    res.send("auth failed");
  }
});
app.listen(port, () => console.log(`Listening on port ${port}`));
