import nodemailer from "nodemailer";

async function sendMail() {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "your_email@gmail.com",
      pass: "your_app_password_here",
    },
  });

  const info = await transporter.sendMail({
    from: '"Kiyopon" nisanir8_bai27@mepcoeng.ac.in',
    to: "nisanir8@gmail.com",
    subject: "Test Mail",
    text: "This is a basic test mail.",
  });

  console.log("Message sent:", info.messageId);
}

sendMail().catch(console.error);
