// Email / Slack / Telegram notification
const nodemailer = require('nodemailer');
const axios = require('axios');

module.exports = async function notify(summary, config) {
  if (config.deliveryMethod === 'email') {
    // Email via SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: '🔥 Frontend Jobs – ' + new Date().toISOString().slice(0, 10),
      text: summary,
    });
  } else if (config.deliveryMethod === 'slack') {
    // Slack webhook
    await axios.post(process.env.SLACK_WEBHOOK_URL, { text: summary });
  } else if (config.deliveryMethod === 'telegram') {
    // Telegram bot (optional, placeholder)
    // You can implement Telegram notification here
    console.log('Telegram notification not implemented.');
  }
};
