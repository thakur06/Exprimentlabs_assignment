const nodemailer = require("nodemailer");

async function sendEmail(to, subject, text) {
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "your-email@gmail.com",
      pass: "your-password",
    },
  });

  await transporter.sendMail({
    from: '"Event Reminder" <your-email@gmail.com>',
    to,
    subject,
    text,
  });
}
