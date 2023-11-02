const express=require("express");
const {Booked}= require("../controllers/book");

const router=express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});


router.post("/booked", Booked),
// router.post("/login", login)


module.exports=router;