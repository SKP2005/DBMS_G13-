const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const {createError} =require("../utils/error");
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

module.exports.Booked = async (req, res, next) => {
    try {
        console.log(req.body.data);
        db.query(
            "INSERT INTO sessions (  counselee_id , counsellor_id , session_date ,  session_time , counseling_fee) VALUES (?,?,?,?,?)",
            [req.body.data.counselee_id ,req.body.data.counsellor_id ,req.body.data.session_date,req.body.data.session_time,req.body.data.counseling_fee],
            (err, result) => {
              console.log(err);
              console.log(result);
            }
          );
          
      
    } catch (err) {
        next(err);
    }
  };
