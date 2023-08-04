const { User } = require("../../db/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require('uuid');
const { sendEmail } = require("../../services");

const { PORT = 3000} = process.env;

const register = async (req, res) => {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            message: `User with email ${email} already exist`,
        });
    }

    const verificationToken = v4();

    const avatarURL = gravatar.url(email);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ password: hashPassword, email, subscription, avatarURL, verificationToken });

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

    res.status(201).json({
        message: "Created user",
        user: {
            email,
            subscription,
            avatarURL,
            verificationToken,
        },
    })
};

module.exports = {register};