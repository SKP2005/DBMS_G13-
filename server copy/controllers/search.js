
const jwt =require("jsonwebtoken");
const {createError} =require("../utils/error");
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

module.exports.counc = async (req, res, next) => {
    try {
        db.query("SELECT * FROM user_details WHERE is_counc = 1", (err, result) => {
            if (err) {
              console.log(err);
            } else {
              res.status(200).send(result);
            }
          });
          
      
    } catch (err) {
        next(err);
    }
};

module.exports.getCounc = async (req, res, next) => {
  try {
      db.query("SELECT * FROM user_details WHERE id = (?)",[req.body.id], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(result);
          }
        });
        
    
  } catch (err) {
      next(err);
  }
};

module.exports.getUser = async (req, res, next) => {
  try {
      db.query("SELECT * FROM user_details WHERE username = (?)",[req.body.username
      ], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(result);
          }
        });
        
    
  } catch (err) {
      next(err);
  }
};