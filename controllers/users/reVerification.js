const { User } = require("../../db/userModel");
const { sendEmail } = require("../../services");

const { PORT = 3000} = process.env;

const reVerification = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: `User with email ${email} is missing`,
      });
    }
    if (user.verify) {
        return res.status(400).json({
          message: "Verification has already been passed",
        });
    }
    
    const verificationToken = user.verificationToken;

    const mail = {
        to: email,
        subject: 'Confirmation of registration on the website',
        html: `
        <h1>Thank you for the registration!</h1>
        <p>
          Your login: ${email}
        </p>
        <p>
          Your password: *********
        </p>
        <p>
          To confirm registration, click on the <a target="_blank" href="http://localhost:${PORT}/api/users/verify/${verificationToken}">link</a>
        </p>    
        `,
    };
    
    await sendEmail(mail);

    res.status(200).json({
        message: "Verification email sent",
    })

}

module.exports = {
    reVerification,
  };