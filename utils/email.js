require('dotenv').config(); 
const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.sendOrderConfirmation  = async (to, subject, html)=>{
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html
      };
    
      return transporter.sendMail(mailOptions);
}