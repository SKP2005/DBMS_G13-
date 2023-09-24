// const User = require("../models/user"); ------>>>>>>>>>>>USER MODEL NEEDED
const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const {createError} =require("../utils/error")



module.exports.register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        // const newUser = new User({
        //     ...req.body,
        //     password: hash,
        // });                         NEW USER OBJECT CONTAINS DATA TO BE STORED IN DATABASE

        // await newUser.save().then(()=>{console.log("user made")}); SAVE NEW USER OBJECT IN USER SCHEMA
        res.status(200).send("User has been created.");
    } catch (err) {
        next(err);
    }
};

module.exports.login = async (req, res, next) => {
    try {
        // const user = await User.findOne({ username: req.body.username }); SEARCH USER IN BY USERNAME IN DATABASE
        if (!user) return next(createError(404, "User not found!"));

        const isPasswordCorrect = await bcrypt.compare(
            req.body.password,
            user.password
        );
        if (!isPasswordCorrect)
            return next(createError(400, "Wrong password or username!"));

        // const token = jwt.sign(
        //     { id: user._id, isAdmin: user.isAdmin },
        //     process.env.JWT,
        //     {
        //         expiresIn:"2h"
        //     }
        // );        ---> PASS THE TOKEN IN FRONTEND AND TO BE STORED AS A COOKIE
           
    

        // const { password,isAdmin, ...otherDetails } = user._doc;

        // res.status(200).json({details:{...otherDetails},isAdmin, token})
      

    } catch (err) {
        next(err);
    }
};