const bcrypt = require("bcryptjs");
const jwt =require("jsonwebtoken");
const {createError} =require("../utils/error");
const mysql = require("mysql");
const nodemailer = require('nodemailer');

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "counselling",
});

// var transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'youremail@gmail.com',
//     pass: 'yourpassword'
//   }
// });

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

  
module.exports.ConfirmationMail = async (req, res) => {

  // const { userId, purchaseId } = req.body;
  // const user = await User.findById(userId);
  // const purchase = await Purchase.findById(purchaseId).populate('orderDetail');
  // console.log(purchase)
  // const event = await Event.findById(purchase.eventId);
  // const ticket = await Ticket.findById(purchase.ticketId);
  // const created = await CreatedEvent.findOne({eventId:purchase.eventId})
  // const organizer=await User.findById(created.userId)
  // console.log("EMAIL")
  // console.log(user.email)

  // const event= await  Event.findById(eventId);
  // const eventUserId= event.userId;
  // const sender=await User.findById(eventUserId);
  // const senderMail= sender.email;
  const user=req.body.user;
  const counce=req.body.counce;
  const userEmail = user.email_id;
  const time=req.body.inputtime;
  const datest=req.body.startDate;
  // const date = datest.toLocaleDateString('en-US',{
  //   year: 'numeric',
  //   month: 'long',
  //   day: 'numeric',
  // });
  // const userName =user.name;
  // const eventname =event.name;




  let config = {
    service: 'gmail',
    auth: {
      user: 'eventticketing.team@gmail.com',
      pass: 'whlviiqznhpebwxj'
    }
  }
  let transporter = nodemailer.createTransport(config);
        //   const qrCodeText = `
        //   PaymentId: ${purchase.orderDetail.razorpay.paymentId},
        //   OrderId: ${purchase.orderDetail.razorpay.orderId}
        //   Name :${user.firstname} ${user.lastname}\n
        //   email : ${user.email}
        //   Ticket Type: ${ticket.type}\n
        //   Amount : Rs ${purchase.orderDetail.amount}
        //   Quantity: ${purchase.quantity}\n,`;
        // const qrCodeOptions = {
        //   errorCorrectionLevel: 'H',
        //   type: 'png',
        //   quality: 0.9,
        //   margin: 1,
        // };
  
        // qrcode.toDataURL(qrCodeText, qrCodeOptions, (error, qrCodeDataUri) => {
        //             if (error) {
        //               console.error(error);
        //               res.status(500).json({ message: 'Failed to generate QR code' });
        //               return;
        //             }
    // console.log(user);

  let mailOptions = {
    from: counce.email_id,
    to: userEmail,
    subject: 'Appointment Confirmation',
    text: `
    Dear ${user.name},
    
    We are delighted to inform you that your appointment with ${counce.name} has been successfully booked. We look forward to meeting with you on the scheduled date and time.
    
    Here are the details of your appointment:
    
    Date: ${datest}
    Time: ${time}
      
    Meeting link will be share to you by your Councellor.
    Councellor Email:${counce.email_id}
    Councellor Contact no:${counce.contact_no}
    
    Warm regards,
  `
  // ,
  //   attachments: [
  //     {
  //       filename: 'qrcode.png',
  //       content: qrCodeDataUri.split(';base64,').pop(),
  //       encoding: 'base64',
  //     },
  //   ],
  };

  transporter.sendMail(mailOptions).then(() => { console.log("MAIL SEND SUCCESFULLY") })
console.log("send");



}
// )}
