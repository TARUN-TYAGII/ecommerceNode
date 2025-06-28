require('dotenv').config(); 
const nodemailer = require("nodemailer");

// For production with real email service (Gmail example)
const transporter = nodemailer.createTransporter({
  service: 'gmail', // or 'outlook', 'yahoo', etc.
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use app password for Gmail
  },
});

// Alternative: Custom SMTP configuration
// const transporter = nodemailer.createTransporter({
//   host: "smtp.gmail.com", // or your SMTP host
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

exports.sendOrderConfirmation = async (to, subject, html) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
}; 