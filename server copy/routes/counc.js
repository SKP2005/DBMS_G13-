const express=require("express");
const {counc,getCounc, getUser}= require("../controllers/search");

const router=express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

router.get("/counc", counc),
router.post("/getcounc", getCounc),
router.post("/getuser", getUser),
// router.post("/login", login)


module.exports=router;