const nodemailer = require("nodemailer");

const { SMTP_HOST, SMTP_USER, SMTP_PASSWORD } = process.env;

const send_email = async (options) => {
  // create a transporter
  const transporter = nodemailer.createTransport({
    service: SMTP_HOST,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD,
    },
  });

  // Define the email options
  const mail_options = {
    from: `MEDBLOOD <${SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  // send the email
  await transporter.send_mail(mail_options);
};

module.exports = send_email;
