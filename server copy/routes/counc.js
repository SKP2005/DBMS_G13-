const express=require("express");
const {counc,getCounc, getUser,getClientsOfCouncellors, changeStatus, updatePay, update}= require("../controllers/search");

const router=express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

router.get("/counc", counc),
router.post("/update", update),
router.post("/updatepayment", updatePay),
router.post("/changestatus", changeStatus),
router.post("/clientsAppointment", getClientsOfCouncellors),
router.post("/getcounc", getCounc),
router.post("/getuser", getUser),
// router.post("/login", login)


module.exports=router;