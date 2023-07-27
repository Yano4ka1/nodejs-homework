const { User } = require("../../db/userModel");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
    const { password, email, subscription } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        return res.status(409).json({
            message: `User with email ${email} already exist`,
        });
    }

    const avatarURL = gravatar.url(email);

    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    await User.create({ password: hashPassword, email, subscription, avatarURL });
    res.status(201).json({
        message: "Created user",
        user: {
            email,
            subscription,
            avatarURL,
        },
    })
};

module.exports = {register};