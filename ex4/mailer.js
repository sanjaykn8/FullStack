import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

async function sendMail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const info = await transporter.sendMail({
    from: `"Eren Yeager" <${process.env.EMAIL_USER}>`,
    to: "nisanir8_bai27@mepcoeng.ac.in",
    subject: "New test",
    text: "I have sent this as sample",
  });

  console.log("Message sent:", info.messageId);
}

sendMail().catch(console.error);