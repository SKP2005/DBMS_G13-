const Razorpay = require('razorpay');
// const mongoose = require('mongoose');
// const Order=require('../models/order')
const dotenv =require('dotenv');
const express=require("express");
const router=express.Router();
const mysql = require("mysql");

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

dotenv.config();



  
router.get('/get-razorpay-key', (req, res) => {
    res.send({ key: process.env.RAZORPAY_KEY_ID });
  });
  
  router.post('/create-order', async (req, res) => {
    try {
      
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_SECRET,
      });
      const options = {
        amount: req.body.amount,
        currency: 'INR',
      };
      
      const order = await instance.orders.create(options);
      console.log("hii");
      console.log(order);
      if (!order) return res.status(500).send('Some error occured');
      res.send(order);
    } catch (error) {
      res.status(500).send(error);
    }
  });
  
  router.post('/pay-order', async (req, res) => {
    try {
      const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
        req.body;
  
     db.query(
      "INSERT INTO payments ( amount, razorpayPaymentId, razorpayOrderId, razorpaySignature ) VALUES (?,?,?,?)",
      [ amount, razorpayPaymentId, razorpayOrderId, razorpaySignature ],
      (err, result) => {
        console.log(err);
        console.log(result);
      }
    );


      res.send({
        msg: 'Payment was successfull',
        success:true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  });
  
  // router.get('/list-orders', async (req, res) => {
  //   const orders = await Order.find();
  //   res.send(orders);
  // });

  module.exports=router;
  