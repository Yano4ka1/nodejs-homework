const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "kirdyai@ukr.net" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
  }
};

module.exports = sendEmail;