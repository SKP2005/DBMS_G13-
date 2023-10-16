// const User = require("../models/user"); ------>>>>>>>>>>>USER MODEL NEEDED
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

module.exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
 console.log("passed");

        db.query(
            "INSERT INTO user_details (username,name,contact_no,email_id,password) VALUES (?,?,?,?,?)",
            [req.body.username,req.body.name,req.body.contact_no,req.body.email_id, hash],
            (err, result) => {
              console.log(err);
              console.log(result);
            }
          );
          console.log(req.body.username,req.body.name,req.body.contact_no,req.body.email_id, hash)
        // await newUser.save().then(()=>{console.log("user made")}); SAVE NEW USER OBJECT IN USER SCHEMA
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {

        db.query(
            "SELECT * FROM user_details WHERE username = ?;",
            username,
            (err, result) => {
              if (err) {
                res.send({ err: err });
              }
           
            

              if (result.length > 0) {
                bcrypt.compare(password, result[0].password, (error, response) => {
                  if (response) {
                    // req.session.user = result;
                    // console.log(req.session.user);
                    // res.send(result);

                    const token = jwt.sign(
                        { id: response._id, isCouncellor: response.isCouncellor },
                        process.env.JWT,
                        {
                            expiresIn:"2h"
                        }
                    );      
                    //   ---> PASS THE TOKEN IN FRONTEND AND TO BE STORED AS A COOKIE
                       
                
            
                    const { password,isCouncellor,...otherDetails } = response._doc;
            
                    res.status(200).json({details:{...otherDetails},isAdmin, token});
                    
                  } else {
                    res.send({ message: "Wrong password !" });
                    return next(createError(400, "Wrong password !"));
                  }
                });
              } else {
                res.send({ message: "User doesn't exist" });
                return next(createError(404, "User doesn't exist!"));
              }
            }
          );

        // const user = await User.findOne({ username: req.body.username }); SEARCH USER IN BY USERNAME IN DATABASE
        // if (!user) return next(createError(404, "User not found!"));

        // const isPasswordCorrect = await bcrypt.compare(
        //     req.body.password,
        //     user.password
        // );
        // if (!isPasswordCorrect)
            

      
      

    } catch (err) {
        next(err);
    }
};