const nodemailer = require("nodemailer");

// Load environment variables
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // Since you're using port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Verify transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("Error configuring mail transporter:", error);
  } else {
    console.log("Mail transporter configured successfully:", success);
  }
});

module.exports = transporter;
