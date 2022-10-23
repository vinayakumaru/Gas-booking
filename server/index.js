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
    result = gasBookingDatabase.register(req.body, res);
});

app.post("/api/login", (req, res) => {
    gasBookingDatabase.checkUser(req.body, res);
});
app.listen(port, () => console.log(`Listening on port ${port}`));
