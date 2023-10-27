const express=require("express");
const {register, login}= require("../controllers/auth");

const router=express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

router.post("/register", register),
router.post("/login", login)


module.exports=router;