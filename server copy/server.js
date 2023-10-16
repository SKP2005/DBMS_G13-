const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const AuthRoute=require('./routes/auth')
const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"," DELETE","PUT"],
    credentials: true,
  })
);
// app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

app.use('/auth', AuthRoute);



app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });