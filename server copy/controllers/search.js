
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

module.exports.getClientsOfCouncellors = async (req, res, next) => {
  try {
    if(req.body.is_counc==1){

      db.query("SELECT * FROM sessions WHERE counsellor_id = (?)",[req.body.id
      ], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
    else{
      db.query("SELECT * FROM sessions WHERE counselee_id = (?)",[req.body.id
      ], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(result);
        }
      });
    }
        
  } catch (err) {
      next(err);
  }
};

module.exports.changeStatus = async (req, res, next) => {
  try {
    
    if(req.body.status){
      const s="accepted";
      db.query("UPDATE sessions SET counseling_status= (?) WHERE session_id = (?)",[s,req.body.id
      ], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(result);
          }
        });

    }
    else{
     const s="declined";
      db.query("UPDATE sessions SET counseling_status= (?) WHERE session_id = (?)",[s,req.body.id
      ], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).send(result);
          }
        });

    }
    
   
        
    
  } catch (err) {
      next(err);
  }
};

module.exports.updatePay = async (req, res, next) => {
  try {
    db.query("UPDATE sessions SET payment= (?) WHERE session_id = (?)",[1,req.body.id
    ], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(result);
        }
      });


  }
   catch (err) {
      next(err);
  }
}

module.exports.update = async (req, res, next) => {
  try {
    db.query("UPDATE user_details SET photo= (?) WHERE id = (?)",[req.body.url,req.body.id
    ], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(result);
        }
      });


  }
   catch (err) {
      next(err);
  }
}


module.exports.upcounc = async (req, res, next) => {
  try {
console.log(req.body);
    db.query("UPDATE user_details SET address = (?),contact_no = (?),email_id = (?),gender = (?),age = (?),info  = (?) WHERE id = (?)",[req.body.address,req.body.contact_no,req.body.email,req.body.gender,req.body.age,req.body.info,req.body.id
    ], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(result);
        }
      });


  }
   catch (err) {
      next(err);
  }
}